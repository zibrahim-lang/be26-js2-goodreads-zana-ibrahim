import { getBookCard } from "./modules/getbookcard.js";
import { getAllBooks, postBook } from "./modules/firebaserequests.js";
import { Book } from "./modules/Book.js";
import "./style.css";

const wrapper = document.querySelector("#bookWrapper");
const form = document.querySelector("#bookForm");
const message = document.querySelector("#message");

message.innerText = "Hämtar böcker...";

getAllBooks()
  .then(renderAllBooks)
  .catch((error) => {
    message.innerText = error.message;
  });

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  // Om fälten är tomt visar ett meddelande
  if (title === "" || author === "") {
    message.innerText = "Fyll i både titel och författare.";
    return;
  }

  message.innerText = "";

  try {
    const data = await postBook(title, author); // Sparar boken
    const book = new Book(data.name, title, author, false); // Skapar insatsen
    const card = getBookCard(book); // Visar boken
    wrapper.append(card);
    form.reset();
  } catch (error) {
    message.innerText = error.message;
  }
});

function renderAllBooks(books) {
  message.innerText = "";

  for (const id in books) {
    const book = new Book(
      id,
      books[id].title,
      books[id].author,
      books[id].isRead,
      books[id].score,
    );

    const card = getBookCard(book);
    wrapper.append(card);
  }
}
