import { baseURL } from "./firebaserequests.js";

export class Book {
  #id;
  #title;
  #author;
  #isRead;
  #score;
  #url;

  constructor(id, title, author, isRead, score) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#isRead = isRead;
    this.#score = score;
    this.#url = `${baseURL}/${this.#id}.json`;
  }

  async patchIsRead() {
    const newIsRead = !this.#isRead;
    const updatedBook = { isRead: newIsRead };

    const options = {
      method: "PATCH",
      body: JSON.stringify(updatedBook),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(this.#url, options);

      if (!response.ok) {
        throw new Error("Kunde inte ändra lässtatus.");
      }

      this.#isRead = newIsRead;
    } catch (error) {
      throw error;
    }
  }

  async patchScore(score) {
    const options = {
      method: "PATCH",
      body: JSON.stringify({ score: score }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(this.#url, options);

      if (!response.ok) {
        throw new Error("Kunde inte spara betyget.");
      }

      this.#score = score;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    const options = { method: "DELETE" };

    try {
      const response = await fetch(this.#url, options);

      if (!response.ok) {
        throw new Error("Kunde inte ta bort boken.");
      }
    } catch (error) {
      throw error;
    }
  }

  getTitle() {
    return this.#title;
  }

  getAuthor() {
    return this.#author;
  }

  getIsRead() {
    return this.#isRead;
  }

  getScore() {
    return this.#score;
  }
}
