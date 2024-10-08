const input = document.getElementById('todo-input');
const button = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    todos.forEach(todo => {
        appendElementoToTodoList(todo)
    })

})

const editTodo = (pElement, liElement) => {
    pElement.addEventListener('dblclick', () => {
        const inputItem = document.createElement('input');
        inputItem.type = 'text';
        inputItem.value = pElement.textContent
        liElement.replaceChild(inputItem, pElement);

        inputItem.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                if (!validateInput(inputItem.value)) return;
                pElement.textContent = inputItem.value;
                liElement.replaceChild(pElement, inputItem);
            }
        })
    })
}

const validateInput = (todoItem) => {
    if (todoItem.trim() === "") {
        alert("Debes escribir una tarea");
        return false;
    }
    return true
}

const appendElementoToTodoList = (todoItem) => {
    const element = document.createElement('li');
    const text = document.createElement('p');
    const separator = document.createElement('hr');
    const time = document.createElement('p');
    const deleteButton = document.createElement('button');
    const completedButton = document.createElement('button');

    deleteButton.textContent = "Eliminar"
    completedButton.textContent = "Completado"


    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    separator.classList.add('separator');
    time.classList.add('time');
    text.classList.add('todo-text');

    const monthsOfYear = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
    const monthName = monthsOfYear[month];
    
    time.textContent = `${day}-${monthName}-${year} ${hours}:${minutes}:${seconds}`;
    text.textContent = todoItem;
    element.appendChild(text);
    element.appendChild(separator);
    element.appendChild(time);
    element.appendChild(completedButton);
    element.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        element.remove();
    })

    completedButton.addEventListener('click', () => {
        element.classList.toggle('completed');
        if (completedButton.textContent === "Completado") {
            completedButton.textContent = "Anular"
        } else {
            completedButton.textContent = "Completado"
        }
    })

    editTodo(text, element)

    todoList.appendChild(element);

}

const addTodo = () => {
    const todos = []

    const todoItem = input.value

    if (!validateInput(todoItem)) return;

    appendElementoToTodoList(todoItem)

    todos.push("Elemento 1")
    todos.push("Elemento 2")
    todos.push("Elemento 3")
    localStorage.setItem("todos", JSON.stringify(todos))

    input.value = "";
}

button.addEventListener('click', addTodo);

const updateClock = () => {
    const dateNow = new Date()

    const hour = String(dateNow.getHours()).padStart(2, '0')
    const minute = String(dateNow.getMinutes()).padStart(2, '0')
    const second = String(dateNow.getSeconds()).padStart(2, '0')    

    const hourHtml = document.getElementById('hours')
    const minuteHtml = document.getElementById('minutes')
    const secondHtml = document.getElementById('seconds')

    hourHtml.textContent = hour
    minuteHtml.textContent = minute
    secondHtml.textContent = second
}

/* Callback function */



setInterval(updateClock,1000)

updateClock()