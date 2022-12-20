// Elements selection
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#form-edit')
const editInput = document.querySelector('#edit-input')
const cancelButton = document.querySelector('#cancel-button')
let oldInputValue;

// Functions
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle)

    console.log(todo);

    const doneButton = document.createElement("button")
    doneButton.classList.add("finish-todo")
    doneButton.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon>'
    todo.appendChild(doneButton)

    const editButton = document.createElement("button")
    editButton.classList.add("edit-todo")
    editButton.innerHTML = '<ion-icon name="pencil-outline"></ion-icon>'
    todo.appendChild(editButton)

    const removeButton = document.createElement("button")
    removeButton.classList.add("remove-todo")
    removeButton.innerHTML = '<ion-icon name="close-circle-outline"></ion-icon>'
    todo.appendChild(removeButton)

    todoList.appendChild(todo)

    todoInput.value = "";
    todoInput.focus()
};

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {
    let todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}

//Events
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const inputValue = todoInput.value 
    if(inputValue) {
        saveTodo(inputValue)
    }

    console.log(inputValue)
});

document.addEventListener("click", (e) =>{
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");
    let todoTitle;

    if(parentElement && parentElement.querySelector("h3")) {
        todoTitle = parentElement.querySelector("h3").innerText;
    }

    if(targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done")
    }

    if(targetElement.classList.contains("remove-todo")) {
        parentElement.remove();
    }

    if(targetElement.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    const editInputValue = editInput.value

    if(editInputValue) {
        //Atualize
        updateTodo(editInputValue)
    }

    toggleForms();
})