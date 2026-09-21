// Skapar ett nytt kort för varje bok.
export function getBookCard(book) {
  const cardDiv = document.createElement("div");
  const titleH3 = document.createElement("h3");
  const authorP = document.createElement("p");
  const statusP = document.createElement("p");
  const scoreP = document.createElement("p");
  const readBtn = document.createElement("button");
  const scoreLabel = document.createElement("label");
  const scoreSelect = createScoreSelect();
  const delBtn = document.createElement("button");
  const errorP = document.createElement("p");

  cardDiv.classList.add("book-card");
  errorP.classList.add("error");

  titleH3.innerText = book.getTitle();
  authorP.innerText = `Författare: ${book.getAuthor()}`;
  scoreLabel.innerText = "Välj betyg: ";
  delBtn.innerText = "Ta bort";

  scoreLabel.append(scoreSelect);

  cardDiv.append(
    titleH3,
    authorP,
    statusP,
    scoreP,
    readBtn,
    scoreLabel,
    delBtn,
    errorP,
  );

  addBookEvents(
    book,
    cardDiv,
    statusP,
    scoreP,
    readBtn,
    scoreLabel,
    scoreSelect,
    delBtn,
    errorP,
  );

  updateCard(book, statusP, readBtn, scoreLabel, scoreP, scoreSelect);

  return cardDiv;
}

// Skapar betygsmenyn med instruktionstext och alternativen 1-5.
function createScoreSelect() {
  const scoreSelect = document.createElement("select");
  const emptyOption = document.createElement("option");

  emptyOption.value = "";
  emptyOption.disabled = true;
  emptyOption.innerText = "Välj 1-5";

  scoreSelect.append(emptyOption);

  for (let score = 1; score <= 5; score++) {
    const option = document.createElement("option");

    option.value = score;
    option.innerText = score;

    scoreSelect.append(option);
  }

  return scoreSelect;
}

// Uppdaterar kortets texter och visar eller döljer betygsdelen.
function updateCard(book, statusP, readBtn, scoreLabel, scoreP, scoreSelect) {
  if (book.getIsRead()) {
    statusP.innerText = "Status: Läst";
    readBtn.innerText = "Markera som oläst";
    scoreLabel.classList.remove("hidden");
    scoreP.classList.remove("hidden");
  } else {
    statusP.innerText = "Status: Oläst";
    readBtn.innerText = "Markera som läst";
    scoreLabel.classList.add("hidden");
    scoreP.classList.add("hidden");
  }

  if (book.getScore() === undefined) {
    scoreP.innerText = "Betyg: Inte betygsatt";
    scoreSelect.value = "";
  } else {
    scoreP.innerText = `Betyg: ${book.getScore()}/5`;
    scoreSelect.value = book.getScore();
  }
}

// Hindra fler ändringar på samma bok medan ett anrop pågår.
function setLoading(isLoading, readBtn, scoreSelect, delBtn) {
  readBtn.disabled = isLoading;
  scoreSelect.disabled = isLoading;
  delBtn.disabled = isLoading;
}

// Kopplar kortets knappar och betygsmeny till rätt bok.
function addBookEvents(
  book,
  cardDiv,
  statusP,
  scoreP,
  readBtn,
  scoreLabel,
  scoreSelect,
  delBtn,
  errorP,
) {
  // Ändrar lässtatus.
  readBtn.addEventListener("click", async () => {
    setLoading(true, readBtn, scoreSelect, delBtn);
    errorP.innerText = "";

    try {
      await book.patchIsRead();
      updateCard(book, statusP, readBtn, scoreLabel, scoreP, scoreSelect);
    } catch (error) {
      errorP.innerText = error.message;
    }

    setLoading(false, readBtn, scoreSelect, delBtn);
  });

  // Sparar det valda betyget.
  scoreSelect.addEventListener("change", async () => {
    setLoading(true, readBtn, scoreSelect, delBtn);
    errorP.innerText = "";

    try {
      const score = Number(scoreSelect.value);
      await book.patchScore(score);
    } catch (error) {
      errorP.innerText = error.message;
    }

    updateCard(book, statusP, readBtn, scoreLabel, scoreP, scoreSelect);
    setLoading(false, readBtn, scoreSelect, delBtn);
  });

  delBtn.addEventListener("click", async () => {
    setLoading(true, readBtn, scoreSelect, delBtn);
    errorP.innerText = "";

    try {
      await book.delete();
      cardDiv.remove();
    } catch (error) {
      errorP.innerText = error.message;
    }

    setLoading(false, readBtn, scoreSelect, delBtn);
  });
}
