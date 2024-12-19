// alert("test")
const todoForm=document.querySelector('form');
const todoInput=document.getElementById("todo-input");
const todoListUL=document.getElementById("todo-list");

let allTodos=getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();  //stops auto update of the page when the page is submitted
    addTodo();
})

function addTodo(){
    const todoText= todoInput.value.trim();
    if(todoText.length>0){
        const todoObject={
            text:todoText,
            completed: false
        }
        allTodos.push(todoObject);
        //change the html code when this is targetted
        updateTodoList(todoText); // now we are using the array to refill the todo list
        saveTodos();
        todoInput.value="";
    }
    // alert(todoText);
}

function updateTodoList(){
    todoListUL.innerHTML=""; //emptied this
    allTodos.forEach((todo,todoIndex)=>{
        todoItem=createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo,todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI=document.createElement("li");
    const todoText=todo.text;
    todoLI.className="todo";
    todoLI.innerHTML=`<input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    `
    // todoLI.innerText=todo;

    //DELETE: 
    const deleteButton= todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
        saveTodos();
        updateTodoList();
    })
    const checkbox=todoLI.querySelector('input');
    checkbox.addEventListener("change",()=>{
        allTodos[todoIndex].completed=checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_,i)=>i!==todoIndex); //generated new array excluding the ones whch we don't want
}

// saving the data locally in the browser sesson using localStorage property of Window
// we want to save todos everytime the list gets updated
function saveTodos(){
    //we can only store string in the local storage
    const todoJson=JSON.stringify(allTodos);
    localStorage.setItem("todos",todoJson) //stores things as key value in the local storage inspect, go to application
    //this will save. 
}
 
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

