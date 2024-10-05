const input = document.getElementById('input');
const button = document.getElementById('button');
const list = document.getElementById('list');
let tasks =getTasksFromLocalStorage()
tasks.forEach(task => {
    addTaskToPage(task.text, task.completed);
})
// Function to add a new task
button.addEventListener('click', function() {
    const taskText = input.value;
    if (taskText !== "") {
        addTaskToPage(taskText);
        saveToLocalstorage(taskText, false);
        input.value = '';
    }
});
// Add task to page
function addTaskToPage(taskText, isCompleted = false) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    if (isCompleted) {
        li.style.textDecoration = "line-through";
    }
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            li.style.textDecoration = "line-through"; 
            updateTaskStatus(taskText, true); 
        } else {
            li.style.textDecoration = "none"; 
            updateTaskStatus(taskText, false); 
        }
    });
    const textNode = document.createTextNode(taskText);
    li.appendChild(checkbox);
    li.appendChild(textNode);
    list.appendChild(li);
}
// Save LocalStorage
function saveToLocalstorage(taskText, isCompleted) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

// Get tasks from LocalStorage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('todo-tasks');
    if(tasks){
        return JSON.parse(tasks)
    }else{
        return []
    } 
}

// Update task status in LocalStorage
function updateTaskStatus(taskText, isCompleted) {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = isCompleted; 
        }
    });
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}
