setURL('http://bilgekaan-yilmaz.developerakademie.com/smallest_backend_ever-master');

let currentTask;

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('From backend', allTasks);
    updateHTML();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function highlight(id){
    document.getElementById(id).classList.add('highlight-area');
}

function removeHighlight(id){
    document.getElementById(id).classList.remove('highlight-area');

}

function drag(id) {
    currentTask = allTasks.find(e => e.id == id);
    console.log('currentTask:', currentTask);
}

function moveTo(statusData) {
    currentTask['status'] = statusData;
    updateHTML();
    saveBackend();
}

async function saveBackend() {
    //allTasks.splice(currentTask['id']);
    //allTasks.push(currentTask['status']);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    console.log('save backend:', allTasks);
}

function updateHTML() {
    loadToDo();
    loadInProgress();
    loadTesting();
    loadDone();
}

function loadToDo() {
    let toDo = allTasks.filter(t => t['status'] == 'toDo');

    document.getElementById('board-task-to-do').innerHTML = '';

    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i]
        document.getElementById('board-task-to-do').innerHTML += `
        <div id="task${element['id']}" class="task ${element['urgency']}" draggable="true" ondragstart="drag(${element['id']})">
        <span>${element['dueDate']}</span>
        <span>${element['title']}</span>
        <span>${element['name']}</span>
        </div>
    `;
    }

}

function loadInProgress() {
    let inProgress = allTasks.filter(t => t['status'] == 'progress');

    document.getElementById('board-task-progress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('board-task-progress').innerHTML += `
        <div id="task${element['id']}" class="task ${element['urgency']}" draggable="true" ondragstart="drag(${element['id']})">
        <span>${element['dueDate']}</span>
        <span>${element['title']}</span>
        <span>${element['name']}</span>
        </div>
    `;
    }
}

function loadTesting() {
    let testing = allTasks.filter(t => t['status'] == 'testing');

    document.getElementById('board-task-testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('board-task-testing').innerHTML += `
        <div id="task${element['id']}" class="task ${element['urgency']}" draggable="true" ondragstart="drag(${element['id']})">
        <span>${element['dueDate']}</span>
        <span>${element['title']}</span>
        <span>${element['name']}</span>
        </div>
    `;
    }
}

function loadDone() {
    let done = allTasks.filter(t => t['status'] == 'done');

    document.getElementById('board-task-done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('board-task-done').innerHTML += `
        <div id="task${element['id']}" class="task ${element['urgency']}" draggable="true" ondragstart="drag(${element['id']})">
        <span>${element['dueDate']}</span>
        <span>${element['title']}</span>
        <span>${element['name']}</span>
        </div>
    `;
    }
}