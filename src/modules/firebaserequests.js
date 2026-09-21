export const baseURL =
  "https://be26-js2-goodreads-66274-default-rtdb.firebaseio.com/books";

export async function getAllBooks() {
  try {
    const response = await fetch(baseURL + ".json");

    if (!response.ok) {
      throw new Error("Kunde inte hämta böckerna.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postBook(title, author) {
  const options = {
    method: "POST",
    body: JSON.stringify({
      title: title,
      author: author,
      isRead: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(baseURL + ".json", options);

    if (!response.ok) {
      throw new Error("Kunde inte lägga till boken.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
