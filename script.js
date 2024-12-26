let isDarkMode = false;

function toggleTheme() {
    const themeToggleButton = document.getElementById('theme-toggle');
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggleButton.textContent = '☀';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleButton.textContent = '🌙';
    }
}

function updateClock() {
    const clockElement = document.getElementById('live-clock');
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeString = now.toLocaleTimeString('en-US', options);
    clockElement.textContent = `Current Time (IST): ${timeString}`;
}
setInterval(updateClock, 1000);
updateClock();

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    if (emptyState) {
        emptyState.remove();
    }

    const task = document.createElement('div');
    task.className = 'task fade-in';

    task.innerHTML = `
        <span>${taskInput.value}</span>
        <div class="task-actions">
            <button class="complete" onclick="completeTask(this)">✔</button>
            <button class="edit" onclick="editTask(this)">✏</button>
            <button class="delete" onclick="deleteTask(this)">🗑</button>
            <button class="move-up" onclick="moveTaskUp(this)">⬆</button>
            <button class="move-down" onclick="moveTaskDown(this)">⬇</button>
        </div>
    `;

    taskList.appendChild(task);
    taskInput.value = '';
}

function completeTask(button) {
    const task = button.parentElement.parentElement;
    task.classList.add('completed');
    button.disabled = true;
    task.querySelector('.edit').disabled = true;
}

function editTask(button) {
    const task = button.parentElement.parentElement;
    const taskText = task.querySelector('span');
    const newTaskText = prompt('Edit your task:', taskText.textContent);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskText.textContent = newTaskText.trim();
    } else {
        alert('Task cannot be empty.');
    }
}

function deleteTask(button) {
    const task = button.parentElement.parentElement;
    const taskList = document.getElementById('task-list');
    task.remove();

    if (taskList.children.length === 0) {
        const emptyState = document.createElement('p');
        emptyState.id = 'empty-state';
        emptyState.className = 'empty-state';
        emptyState.textContent = 'Your task list is empty. Add a task to get started!';
        taskList.appendChild(emptyState);
    }
}

function moveTaskUp(button) {
    const task = button.parentElement.parentElement;
    const previousTask = task.previousElementSibling;

    if (previousTask && previousTask.className.includes('task')) {
        task.parentElement.insertBefore(task, previousTask);
    }
}

function moveTaskDown(button) {
    const task = button.parentElement.parentElement;
    const nextTask = task.nextElementSibling;

    if (nextTask && nextTask.className.includes('task')) {
        task.parentElement.insertBefore(nextTask, task);
    }
}