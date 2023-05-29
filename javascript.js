const books = document.querySelector(".books");
const formButton = document.querySelector(".open-form");
const form = document.querySelector(".form");
const container = document.querySelector(".container");

formButton.onclick = () => showForm();
form.addEventListener("submit", submitForm);

let myLibrary = [];

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	changeReadStatus(index) {
		this.read = !this.read;
		colorReadIcon(index);
	}
}

function colorReadIcon(index) {
	const bookDiv = document.querySelector(`.book[data-key="${index}" `);
	const readIcon = bookDiv.querySelector("#complete");
	const hasBeenRead = myLibrary[index].read;

	if (hasBeenRead) {
		//turn on green filter
		readIcon.classList.remove("filter-brown");
		readIcon.classList.add("filter-blue");
		readIcon.style.top = "-20px";
	} else {
		//turn on brown filter
		readIcon.classList.add("filter-brown");
		readIcon.classList.remove("filter-blue");
		readIcon.style.top = "0px";
	}
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

function addListeners() {
	books.addEventListener("click", function (event) {
		const book = event.target.closest(".book");
		const index = book.getAttribute("data-key");
		const id = event.target.id;

		//delete button
		if (id === "delete") {
			removeBook(book, index);
		}

		//read button
		else if (id === "complete") {
			myLibrary[index].changeReadStatus(index);
		}
	});
}

function BookExists(title) {
	return myLibrary.some(
		(book) => book.title.toLowerCase() === title.toLowerCase()
	);
}

function addBookToLibrary(title, author, pages, isRead) {
	const newBook = new Book(title, author, pages, isRead);
	myLibrary.push(newBook);
	addToDom(newBook);
}

function removeBook(book, index) {
	myLibrary.splice(index, 1);

	//delete from DOM
	book.remove();
	updateDataKeys();
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

function addToDom(book) {
	const newBook = document.createElement("div");
	newBook.classList.add("book");

	const titleDiv = createDivWithContent("title", book.title);
	const authorDiv = createDivWithContent("author", book.author);
	const pagesDiv = createDivWithContent("pages", book.pages + " pages");
	const iconsDiv = createIconsDiv(book);

	//book has already been added so array index will be at length -1
	const index = myLibrary.length - 1;

	newBook.setAttribute("data-key", index);

	newBook.append(
		titleDiv,
		authorDiv,
		pagesDiv,
		createDiv("stripe"),
		iconsDiv,
		createDiv("bookSide")
	);

	books.appendChild(newBook);
	colorReadIcon(index);
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

function createIconsDiv(book) {
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
	img.id = id;

	button.appendChild(img);
	return button;
}

function initShelf() {
	//Four books to initialise the bookshelf
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
	addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
}

initShelf();

addListeners();
