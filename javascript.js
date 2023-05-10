const books = document.querySelector(".books.top");
const formButton = document.querySelector(".open-form");
const form = document.querySelector(".form");
const container = document.querySelector(".container");

formButton.onclick = () => showForm();
form.addEventListener("submit", submitForm);
// formButton.onclick = () => addBook();

let myLibrary = [];

function showForm() {
	// console.log("Click");
	form.style.display = "block";
	container.style.filter = "blur(4px)";
	formButton.disabled = true;
}

function submitForm(e) {
	e.preventDefault();
	const myFormData = new FormData(e.target);

	const formDataObj = {};
	myFormData.forEach((value, key) => (formDataObj[key] = value));
	console.log(formDataObj);
	hideForm();
}

function hideForm() {
	form.style.display = "none";
	container.style.filter = "blur(0)";
	formButton.disabled = false;
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
