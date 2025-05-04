const API_URL = "https://archivio-libri-api.vercel.app/api/books";

async function fetchBooks() {
  const response = await fetch(API_URL);
  const books = await response.json();
  return books;
}

function renderBooks(books) {
  const container = document.getElementById("results");
  container.innerHTML = "";
  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <img src="${book.permalinkimmagine}" alt="${book.titolo}" height="300">
      <h2>${book.titolo}</h2>
      <p><strong>Anno:</strong> ${book.anno}</p>
      <p><strong>Editore:</strong> ${book.editore}</p>
    `;
    container.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("keydown", async function(e) {
  if (e.key === "Enter") {
    const query = e.target.value.toLowerCase();
    const books = await fetchBooks();
    const filtered = books.filter(b =>
      (b.titolo && b.titolo.toLowerCase().includes(query)) ||
      (b.anno && b.anno.includes(query)) ||
      (b.editore && b.editore.toLowerCase().includes(query))
    );
    renderBooks(filtered);
  }
});
