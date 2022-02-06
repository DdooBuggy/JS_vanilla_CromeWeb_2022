const todoWindow = document.querySelector(".todo-window");
const toDoList = document.getElementById("todo-list");
const toDoInput = todoWindow.querySelector("input");
const todoBtn = document.querySelector(".todo-btn")
const TODOS_KEY = "toDos";
const TODO_CHECKED = "todo-checked";

let toDos = [];
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
    saveToDos();
}

function checkToDo(event) {
    const checkedIcon = document.createElement("i");
    const icon = document.createElement("i");
    const clickedBtn = event.target.parentElement;
    const li = clickedBtn.parentElement.parentElement;

    icon.setAttribute("class", "far fa-square");
    checkedIcon.setAttribute("class", "far fa-check-square");
    

    if (li.classList.contains(TODO_CHECKED)) {
        event.target.remove();
        clickedBtn.appendChild(icon);
        icon.addEventListener("click", checkToDo);
    } else {
        event.target.remove();
        clickedBtn.appendChild(checkedIcon);
        checkedIcon.addEventListener("click", checkToDo);
    }

    li.classList.toggle(TODO_CHECKED);
}

function paintToDo(toDoText) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const button = document.createElement("button");
    const span = document.createElement("span");
    const icon = document.createElement("i");
    
    const trashIcon = document.createElement("i");
    icon.setAttribute("class", "far fa-square");
   
    trashIcon.setAttribute("class", "fas fa-trash");
 
    li.id = toDoText.id;
    li.classList.add("todo-list__component");
    span.innerText = toDoText.text;
    
    div.appendChild(button);
    div.appendChild(span);
    button.appendChild(icon);
    icon.addEventListener("click", checkToDo);
    trashIcon.addEventListener("click", deleteToDo);

    li.appendChild(div);
    li.appendChild(trashIcon);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
 event.preventDefault();
 const newToDo = toDoInput.value;
 toDoInput.value = "";
 const newToDoObj = {
     text: newToDo,
     id: Date.now(),
     checked:0,
 };
 toDos.push(newToDoObj);
 paintToDo(newToDoObj);
 saveToDos();
}
todoWindow.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

function todoWindowToggle(event) {
    event.preventDefault();
    todoWindow.classList.toggle(HIDDEN_CLASSNAME);
}

todoBtn.addEventListener("click", todoWindowToggle)