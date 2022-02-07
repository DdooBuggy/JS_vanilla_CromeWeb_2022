// HTMLs
const todoWindow = document.querySelector(".todo-window");
const toDoList = document.getElementById("todo-list");
const toDoInput = todoWindow.querySelector("input");
const todoBtn = document.querySelector(".todo-btn");

// todos
const TODOS_KEY = "toDos";
const savedToDos = localStorage.getItem(TODOS_KEY);
let toDos = [];

// classes
const TODO_CHECKED = "todo-checked";

// Icons
const SQUARE = "far fa-square";
const CHECKSQUARE = "far fa-check-square";
const TRASH = "fas fa-trash";


// functions
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
    saveToDos();
}

function saveChecking(item) {
    for (let x=0; x < toDos.length; x++) {
        if (item == toDos[x].id) {
            if (toDos[x].checked == 0) {
                toDos[x].checked = 1;
            } else {
                toDos[x].checked = 0;
            }
            saveToDos();
        }
    }
}

function checkToDo(event) {
    const checkedIcon = document.createElement("i");
    const icon = document.createElement("i");
    const clickedBtn = event.target.parentElement;
    const li = clickedBtn.parentElement.parentElement;

    icon.setAttribute("class", SQUARE);
    checkedIcon.setAttribute("class", CHECKSQUARE);
    

    if (li.classList.contains(TODO_CHECKED)) {
        event.target.remove();
        clickedBtn.appendChild(icon);
        icon.addEventListener("click", checkToDo);
    } else {
        event.target.remove();
        clickedBtn.appendChild(checkedIcon);
        checkedIcon.addEventListener("click", checkToDo);
    }

    saveChecking(parseInt(li.id));

    li.classList.toggle(TODO_CHECKED);
}

function paintToDo(toDoText) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const button = document.createElement("button");
    const span = document.createElement("span");
    const icon = document.createElement("i");
    const trashIcon = document.createElement("i");
   
    if (toDoText.checked == 1) {
        icon.setAttribute("class", CHECKSQUARE);
        li.classList.add(TODO_CHECKED);
    } else {
        icon.setAttribute("class", SQUARE);
    }
    trashIcon.setAttribute("class", TRASH);

    li.id = toDoText.id;
    li.classList.add("todo-list__component");
    span.innerText = toDoText.text;
    
    div.appendChild(button);
    div.appendChild(span);
    button.appendChild(icon);
    li.appendChild(div);
    li.appendChild(trashIcon);
    toDoList.appendChild(li);

    icon.addEventListener("click", checkToDo);
    trashIcon.addEventListener("click", deleteToDo);
}

function handleToDoSubmit(event) {
 const newToDo = toDoInput.value;
 const newToDoObj = {
     text: newToDo,
     id: Date.now(),
     checked:0,
 };
 
 event.preventDefault();
 toDoInput.value = "";
 toDos.push(newToDoObj);
 paintToDo(newToDoObj);
 saveToDos();
}

function todoWindowToggle(event) {
    event.preventDefault();
    todoWindow.classList.toggle(HIDDEN_CLASSNAME);
}


// Exacuation
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

todoWindow.addEventListener("submit", handleToDoSubmit);
todoBtn.addEventListener("click", todoWindowToggle);