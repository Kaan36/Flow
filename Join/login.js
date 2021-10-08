setURL('http://bilgekaan-yilmaz.developerakademie.com/smallest_backend_ever-master');
let currentUser = [];
const loginForm = document.getElementById('login');
const createAccountForm = document.getElementById('createAccount');

let allUsers = [{
    'email': "bilgekaan.yilmaz36@gmail.com",
    'name': 'Bilgekaan Yilmaz',
    'password': 'kaan',
    'profile': './images/profilepic.png',
},
{
    'email': "Manfred@web.de",
    'name': 'Manfred Münster',
    'password': 'mani',
    'profile': './images/profile.jpg',
}];


async function init() {
    await downloadFromServer();
    allUsers = JSON.parse(backend.getItem('allUsers')) || [];
    currentUser = JSON.parse(backend.getItem('currentUser')) || [];
    checkInput();
    initGuest();
}

async function saveBackend() {
    await backend.setItem('allUsers', JSON.stringify(allUsers));
    await backend.setItem('currentUser', JSON.stringify(currentUser));
    console.log('currentUser:', currentUser);
}

/**
 * 
 * 
 */
function logInUser() {
    let email = document.getElementById('input-email-login').value; //string
    let password = document.getElementById('input-password-login').value; //string
    checkLogin(email, password);
};

/**
 * Check if Login is valid and Login if
 */

async function checkLogin(email, password) {
    loggedInUser = allUsers.find(user => user.email === email);

    if (loggedInUser == undefined) {
        setErrorMessage('input-email-login', 'output-error-email', 'error', 'No User with such Email!');
    } else if (loggedInUser.password != password) {
        setErrorMessage('input-password-login', 'output-error-password', 'error', 'Password is wrong try again!')
    } else {
        if (loggedInUser.password === password) {
            console.log('User logged in');
            addCurrentUser(loggedInUser);
            await saveBackend();
            console.log('save loggedInUser', loggedInUser);
            window.location.href = "./addTask.html";
        }
    }

}

function createNewUser() {
    let email = document.getElementById('input-email-create').value;
    let name = document.getElementById('input-userName-create').value;
    let password = document.getElementById('input-password-create').value;
    saveNewUser(email, name, password);
}

function saveNewUser(email, name, password) {
    let newUser = {
        'email': email,
        'name': name,
        'password': password,
        'profile': './images/profile.jpg',
    }
    allUsers.push(newUser);
    addCurrentUser(newUser);
    window.location.href = "./addTask.html";
}

async function addCurrentUser(user) {
    currentUser = [];
    currentUser.push(user);
    await saveBackend();
}

function initGuest() {
    document.getElementById('linkGuest').addEventListener("click", () => {
        guestLogIn();
    });
}

async function guestLogIn() {
    let guest = {
        'email': '',
        'name': 'Guest',
        'password': '',
        'profile': './images/profile.jpg',
    }
    currentUser = [];
    currentUser.push(guest);
    await saveBackend();
    window.location.href = "./addTask.html";
}

function setErrorMessage(input, id, type, message) {
    const messageError = document.getElementById(`${id}`);
    messageError.innerHTML = message;
    const inputError = document.getElementById(`${input}`);
    inputError.classList.add(`${type}`);
}

function clearErrorMessage(inputElement) {
    inputElement.classList.remove('error');
    inputElement.innerHTML = '';
    document.getElementById('output-error-sign-password').innerHTML = '';
    document.getElementById('output-error-email').innerHTML = '';
    document.getElementById('output-error-password').innerHTML = '';
}

function setPasswordError(inputElement, errorText) {
    document.getElementById('output-error-sign-password').innerHTML = errorText;
    inputElement.classList.add('error');
}

document.getElementById('linkCreateAccount').addEventListener("click", () => {
    loginForm.classList.add('form-hidden');
    createAccountForm.classList.remove('form-hidden');
});

document.getElementById('linkLogin').addEventListener("click", () => {
    loginForm.classList.remove('form-hidden');
    createAccountForm.classList.add('form-hidden');
});

function checkInput() {
    document.querySelectorAll('.input-fields').forEach(inputElement => {
        inputElement.addEventListener('blur', () => {
            if (inputElement.id == 'input-password-check' && inputElement.value.length < 5) {
                setPasswordError(inputElement, 'Password must be at least 5 characters in length');
            }
        });

        inputElement.addEventListener('input', () => {
            clearErrorMessage(inputElement);
        })
    })
}
