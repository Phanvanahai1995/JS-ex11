"use strict";

const elRegister = document.querySelector(".header-form span");
const formContainer = document.querySelector(".form-container");
const btnClose = document.querySelector(".btn-close");
const overlay = document.querySelector(".overlay");
const formChoose = document.querySelector(".form-choose");
const btnRegister = document.querySelectorAll(".register");
const btnLogin = document.querySelectorAll(".form-dk");
const emailRegister = document.querySelector("#email-register");
const passwordRegister = document.querySelector("#password-register");
const formRegister = document.querySelector("#form-register");
const hidePasswordRegisterEl = document.querySelector(
  "#form-register .fa-hidden"
);
const formLogin = document.querySelector("#form-login");
const username = document.querySelector("#username");
const emailLogin = document.querySelector("#email-login");
const passwordLogin = document.querySelector("#password-login");
const hidePasswordLoginEl = document.querySelector("#form-login .fa-hidden");

const inputArr = document.querySelectorAll("input");
const spanELs = document.querySelectorAll(".hide-error");
const formInputs = document.querySelectorAll(".form-input");
const formInputsRegister = document.querySelectorAll(
  "#form-register .form-input"
);
const formInputsLogin = document.querySelectorAll("#form-login .form-input");
////////////////// Modal
// function open Modal
const handlerOpenModal = function () {
  formContainer.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// function close Modal
const handlerCloseModal = function () {
  formContainer.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Handle Even Modal
elRegister.addEventListener("click", handlerOpenModal);

overlay.addEventListener("click", function () {
  handlerCloseModal();
  removeDataForm();
});

btnClose.addEventListener("click", function () {
  handlerCloseModal();
  removeDataForm();
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    removeDataForm();
    handlerCloseModal();
  }
});

////////////////// End Modal

///////////////// Form validator

// Function choose form register or login

function removeDataForm() {
  inputArr.forEach((input) => (input.value = ""));
  spanELs.forEach((span) => (span.innerHTML = ""));
  formInputs.forEach((el) => {
    el.classList.remove("error");
    el.classList.remove("success");
  });
}

formChoose.addEventListener("click", function (e) {
  e.preventDefault();
  btnRegister.forEach((form) => {
    form.classList.toggle("register-active");
    removeDataForm();
  });

  btnLogin.forEach((form) => {
    form.classList.toggle("form-hidden");
    removeDataForm();
  });
});

// Function show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-input error";
  const span = formControl.querySelector("span");
  span.innerText = message;
}

// Function show input success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-input success";
  const span = formControl.querySelector("span");
  span.innerText = "";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else if (input.value.trim() === "") {
    showError(input, `Vui lòng nhập thông tin`);
  } else {
    showError(input, "Vui lòng nhập đúng định dạng email");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `Vui lòng nhập thông tin`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Vui lòng nhập thông tin`);
  } else if (input.value.length > max) {
    showError(input, `Password nhiều nhất ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// function check all

function eventInputCheck(event, el, arr) {
  if (arr.length < 3) {
    el.addEventListener(event, function () {
      checkRequired(arr);
      checkLength(arr[1], 6, 25);
      checkEmail(arr[0]);
    });
  } else {
    el.addEventListener(event, function () {
      checkRequired(arr);
      checkLength(arr[1], 6, 25);
      checkLength(arr[2], 6, 25);
      checkEmail(arr[0]);
    });
  }
}

function checkAll(inputArr) {
  inputArr.forEach((input) => {
    eventInputCheck("input", input, inputArr);
    eventInputCheck("blur", input, inputArr);
  });
}

checkAll([emailRegister, passwordRegister]);

checkAll([emailLogin, passwordLogin, username]);

// function handle hide and hidden password
function handleHideHiddenPassword(password, el) {
  if (el.classList.contains("fa-eye")) {
    password.type = "text";
    el.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    password.type = "password";
    el.classList.replace("fa-eye-slash", "fa-eye");
  }
}

/////////////////////// Event

// Hide and hidden password Register
hidePasswordRegisterEl.addEventListener("click", () => {
  handleHideHiddenPassword(passwordRegister, hidePasswordRegisterEl);
});

// Hide and hidden password Login
hidePasswordLoginEl.addEventListener("click", () => {
  handleHideHiddenPassword(passwordLogin, hidePasswordLoginEl);
});

// Application

function setDataUserRegister(email, password) {
  localStorage.setItem("emailRegister", email);
  localStorage.setItem("passwordRegister", password);
}

function setDataUserLogin(username, email, password) {
  localStorage.setItem("usernameLogin", username);
  localStorage.setItem("emailLogin", email);
  localStorage.setItem("passwordLogin", password);
}

// Submit Form event

formRegister.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([emailRegister, passwordRegister]);
  checkLength(passwordRegister, 6, 25);
  checkEmail(emailRegister);

  if (
    Array.from(formInputsRegister).every((input) =>
      input.classList.contains("success")
    )
  ) {
    setDataUserRegister(emailRegister.value, passwordRegister.value);
    removeDataForm();
  }
});

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([emailLogin, passwordLogin, username]);
  checkLength(passwordLogin, 6, 25);
  checkLength(username, 6, 25);
  checkEmail(emailLogin);

  if (
    Array.from(formInputsLogin).every((input) =>
      input.classList.contains("success")
    )
  ) {
    setDataUserLogin(username, emailLogin, passwordLogin);
    removeDataForm();
  }
});
