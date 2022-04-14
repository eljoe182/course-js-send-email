const formEmail = document.querySelector("#enviar-mail");
const btnSend = document.querySelector("#enviar");
const btnResetForm = document.querySelector("#resetBtn");
const fromTo = document.querySelector("#email");
const subject = document.querySelector("#asunto");
const message = document.querySelector("#mensaje");
const spinner = document.querySelector("#spinner");

const fieldValidator = {
  email: false,
  asunto: false,
  mensaje: false,
};

const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function cleanSuccessFields() {
  fromTo.classList.remove("border-green-500");
  subject.classList.remove("border-green-500");
  message.classList.remove("border-green-500");
}

function main() {
  spinner.style.display = "none";
  formEmail.reset();
  btnSend.disabled = true;
  btnSend.classList.add("cursor-not-allowed", "opacity-50");

  cleanSuccessFields();
}

function errorMessage(e, message) {
  fieldValidator[e.target.id] = false;
  let error = e.target.parentElement.querySelector("p");
  if (!error) {
    error = document.createElement("p");
  }
  e.target.classList.remove("border-green-500");
  e.target.classList.add("border-red-500");
  error.innerText = message;
  error.classList.add("text-red-500", "text-sm");
  e.target.parentElement.appendChild(error);
}

function validateForm(e) {
  if (e.target.value.length === 0) {
    errorMessage(e, "This field is required");
    return;
  }

  if (e.target.type === "email" && !regexEmail.test(e.target.value)) {
    errorMessage(e, "Invalid email");
    return;
  }

  e.target.classList.remove("border-red-500");
  e.target.classList.add("border-green-500");
  const error = e.target.parentElement.querySelector("p");
  if (error) {
    e.target.parentElement.removeChild(error);
  }

  fieldValidator[e.target.id] = true;

  if (fieldValidator.email && fieldValidator.asunto && fieldValidator.mensaje) {
    btnSend.disabled = false;
    btnSend.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function formSubmit(e) {
  e.preventDefault();
  console.log("form submit");

  spinner.style.display = "flex";

  setTimeout(() => {
    main();
  }, 3000);
}

function resetForm(e) {
  e.preventDefault();
  main();
}

function eventListeners() {
  document.addEventListener("DOMContentLoaded", main);

  fromTo.addEventListener("blur", validateForm);
  subject.addEventListener("blur", validateForm);
  message.addEventListener("blur", validateForm);

  formEmail.addEventListener("submit", formSubmit);
  btnResetForm.addEventListener("click", resetForm);
}

eventListeners();
