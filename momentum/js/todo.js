const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");
const TODOS_KEY = "toDos";

let toDos = [];
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement.parentElement;
    li.remove();
    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(toDoText) {
    const li = document.createElement("li");
    li.id = toDoText.id;
    li.classList.add("todo-list__component");
    const span = document.createElement("span");
    span.innerText = toDoText.text;
    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.setAttribute("class", "far fa-square");
    button.appendChild(icon);
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
 event.preventDefault();
 const newToDo = toDoInput.value;
 toDoInput.value = "";
 const newToDoObj = {
     text: newToDo,
     id: Date.now(),
 };
 toDos.push(newToDoObj);
 paintToDo(newToDoObj);
 saveToDos();
}
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}