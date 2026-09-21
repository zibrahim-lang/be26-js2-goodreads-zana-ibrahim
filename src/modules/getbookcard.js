export function getBookCard(book) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("book-card");

  const titleH3 = document.createElement("h3");
  titleH3.innerText = book.getTitle();

  const authorP = document.createElement("p");
  authorP.innerText = `Författare: ${book.getAuthor()}`;

  const statusP = document.createElement("p");
  const scoreP = document.createElement("p");

  const readBtn = document.createElement("button");

  const scoreLabel = document.createElement("label");
  scoreLabel.innerText = "Välj betyg: ";

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

  scoreLabel.append(scoreSelect);

  const delBtn = document.createElement("button");
  delBtn.innerText = "Ta bort";

  const errorP = document.createElement("p");
  errorP.classList.add("error");

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

  function updateCard() {
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
  function setLoading(isLoading) {
    readBtn.disabled = isLoading;
    scoreSelect.disabled = isLoading;
    delBtn.disabled = isLoading;
  }

  readBtn.addEventListener("click", async () => {
    setLoading(true);
    errorP.innerText = "";

    try {
      await book.patchIsRead();
      updateCard();
    } catch (error) {
      errorP.innerText = error.message;
    }

    setLoading(false);
  });

  scoreSelect.addEventListener("change", async () => {
    setLoading(true);
    errorP.innerText = "";

    if (scoreSelect.value != "Välj 1-5") {
      try {
        const score = Number(scoreSelect.value);
        await book.patchScore(score);
      } catch (error) {
        errorP.innerText = error.message;
      }
      updateCard();
    }
    setLoading(false);
  });

  delBtn.addEventListener("click", async () => {
    setLoading(true);
    errorP.innerText = "";

    try {
      await book.delete();
      cardDiv.remove();
    } catch (error) {
      errorP.innerText = error.message;
    }

    setLoading(false);
  });

  updateCard();
  return cardDiv;
}
