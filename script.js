let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value.trim() === "") return alert("Enter a task!");

    tasks.push({ text: input.value, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
}

function editTask(i) {
    let newText = prompt("Edit task:", tasks[i].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[i].text = newText;
        saveTasks();
        renderTasks();
    }
}

function setFilter(f) {
    filter = f;

    document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`btn${f.charAt(0).toUpperCase() + f.slice(1)}`).classList.add("active");

    renderTasks();
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks
        .filter(task => filter === "all" 
            || (filter === "completed" && task.completed)
            || (filter === "pending" && !task.completed))
        .forEach((task, i) => {
            list.innerHTML += `
                <li class="${task.completed ? "completed" : ""}">
                    <span onclick="toggleTask(${i})">${task.text}</span>
                    <div class="actions">
                        <span onclick="editTask(${i})">✏️</span>
                        <span onclick="deleteTask(${i})">🗑️</span>
                    </div>
                </li>
            `;
        });
}

function toggleMode() {
    document.body.classList.toggle("dark");
}

renderTasks();
