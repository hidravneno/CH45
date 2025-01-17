function saveTask() {
    console.log('Saving task');

    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const startDate = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = parseFloat($("#numBudget").val());

    if (!title || !description || !startDate || !status) {
        alert("Please complete all fields correctly.");
        return;
    }

    if (isNaN(budget) || budget <= 0 || budget > 1_000_000_000) {
        alert(
            "The budget must be a positive number and cannot exceed 1,000,000,000."
        );
        return;
    }

    const task = {
        title,
        description,
        color,
        startDate,
        status,
        budget,
    };

    console.log("Task object:", task);

    saveTaskToLocalStorage(task);
    displayTask(task);

    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#selColor").val("#000000");
    $("#selDate").val("");
    $("#selStatus").val("New");
    $("#numBudget").val("");
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(displayTask);
}

function displayTask(task) {
    const taskHTML = `
        <div class="card m-3 task-card" style="border-left: 10px solid ${task.color};">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p><strong>Start Date:</strong> ${task.startDate}</p>
                <p><strong>Status:</strong> ${task.status}</p>
                <p><strong>Budget:</strong> $${task.budget.toLocaleString()}</p>
                <button class="btn btn-danger btn-sm btn-delete" data-title="${task.title}">Delete</button>
            </div>
        </div>
    `;

    $("#list").append(taskHTML);
}

function deleteTask(event) {
    const titleToDelete = $(event.target).data("title");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.title !== titleToDelete);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    $(event.target).closest(".task-card").remove();
}

function init() {
    console.log('Init app');

    loadTasksFromLocalStorage();

    $("#btnSave").click(saveTask);
    $("#list").on("click", ".btn-delete", deleteTask);
}

window.onload = init;
