const loginForm = document.querySelector(".login-form");
const loginInput = document.querySelector(".login-form input");
const greeting = document.querySelector("#greeting");
const todoBox = document.querySelector(".todo-box");
const clockBox = document.querySelector(".clock-box")
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const savedUsername = localStorage.getItem(USERNAME_KEY);
const CLOCKPOSITION_CLASSNAME = "clock-initial-position";

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    loginInput.classList.add(HIDDEN_CLASSNAME);
    clockBox.classList.remove(CLOCKPOSITION_CLASSNAME);
    const typedUsername = loginInput.value;
    localStorage.setItem(USERNAME_KEY, typedUsername);
    paintGreetings(typedUsername)
}

function paintTotoBox() {
    todoBox.classList.remove(HIDDEN_CLASSNAME);
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    
} else {
    paintGreetings(savedUsername);
    paintTotoBox();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    loginInput.classList.add(HIDDEN_CLASSNAME);
    clockBox.classList.remove(CLOCKPOSITION_CLASSNAME);
}
loginForm.addEventListener("submit", onLoginSubmit);
loginForm.addEventListener("submit", paintTotoBox);