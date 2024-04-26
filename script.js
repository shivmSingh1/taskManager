
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';

const body = document.body;
const container = document.querySelector('.container');
const darkModeBtn = document.getElementById('darkModeBtn');

function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled;
    localStorage.setItem('darkModeEnabled', darkModeEnabled);

    if (darkModeEnabled) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

darkModeBtn.addEventListener('click', toggleDarkMode);



if (darkModeEnabled) {
    body.classList.add('dark-mode');
}


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false
        };

        tasks.push(newTask);
        saveTasksToLocalStorage();
        renderTasks();
        taskInput.value = '';
    }
}


function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasksToLocalStorage();
            renderTasks();
        });

        const label = document.createElement('label');
        label.textContent = task.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}


function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage();
    renderTasks();
}


function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


document.getElementById('addTaskBtn').addEventListener('click', addTask);
renderTasks();
