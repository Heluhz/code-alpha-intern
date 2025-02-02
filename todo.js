const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list');

// Function to add a new task
function addTask() {
    let task = inputBox.value.trim(); // Trim spaces to prevent empty entries

    if (task === '') {
        inputBox.placeholder = 'Please enter a task';
        inputBox.classList.add('error');
    
        return;
    }

    inputBox.placeholder = 'Add a new task'; // Reset placeholder
    inputBox.classList.remove('error');
    inputBox.style.border = "none"; // Reset border

    // Prevent duplicate tasks
    let existingTasks = document.querySelectorAll("#list li");
    for (let item of existingTasks) {
        if (item.innerText.replace("×", "").trim() === task) {
            inputBox.placeholder = "Task already exists!";
            inputBox.classList.add('error');
    
            
            inputBox.value = ''; // Clear input
            return;
        }
    }

    // Create new task item
    let li = document.createElement('li');
    li.innerText = task;
    listContainer.appendChild(li);

    // Create delete button (×)
    let span = document.createElement('span');
    span.innerHTML = "\u00d7"; // Unicode for '×'
    li.appendChild(span);

    inputBox.value = ''; // Clear input field
    saveData();
}

// Event listener for clicking tasks or delete buttons
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Allow adding tasks with Enter key
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Save tasks to localStorage
function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

// Load saved tasks on page refresh
function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTasks();
const toggleButton = document.getElementById('theme-toggle');
const container = document.querySelector('.container');

// Check if dark mode is saved in localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Apply dark mode if saved preference exists
if (isDarkMode) {
    container.classList.add('dark-mode');
    toggleButton.innerText = '🌞Light Mode';  // Change button text to 'Light Mode'
} else {
    toggleButton.innerText = '🌙 Dark Mode';  // Default button text for light mode
}

// Toggle dark mode on button click and save preference to localStorage
toggleButton.addEventListener('click', () => {
    container.classList.toggle('dark-mode');
    
    // Save the preference to localStorage
    if (container.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        toggleButton.innerText = '🌞Light Mode';  // Change button text to 'Light Mode'
    } else {
        localStorage.setItem('darkMode', 'disabled');
        toggleButton.innerText = '🌙 Dark Mode';  // Change button text to '🌙 Dark Mode'
    }
});
