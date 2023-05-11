const books = document.querySelector(".books.top");
const formButton = document.querySelector(".open-form");
const form = document.querySelector(".form");
const container = document.querySelector(".container");

formButton.onclick = () => showForm();
form.addEventListener("submit", submitForm);

let myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(data) {
	const isRead = data.get("book-read") !== null;
	const newBook = new Book(
		data.get("book-title"),
		data.get("book-author"),
		data.get("book-pages"),
		isRead
	);
	myLibrary.push(newBook);
	console.log(newBook);
}

function showForm() {
	form.style.display = "block";
	container.style.filter = "blur(4px)";
	formButton.disabled = true;
}

function hideForm() {
	form.style.display = "none";
	container.style.filter = "blur(0)";
	formButton.disabled = false;
}

function submitForm(e) {
	e.preventDefault();
	const data = new FormData(e.target);
	addBookToLibrary(data);
}

function displayBooks() {
	//for each book in the array
	myLibrary.forEach(addToDom);
	//add the book to the Dom
	// let arrayIndex = myLibrary.length;
	// console.log(arrayIndex);

	// let book = document.createElement("div");
	// book.classList.add("book");
	// book.setAttribute("data-index", arrayIndex);
	// books.appendChild(book);
	// myLibrary.push(book);

	// console.log(myLibrary);
	// for (i = 0; i < (size * size); i++){
	//     let cell = document.createElement('div');
	//     cell.classList.add("grid-item");
	//     cell.setAttribute('Data-opacity', 0);
	//     //add listener
	//     cell.addEventListener('mouseover', (e) => {
	//         colorCell(e);
	//     });
	//     grid.appendChild(cell);
}

function addToDom(book) {
	const newBook = document.createElement("div");
	newBook.classList.add("book");

	const titleDiv = createDivWithContent("title", book.title);
	const authorDiv = createDivWithContent("author", book.author);
	const pagesDiv = createDivWithContent("pages", book.pages + " pages");

	newBook.append(
		titleDiv,
		authorDiv,
		pagesDiv,
		createDiv("stripe"),
		createDiv("bookRead"),
		createDiv("bookSide")
	);

	books.appendChild(newBook);
	console.log(myLibrary);
}

function createDiv(className) {
	const div = document.createElement("div");
	div.classList.add(className);
	return div;
}

function createDivWithContent(className, content) {
	const div = createDiv(className);
	div.appendChild(document.createTextNode(content));
	return div;
}

function initShelf() {
	const initBook1 = new Book(
		"The Fellowship of the Ring",
		"J. R. R. Tolkien",
		423,
		true
	);
	const initBook2 = new Book(
		"Harry Potter and the Philosopher's Stone",
		"J. K. Rowling",
		223,
		true
	);
	const initBook3 = new Book("Heir to the Empire", "Timothy Zhan", 416, true);
	myLibrary.push(initBook1, initBook2, initBook3);
	displayBooks();
}

initShelf();
