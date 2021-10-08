let allTasks = [];
setURL('http://bilgekaan-yilmaz.developerakademie.com/smallest_backend_ever-master');
let id;
let names;
let email;
let title;
let category;
let description;
let dueDate;
let urgency;
let status;
let statusDiv;
let task;
let currentUser;

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
    allUsers = JSON.parse(backend.getItem('allUsers')) || [];
    console.log('From backend', allTasks);
    document.getElementById('profil-picture').src = currentUser[0]['profile'];
}

function today() {
    let today = new Date().toISOString().substr(0, 10);
    console.log(today);
    document.querySelector('#date').value = today;
}

async function addTask() {
    taskValues();
    taskStructure();
    allTasks.push(task);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    resetTaskMask();
}

function taskValues() {
    id = allTasks.length;
    names = querySelector('#name').innerHTML;
    email = document.getElementById('email').innerHTML;
    title = document.getElementById('input-title').value;
    category = document.getElementById('category').value;
    description = document.getElementById('textarea-description').value;
    dueDate = document.getElementById('date').value;
    urgency = document.getElementById('urgency').value;
    statusDiv = 'toDo';
}

function taskStructure() {
    task = {
        'id': id,
        'name': names,
        'email': email,
        'title': title,
        'category': category,
        'description': description,
        'dueDate': dueDate,
        'urgency': urgency,
        'status': statusDiv,
    }
}

function resetTaskMask() {

    document.getElementById('input-title').value = '';
    document.getElementById('category').value = 'Management';
    document.getElementById('textarea-description').value = '';
    document.getElementById('urgency').value = 'low';
    today();
}

function deleteTasks() {
    backend.deleteItem('allTasks');
}
