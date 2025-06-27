var header = document.querySelector(".header");
var title = document.querySelector(".title");
var userName = document.querySelector("#name");
var userEmail = document.querySelector("#email");
var userPassword = document.querySelector("#password");
var message = document.querySelector("#message");
var actionBtn = document.querySelector("#action-btn");
var box = document.querySelector(".box");
var form = document.querySelector("#form");
var changeAuthText = document.querySelector("#change-form-text");
var changeAuthBtn = document.querySelector("#change-form-btn");
var logoutBtn = document.querySelector("#logout");
var currentAuth = "login";
var users = [];
if (JSON.parse(localStorage.getItem("users"))) {
  users = JSON.parse(localStorage.getItem("users"));
}

if (localStorage.getItem("signedInUserName")) {
  var signedInUserName = localStorage.getItem("signedInUserName");
  signedIn(signedInUserName);
}

function login(e) {
  e.preventDefault();
  if (
    validationLength(userEmail.value) &&
    validationLength(userPassword.value)
  ) {
    var userData = {
      email: userEmail.value.trim(),
      password: userPassword.value,
    };
    var isUserCorrect = isDataCorrect(userData);
    if (isUserCorrect) {
      signedIn(isUserCorrect.name);
      clearInputs();
    } else {
      message.classList.remove("d-none");
      if (message.classList.contains("text-success")) {
        message.classList.replace("text-success", "text-danger");
      }
      message.innerHTML = "incorrect email or password";
    }
  } else {
    message.innerHTML = "All inputs is required";
    if (message.classList.contains("text-success")) {
      message.classList.replace("text-success", "text-danger");
    }
    message.classList.remove("d-none");
  }
}

function signUp(e) {
  e.preventDefault();
  if (
    validationLength(userName.value) &&
    validationLength(userEmail.value) &&
    validationLength(userPassword.value)
  ) {
    var userData = {
      name: userName.value.trim(),
      email: userEmail.value.trim(),
      password: userPassword.value,
    };

    if (isUserExist(userData)) {
      message.classList.remove("d-none");
      if (message.classList.contains("text-success")) {
        message.classList.replace("text-success", "text-danger");
      }
      message.innerHTML = "email already exists";
    } else {
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      message.classList.replace("text-danger", "text-success");
      message.classList.remove("d-none");
      message.innerHTML = "Success";
    }
  } else {
    message.innerHTML = "All inputs is required";
    if (message.classList.contains("text-success")) {
      message.classList.replace("text-success", "text-danger");
    }
    message.classList.remove("d-none");
  }
}

form.addEventListener("submit", (e) => {
  if (currentAuth === "login") {
    login(e);
  } else {
    signUp(e);
  }
});

function changeAuth() {
  if (currentAuth === "login") {
    currentAuth = "signup";
    userName.classList.remove("d-none");
    actionBtn.innerHTML = "Sign Up";
    changeAuthText.innerHTML = "You have an account?";
    changeAuthBtn.innerHTML = "Signin";
  } else if (currentAuth === "signup") {
    currentAuth = "login";
    userName.classList.add("d-none");
    actionBtn.innerHTML = "Login";
    changeAuthText.innerHTML = "Don’t have an account?";
    changeAuthBtn.innerHTML = "Sign Up";
  }
  message.innerHTML = "";
  clearInputs();
}

changeAuthBtn.addEventListener("click", changeAuth);

function validationLength(input) {
  if (input.length === 0) return false;
  return true;
}

function isDataCorrect(user) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password)
      return users[i];
  }
  return false;
}

function isUserExist(user) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === user.email) return true;
  }
  return false;
}

function signedIn(userName) {
  header.classList.remove("d-none");
  form.classList.add("d-none");
  changeAuthBtn.classList.add("d-none");
  changeAuthText.classList.add("d-none");
  message.classList.add("d-none");
  box.parentElement.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  box.parentElement.style.height = "calc(100vh - 53.6px)";
  if (message.classList.contains("text-success")) {
    message.classList.replace("text-success", "text-danger");
  }
  message.innerHTML = "";
  localStorage.setItem("signedInUserName", userName);
  title.innerHTML = `Welcome ${userName}`;
}

function logout() {
  header.classList.add("d-none");
  form.classList.remove("d-none");
  changeAuthBtn.classList.remove("d-none");
  changeAuthText.classList.remove("d-none");
  box.parentElement.classList.remove(
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  // box.parentElement.style.height = "auto";
  if (message.classList.contains("text-success")) {
    message.classList.replace("text-success", "text-danger");
  }
  message.innerHTML = "";
  localStorage.removeItem("signedInUserName");
  title.innerHTML = "Smart Login System";
}

logoutBtn.addEventListener("click", logout);

function clearInputs() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}
