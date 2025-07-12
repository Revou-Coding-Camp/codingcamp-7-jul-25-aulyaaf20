console.log('JavaScript is running!');

// Global List to store todos
let Todo=[];

// Function to add a new todo 
function addTodo(){
  const todoInput = document.getElementById('todo-input');
  const selectdateInput = document.getElementById('select-date-input');

//   Validate input
    if (todoInput.value ===''|| selectdateInput.value ===''){
        alert('Please fill in both todo and select date.');
        return;
    } else {
        // create a new todo object
        const newTodo = {
            id: Date.now(), // Unique ID based on current timestamp
            todo: todoInput.value,
            selectdate: selectdateInput.value,
            completed: false
        };
        // Add the new todo to the todo array
        Todo.push(newTodo);

        // Clear the input fields
        todoInput.value = '';
        selectdateInput.value = '';

        // Log the new todo (for demonstration purposes)
        console.log('New Todo Added:', newTodo);
        displayTodos();
    }
  console.log('Adding Todo:', todoInput.value, 'select-date:', selectdateInput.value);
}

function displayTodos(){
    const todolist = document.getElementById('todolist');
    todolist.innerHTML = ''; // Clear the current list
    Todo.forEach(element =>{
        const todoItem = `
        <div class="flex justify-between items-center p-[8px] border-b">
            <div class="flex flex-col">
                <span class="text-lg">${element.todo}</span>
                <span class="text-sm text-gray-500">${element.selectdate}</span>
            </div>
            <div class="flex Items-center gap-[8px]">
                <button class="bg-violet-600 text-violet-100 p-[10px] rounded w-[text-3xl]" onclick="toggleComplete('${element.id}')">Completed</button>
            </div>
            <button class="bg-violet-600 text-violet-100 p-[10px] rounded w-[text-3xl]" onclick="deleteTodo('${element.id}')">Delete</button>
        </div>
        `;
        todolist.innerHTML += todoItem;
    });

}

// Function to delete a todo
function deleteTodo(id) {
    // Convert the incoming string ID to a number
    const numericId = parseInt(id, 10);

    // Find the index of the todo to delete
    const todoIndex = Todo.findIndex(todo => todo.id === numericId);
    console.log('Deleting Todo with ID:', numericId);
    console.log('Todo Index:', todoIndex);
    // If the todo is found, remove it
    if (todoIndex !== -1) {
        // Remove the todo from the array
        Todo.splice(todoIndex, 1);
        console.log('Todo deleted:', numericId);
        displayTodos();
    } else {
        console.log('Todo not found:', numericId);
    }
}

function toggleComplete(id) {
    // Ubah ID string yang diterima menjadi angka
    const numericId = parseInt(id, 10);

    // Cari todo berdasarkan ID numerik
    const todo = Todo.find(todo => todo.id === numericId);

    if (todo) {
        // Ubah status 'completed'
        todo.completed = !todo.completed;
        console.log('Todo completed status toggled:', todo);
        displayTodos();
    } else {
        console.log('Todo not found:', numericId);
    }
}

// Function to deleteAll a new todo
function deleteAllTodo(){
    // Clear the Todo array
    Todo = [];
    console.log('All Todos deleted');
    displayTodos();
}

// Function to filter a new todo
function filterTodo(){
    const showCompleted = document.getElementById('show-completed').checked;
    const showAll = document.getElementById('show-all').checked;

    showCompleted.addEventListener('click', () => {
        const completedTodos = Todo.filter(todo => todo.completed);
        displayFilteredTodos(completedTodos);
    });

    showAll.addEventListener('click', () => {
        displayTodos();
    });

}