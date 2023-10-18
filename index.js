const books = document.querySelector('.books');
const addBookBtn = document.querySelector('.add-book');
const modal = document.querySelector('.modal');
const modalForm = modal.querySelector('.modal__form');
const modalCloseBtn = modal.querySelector('.modal__form-close-icon');

const myLibrary = [];

function Book(title, author, numberOfPages, read, id) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.id = id;
  this.read = read;
  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${
        read ? 'read' : 'not read yet'
      }`
    );
  };
}

function addBooKToLibrary(book) {
  myLibrary.push(book);
}

function generateUniqueString(length) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

function addBookToDOM(book) {
  const bookElement = document.createElement('article');
  bookElement.classList.add('book');
  bookElement.dataset.id = book.id;
  bookElement.innerHTML = `
      <div class="book__heading">
        <h2>${book.title}</h2>
        <p><em>By ${book.author}</em></p>
      </div>
      <p>${book.numberOfPages} pages</p>
      <div class="book__btns">
        <button class="toggle-read-btn">Mark as ${
          book.read ? 'Unread' : 'Read'
        }</button>
        <button class="remove-book">Remove</button>
      </div>
    `;
  books.appendChild(bookElement);
}

function addBook(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.title.value;
  const author = form.author.value;
  const numberOfPages = form.pages.value;
  const checkedRadio = modalForm.querySelector('input[type=radio]:checked');
  if (!checkedRadio) return;
  const read = checkedRadio.id === 'read--yes' ? true : false;
  const bookId = generateUniqueString(10);
  const book = new Book(title, author, numberOfPages, read, bookId);
  addBooKToLibrary(book);
  addBookToDOM(book);
  modal.close();
}

function displayBookInLibrary() {
  myLibrary.forEach(addBookToDOM);
}

const theHobbit = new Book(
  'The Hobbit',
  'J.R.R. Tolkien',
  295,
  false,
  generateUniqueString(10)
);
addBooKToLibrary(theHobbit);

function openFormModal() {
  modal.showModal();
}

function removeBookFromLibrary(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) return;
  myLibrary.splice(bookIndex, 1);
}

function removeBook(event) {
  if (!event.target.closest('.remove-book')) return;
  const removeBtn = event.target;
  const book = removeBtn.closest('.book');
  const bookId = book.dataset.id;
  removeBookFromLibrary(bookId);
  book.remove();
}

function toggleReadStatusInLibrary(bookId) {
  const book = myLibrary.find((book) => book.id === bookId);
  book.read = !book.read;
}

function toggleReadStatusInDOM(bookId, toggleReadBtn) {
  const book = myLibrary.find((book) => book.id === bookId);
  toggleReadBtn.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
}

function toggleReadStatus(event) {
  if (!event.target.closest('.toggle-read-btn')) return;
  const toggleReadBtn = event.target;
  const book = toggleReadBtn.closest('.book');
  const bookId = book.dataset.id;
  toggleReadStatusInLibrary(bookId);
  toggleReadStatusInDOM(bookId, toggleReadBtn);
}

function closeModal(event) {
  const modal = event.target.closest('.modal');
  modal.close();
}

displayBookInLibrary();
addBookBtn.addEventListener('click', openFormModal);
modalForm.addEventListener('submit', addBook);
books.addEventListener('click', removeBook);
books.addEventListener('click', toggleReadStatus);
modalCloseBtn.addEventListener('click', closeModal);
