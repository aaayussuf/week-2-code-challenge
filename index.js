
const shoppingList = [];
const shoppingListElement = document.getElementById('shoppingList');
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');

// Function to render the shopping list
function renderList() {
    shoppingListElement.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.text;
        listItem.className = item.purchased ? 'purchased' : '';
        listItem.addEventListener('click', () => togglePurchased(index));

        // Add edit functionality
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            editItem(index);
        });

        listItem.appendChild(editButton);
        shoppingListElement.appendChild(listItem);
    });
}

// Function to add an item to the list
function addItem() {
    const itemText = itemInput.value.trim();
    if (itemText !== '') {
        shoppingList.push({ text: itemText, purchased: false });
        itemInput.value = '';
        saveToLocalStorage();
        renderList();
    }
}

// Function to toggle the purchased state of an item
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    saveToLocalStorage();
    renderList();
}

// Function to clear the list
function clearList() {
    shoppingList.length = 0;
    saveToLocalStorage();
    renderList();
}

// Function to edit an item
function editItem(index) {
    const newText = prompt('Edit item:', shoppingList[index].text);
    if (newText !== null && newText.trim() !== '') {
        shoppingList[index].text = newText.trim();
        saveToLocalStorage();
        renderList();
    }
}

// Save list to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Load list from local storage
function loadFromLocalStorage() {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
        shoppingList.push(...JSON.parse(savedList));
    }
}

// Event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);

// Initialize the app
loadFromLocalStorage();
renderList();
