class Book {
  constructor(title, author, pages, isread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isread ? "read" : "not read yet"
    }`;
  }
}

class Library {
  constructor() {
    this.myLibrary = [];
    this.collections = [];
  }

  addBookToLibrary(title, author, pages, isread) {
    const newBook = new Book(title, author, pages, isread);
    this.myLibrary.push(newBook);
  }

  displayBook() {
    const cards = document.querySelector(".cards");
    this.myLibrary.forEach((book) => {
      if (!this.collections.includes(book)) {
        const card = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const cardAuthor = document.createElement("h3");
        const cardPages = document.createElement("h3");
        const cardIsRead = document.createElement("button");
        const cardRemove = document.createElement("button");
        cardTitle.textContent = `Book: ${book.title}`;
        cardAuthor.textContent = `By ${book.author}`;
        cardPages.textContent = `${book.pages} pages`;
        book.isread
          ? (cardIsRead.textContent = "Read")
          : (cardIsRead.textContent = "Not Read");
        cardRemove.textContent = "Remove";
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(cardIsRead);
        card.appendChild(cardRemove);
        card.classList.add("card");
        cards.appendChild(card);
        this.collections.push(book);
        cardIsRead.classList.add(book.isread ? "read" : "not-read");
        cardIsRead.addEventListener("click", () => {
          console.log("clicked:", cardTitle);
          // Toggle the 'Read' status for the book
          book.isread = !book.isread;
          cardIsRead.textContent = book.isread ? "Read" : "Not Read";
          cardIsRead.classList.remove(!book.isread ? "read" : "not-read");
          cardIsRead.classList.add(book.isread ? "read" : "not-read");
        });
        cardRemove.addEventListener("click", () => {
          const index = this.myLibrary.indexOf(book);
          if (index !== -1) {
            this.myLibrary.splice(index, 1);
          }
          cards.removeChild(card);
        });
        console.log(this.myLibrary);
      }
    });
  }
}

const library = new Library();

const button = document.querySelector(".add-button");
button.addEventListener("click", () => {
  dialog.showModal();
});

const cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", () => {
  dialog.close();
});

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById("title");
  const bookAuthor = document.getElementById("author");
  const bookPages = document.getElementById("pages");
  const bookIsRead = document.getElementById("isRead");
  library.addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookIsRead.checked
  );
  library.displayBook();
  dialog.close();
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookIsRead.checked = false;
});
