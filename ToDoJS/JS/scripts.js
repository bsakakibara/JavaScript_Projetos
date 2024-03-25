// seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

const searchInput = document.querySelector("#search-input")
const eraseBtn = document.querySelector("#erase-button")
const filterBtn = document.querySelector("#filter-select")

let oldInputValue


// funções
const saveTodo = (text, done = 0, save = 1) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn)

    // utilizando dados da lc
    if(done) {
        todo.classList.add("done")
    }

    if (save) {
        saveTodoLocalStorage({text, done})
    }
    // salvando dados acima do saveTodo
    todoList.appendChild(todo)

    todoInput.value = ""

    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text

            updateTodoLocalStorage(oldInputValue, text)
        }

    })
}

const getSearchsTodos = (search) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLocaleLowerCase()

        const normalizedSearch = search.toLocaleLowerCase()

        todo.style.display = "flex"

        if (!todoTitle.includes(normalizedSearch)) {
            todo.style.display = "none"
        }

    })

}

const filterTodo = (filterValue) => {

    const todos = document.querySelectorAll(".todo")

    switch (filterValue) {

        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"))
            break


        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            )
            break

        case "todo":
            todos.forEach((todo) =>
            !todo.classList.contains("done") 
            ? (todo.style.display = "flex")
            : (todo.style.display = "none") )
            break 
    }
}


// eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = todoInput.value
    if (inputValue) {
        saveTodo(inputValue)
        // save todo
    }

})

document.addEventListener("click", (e) => {

    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")

        updateTodoStatusLocalStorage(todoTitle)
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove()

       removeTodoLocalStorage(todoTitle) 
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        // atualizando edição
        updateTodo(editInputValue)
    }

    toggleForms()

})

searchInput.addEventListener("keyup", (e) => {

    const search = e.target.value

    getSearchsTodos(search)

})

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault()

    searchInput.value = ""
    // faz com que os titles reapareção após o click eraseBtn
    searchInput.dispatchEvent(new Event("keyup"))

})

filterBtn.addEventListener("change", (e) => {

    const filterValue = e.target.value

    filterTodo(filterValue)

})

// local storage

const getTodosLocalStorage = () => {
    // enviando dados e convertendo Json em objeto (parse) ou se vier resultado vazio, retorna vazio
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos
}

// carregando informações na tela
const loadTodos = () => {
    const todos = getTodosLocalStorage()

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0)
    
    })
}


const saveTodoLocalStorage = (todo) => {

// add todos os todos da ls
    const todos = getTodosLocalStorage()

// add o novo todo no arr
    todos.push(todo)

// salvar todo na ls em string
localStorage.setItem("todos", JSON.stringify(todos))

} 

// removendo todos na ls
const removeTodoLocalStorage = (todoText) => {

    const todos = getTodosLocalStorage()

    const filteredTodos = todos.filter((todo) => todo.text !== todoText) 

    localStorage.setItem("todos", JSON.stringify(filteredTodos))
}

// update do status (done) no ls
const updateTodoStatusLocalStorage = (todoText) => {

    const todos = getTodosLocalStorage()

    todos.map((todo) => 
    todo.text === todoText ? (todo.done = !todo.done) : null) 

    localStorage.setItem("todos", JSON.stringify(todos))
}

// update dados de edição do todo
const updateTodoLocalStorage = (todoOldText, todoNewText) => {

    const todos = getTodosLocalStorage()

    todos.map((todo) => todo.text === todoOldText ? (todo.text = todoNewText) : null) 

    localStorage.setItem("todos", JSON.stringify(todos))
}


loadTodos()



