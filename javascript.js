const formButton = document.querySelector(".open-form");
const form = document.querySelector(".form");

formButton.onclick = () => openForm();

function openForm() {
  form.style.display = "block";
  document.querySelector(".container").style.filter = "blur(4px)";
}
