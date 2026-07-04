// Nama User
const userName = prompt("Siapa namamu?") || "Friend";

// Fitur 1: Time & Greeting
function updateDateTime() {
    const now = new Date();
    document.getElementById('time-display').textContent = now.toLocaleTimeString();
    document.getElementById('date-display').textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const h = now.getHours();
    let greeting = h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening';
    document.getElementById('greeting-message').textContent = `${greeting}, ${userName}!`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Fitur 2: Timer
let timeLeft = 25 * 60, timerInterval;
const timerDisplay = document.getElementById('timer-display');
const timerInput = document.getElementById('timer-input');

document.getElementById('start-btn').onclick = () => {
    if(!timerInterval) timerInterval = setInterval(() => {
        if(timeLeft > 0) { timeLeft--; updateTimer(); }
        else { clearInterval(timerInterval); timerInterval = null; alert("Selesai!"); }
    }, 1000);
};
document.getElementById('stop-btn').onclick = () => { clearInterval(timerInterval); timerInterval = null; };
document.getElementById('reset-btn').onclick = () => { clearInterval(timerInterval); timerInterval = null; timeLeft = (parseInt(timerInput.value) || 25) * 60; updateTimer(); };
function updateTimer() { timerDisplay.textContent = `${Math.floor(timeLeft/60)}:${String(timeLeft%60).padStart(2,'0')}`; }

// Fitur 3: To-Do
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach((t, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" ${t.completed?'checked':''}> <span>${t.text}</span> <button onclick="deleteTask(${i})">Delete</button>`;
        list.appendChild(li);
    });
}
document.getElementById('add-task-btn').onclick = () => {
    const val = document.getElementById('task-input').value.trim();
    if(val && !tasks.some(t => t.text.toLowerCase() === val.toLowerCase())) {
        tasks.push({text: val, completed: false});
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    } else if (val) { alert("Tugas sudah ada!"); }
};
window.deleteTask = (i) => { tasks.splice(i, 1); localStorage.setItem('tasks', JSON.stringify(tasks)); renderTasks(); };
renderTasks();

// Fitur 4: Links
let links = JSON.parse(localStorage.getItem('quickLinks')) || [];
function renderLinks() {
    const cont = document.getElementById('links-container');
    cont.innerHTML = '';
    links.forEach((l, i) => {
        cont.innerHTML += `<div><a href="${l.url}" target="_blank">${l.name}</a> <button onclick="deleteLink(${i})">x</button></div>`;
    });
}
document.getElementById('add-link-btn').onclick = () => {
    links.push({name: document.getElementById('link-name').value, url: document.getElementById('link-url').value});
    localStorage.setItem('quickLinks', JSON.stringify(links));
    renderLinks();
};
window.deleteLink = (i) => { links.splice(i, 1); localStorage.setItem('quickLinks', JSON.stringify(links)); renderLinks(); };
renderLinks();