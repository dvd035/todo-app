const todo = getSavedTodo()

const filters= {
    searchText : '',
    hideCompleted : false
}

renderNotes(todo,filters)

document.querySelector('#input1').addEventListener('input',function(e){
    filters.searchText= e.target.value
    renderNotes(todo,filters)
})

document.querySelector('#new-task').addEventListener('submit',function(e){
    
    e.preventDefault()

    todo.push({
        id : uuidv4(),
        text : e.target.elements.title.value,
        completed: false
    })
    
    saveTodo(todo)

    renderNotes(todo,filters)

    e.target.elements.title.value=''
})

document.querySelector('#check-box').addEventListener('change',function(e){
    filters.hideCompleted = e.target.checked
    renderNotes(todo,filters)
})