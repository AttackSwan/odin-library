const books = document.querySelector(".books");
const formButton = document.querySelector(".open-form");
const form = document.querySelector(".form");
const container = document.querySelector(".container");

formButton.onclick = () => showForm();
form.addEventListener("submit", submitForm);

let myLibrary = [];

function addListeners() {
	books.addEventListener("click", function (event) {
		if (event.target.id === "delete") {
			const book = event.target.closest(".book");
			const index = book.getAttribute("data-key");
			//delete from library
			myLibrary.splice(index, 1);
			//delete from DOM
			book.remove();
			updateDataKeys();
			console.log(myLibrary);
		} else if (event.target.id === "complete") {
			console.log("complete button pressed");
		}
	});
}

function updateDataKeys() {
	const bookDivs = document.querySelectorAll(".book");
	for (let i = 0; i < bookDivs.length; i++) {
		const key = parseInt(bookDivs[i].getAttribute("data-key"));
		if (key > i) {
			bookDivs[i].setAttribute("data-key", i);
		}
	}
}

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(title, author, pages, isRead) {
	const newBook = new Book(title, author, pages, isRead);
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
	const isRead = data.get("book-read") !== null;

	if (BookExists(title)) {
		document.querySelector(".error").style.display = "block";
	} else {
		document.querySelector(".error").style.display = "none";
		addBookToLibrary(
			title,
			data.get("book-author"),
			data.get("book-pages"),
			isRead
		);
		hideForm();
	}
}

function BookExists(title) {
	return myLibrary.some(
		(book) => book.title.toLowerCase() === title.toLowerCase()
	);
}

function addToDom(book) {
	const newBook = document.createElement("div");
	newBook.classList.add("book");

	const titleDiv = createDivWithContent("title", book.title);
	const authorDiv = createDivWithContent("author", book.author);
	const pagesDiv = createDivWithContent("pages", book.pages + " pages");
	const iconsDiv = createIconsDiv();

	//book has already been added so length will be -1
	newBook.setAttribute("data-key", myLibrary.length - 1);

	newBook.append(
		titleDiv,
		authorDiv,
		pagesDiv,
		createDiv("stripe"),
		iconsDiv,
		createDiv("bookSide")
	);

	books.appendChild(newBook);
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

	const img = document.createElement("img");
	img.src = `/img/${id}.svg`;
	img.alt = `${id} icon`;
	img.classList.add("filter-brown");
	img.id = id;

	button.appendChild(img);
	return button;
}

function initShelf() {
	//Three books to initialise the bookshelf
	addBookToLibrary(
		"The Fellowship of the Ring",
		"J. R. R. Tolkien",
		423,
		true
	);
	addBookToLibrary(
		"Harry Potter and the Philosopher's Stone",
		"J. K. Rowling",
		223,
		true
	);
	addBookToLibrary("Heir to the Empire", "Timothy Zhan", 416, true);
}

initShelf();

addListeners();
