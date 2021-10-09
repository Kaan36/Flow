setURL('http://bilgekaan-yilmaz.developerakademie.com/smallest_backend_ever-master');

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    console.log('From backend', allTasks);
    loadValues();
}

function loadValues() {

    let taskRow = document.getElementById('taskRow');
    taskRow.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        taskRow.innerHTML += `
        <tr class="${allTasks[i]['urgency']}">
            <td class="td-assigned">
                <img src="./images/profile.jpg">
                <div id="name-assigned" class="name-assigned">
                    <span>${allTasks[i]['name']}</span>
                    <span>${allTasks[i]['email']}</span>
                </div>
            </td>
            <td class="td-category">
                <span>${allTasks[i]['category']}<span>
            </td>
            <td class="td-details">
                <span>${allTasks[i]['description']}</span>
            </td>
        </tr>
    `;
    }
}

