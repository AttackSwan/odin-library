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
	let isRead = true;
	if (data.get("book-read") === null) {
		isRead = false;
	}
	const newBook = new Book(
		data.get("book-title"),
		data.get("book-author"),
		data.get("book-pages"),
		isRead
	);
	myLibrary.push(newBook);
	console.log(myLibrary);
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

function addBook() {
	let arrayIndex = myLibrary.length;
	console.log(arrayIndex);

	let book = document.createElement("div");
	book.classList.add("book");
	book.setAttribute("data-index", arrayIndex);
	books.appendChild(book);
	myLibrary.push(book);

	console.log(myLibrary);
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
