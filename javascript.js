const books = document.querySelector(".books");
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
	addToDom(newBook);
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
	document.getElementById("book-form").reset();
}

function submitForm(e) {
	e.preventDefault();
	const data = new FormData(e.target);
	const title = data.get("book-title");

	if (BookExists(title)) {
		document.querySelector(".error").style.display = "block";
	} else {
		document.querySelector(".error").style.display = "none";
		addBookToLibrary(data);
		hideForm();
	}
}

function BookExists(title) {
	return myLibrary.some(
		(book) => book.title.toLowerCase() === title.toLowerCase()
	);
}

function displayBooks() {}

function addToDom(book) {
	const newBook = document.createElement("div");
	newBook.classList.add("book");

	const titleDiv = createDivWithContent("title", book.title);
	const authorDiv = createDivWithContent("author", book.author);
	const pagesDiv = createDivWithContent("pages", book.pages + " pages");
	const iconsDiv = createIconsDiv();

	newBook.append(
		titleDiv,
		authorDiv,
		pagesDiv,
		createDiv("stripe"),
		iconsDiv,
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

function createIconsDiv() {
	const div = createDiv("icons");
	const completedButton = createButton("complete");
	const deleteButton = createButton("delete");

	div.append(completedButton, deleteButton);
	return div;
}

function createButton(id) {
	//ensure svg filename matches id.
	const button = document.createElement("button");
	button.classList.add("icon");
	button.id = id;

	const img = document.createElement("img");
	img.src = `/img/${id}.svg`;
	img.alt = `${id} icon`;
	img.classList.add("filter-brown");

	button.appendChild(img);
	return button;
}

function initShelf() {
	//Three books to initialise the bookshelf
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

	//display initial books
	myLibrary.forEach(addToDom);
}

initShelf();
