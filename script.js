const myLibrary = [];
const collections = [];
function Book(title, author, pages, isread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isread = isread;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isread ? "read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(title, author, pages, isread) {
  const newBook = new Book(title, author, pages, isread);
  myLibrary.push(newBook);
}
let cards = document.querySelector(".cards");
const dialog = document.querySelector("#dialog");
function displayBook() {
  myLibrary.forEach((book) => {
    if (!collections.includes(book)) {
      let card = document.createElement("div");
      let cardTitle = document.createElement("h3");
      let cardAuthor = document.createElement("h3");
      let cardPages = document.createElement("h3");
      let cardIsRead = document.createElement("button");
      let cardRemove = document.createElement("button");
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
      collections.push(book);
      cardIsRead.classList.add(book.isread ? "read" : "not-read");
      cardIsRead.addEventListener("click", () => {
        console.log("clicked :", cardTitle);
        // Toggle the 'Read' status for the book
        book.isread = !book.isread;
        cardIsRead.textContent = book.isread ? "Read" : "Not Read";
        cardIsRead.classList.remove(!book.isread ? "read" : "not-read");
        cardIsRead.classList.add(book.isread ? "read" : "not-read");
      });
      cardRemove.addEventListener("click", () => {
        const index = myLibrary.indexOf(book);
        if (index != -1) {
          myLibrary.splice(index, 1);
        }
        cards.removeChild(card);
      });
      console.log(myLibrary);
    }
  });
}

let button = document.querySelector(".add-button");
button.addEventListener("click", () => {
  dialog.showModal();
});
let cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", () => {
  dialog.close();
});
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let bookTitle = document.getElementById("title");
  let bookAuthor = document.getElementById("author");
  let bookPages = document.getElementById("pages");
  let bookIsRead = document.getElementById("isRead");
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookIsRead.checked
  );
  displayBook();
  dialog.close();
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookIsRead.checked = false;
});
