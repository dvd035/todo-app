//prevent local leakage
'user strict'


// fetching existing todo from local storage
const getSavedTodo = () =>{
    const todoJSON = localStorage.getItem('todo')
    
    //to handle any error in data received from local storage
    try{
        //if todoJSON !== null
        return todoJSON ? JSON.parse(todoJSON) : []
    }catch(e){
        return []
    }
}


// save todo to local storage
const saveTodo = (todo) =>{
    localStorage.setItem('todo', JSON.stringify(todo))
}

//remove a todo from list
const removeTodo = (id) =>{
    const todoIndex = todo.findIndex((todo) => todo.id === id)

    if(todoIndex > -1)
    todo.splice(todoIndex, 1)
    saveTodo(todo)
    renderNotes(todo,filters)
}

//toggle a completed value for given todo
const toggleTodo = function(id){
    const todoSts = todo.find((todos) => todos.id === id)

    // if(todoSts !== undefined){
    if(todoSts){
        todoSts.completed = !todoSts.completed
    }

    saveTodo(todo)
    renderNotes(todo, filters)
}

// render application todo based on filters
const renderNotes= (todo,filters) =>{

    let filteredTodo= todo.filter((obj) =>{
        return obj.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodo= filteredTodo.filter((obj) =>{
        return !filters.hideCompleted || !obj.completed
    })


    const incompleteTask = filteredTodo.filter((todo) => !todo.completed) 

    document.querySelector('#notes').innerHTML=''

    document.querySelector('#notes').appendChild(generateSummaryDOM(incompleteTask))

    filteredTodo.forEach(
        (todoItem) =>{
        document.querySelector('#notes').appendChild(generateTodoDOM(todoItem))
    })
    saveTodo(filteredTodo)
}

// get DOM element for individual todo
const generateTodoDOM = (todo) =>{
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', () =>{
        toggleTodo(todo.id)
    })
 
    //setup todo Text
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    //setup remove button
    removeButton.textContent = 'x'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click',() =>{
        removeTodo(todo.id)
    })

    return todoEl

    // const val = document.createElement('p')
    // val.textContent=todo.text
    // return val
}

// get the DOM element for list summary
const generateSummaryDOM = (incompleteTask) =>{
    const val2 = document.createElement('h2')
    val2.textContent=`${incompleteTask.length} task are incomplete`
    return val2
}