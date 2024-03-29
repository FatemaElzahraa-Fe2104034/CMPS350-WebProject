const categoriesURL = "/json/categories.json"
const itemsURL = "/json/items.json"
const usersURL = "/json/users.json"

const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const categoriesDIV = document.querySelector("#categoriesDivs")

const categoryLINK = document.querySelector("#categories")
const loginLINK = document.querySelector("#login")
const categoryDD = document.querySelector("#dropdown-content")
const profileB = document.querySelector('#profile');

const searchText = document.querySelector('#searchBar');

categoryLINK.addEventListener("click", showCategoriesDROPDOWN)
profileB.addEventListener('click', profileCheck)

// const profileB = document.querySelector('#profile');
// searchBar.addEventListener("keydown", function(event) {
//     if (event.key === "Enter" || event.keyCode === 13) {
//         // Execute your function here
//         // For example:
//         event.preventDefault()
//         searchFunction();
//     }
// });


let categories =[]
let users =[]


// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Loading categories into local storage
        loadCategories()

        //loading items into local storage
        loadItems()

        //loading users into local storage
        loadUsers()
        
        showCategories(categories)
        updateLoginLink()

    } catch (error) {
        console.error("Failed to load categories", error)
    }
})

// =======================================================Loading Functions================================================

// Function to load categories
async function loadCategories() {
    if (localStorage.getItem('categories')) {
        categories = JSON.parse(localStorage.getItem('categories'));
    } else {
        const response = await fetch(categoriesURL);
        categories = await response.json();
        localStorage.setItem('categories', JSON.stringify(categories));
    }
    return categories;
}

// Function to load items
async function loadItems() {
    let items;
    if (!localStorage.getItem('items')) {
        const response = await fetch(itemsURL);
        items = await response.json();
        localStorage.setItem('items', JSON.stringify(items));
    }
}

// Function to load users
async function loadUsers() {
    if (!localStorage.getItem('users')) {
        const response = await fetch(usersURL);
        users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// ============================================================================================================================


function showCategories(categories){
    const mappedCategories = categories.map(
        category => 
        `
        <div onclick="navigateToFilteredItems(${category.id})">
            <img src="${category.image}" alt="${category.name}">
            <p>${category.name}</p>
        </div>
        `
    ).join('\n')
    
    categoriesDIV.innerHTML = mappedCategories
}

function navigateToFilteredItems(categoryId){
    window.location.href = `/html/all_Items.html?id=${categoryId}`
}

async function updateLoginLink() {
    try {
        // Fetch the users
        users = JSON.parse(localStorage.getItem('users'));

        const loggedInUser = users.findIndex(u => u.isLoggedIn === true)

        if(loggedInUser!=-1){
            loginLINK.innerHTML = `<a href="#" id="loggedIn" class="login">Logout</a>`
            
            document.querySelector("#loggedIn").addEventListener('click', (e) => {
                e.preventDefault()
                handleLogout(loggedInUser)
            })
        }
        else{
            loginLINK.innerHTML = `<a href="#" id="loggedOut" class="login">Login</a>`
            
            document.querySelector("#loggedOut").addEventListener('click', (e) => {
                e.preventDefault()
                handleLogin()
            })
        }
    
    } catch (error) {
        console.error("Failed to update login link:", error);
    }
}


function handleLogout(loggedInUser) {
    if (loggedInUser==-1) {
        alert(`The user does not exist.`)
        return;
    } else {
        users[loggedInUser].isLoggedIn = false
        localStorage.setItem('users', JSON.stringify(users))

        alert("You have been successfully logged out.")
        updateLoginLink()
    }
}

function handleLogin() {
    window.location.href = "/html/login.html"
}

function showCategoriesDROPDOWN(){  
    const mappedCategories = categories.map(c => `
        <a onclick="navigateToFilteredItems(${c.id})">${c.name}</a>
    `).join('\n')
    categoryDD.innerHTML = mappedCategories
    categoryDD.classList.toggle('show-dropdown')
}

function navigateToFilteredItems(categoryId){
    window.location.href = `/html/all_Items.html?id=${categoryId}`
}

function profileCheck() {
    // Retrieve customer data from local storage and parse it
    const users = JSON.parse(localStorage.getItem('users'));

    // Find index of logged-in user in the usersCustomer array
    const loggedInUser = users.findIndex(u => u.isLoggedIn === true);

    // Check if a logged-in user is found
    if(loggedInUser!=-1){
        const user = users[loggedInUser]
        if(user.type=="customer"){
            //Handle customer here
            window.location.href = "/html/history.html"
        }
        else if(user.type=="seller"){
            //Handle seller here
            window.location.href = "/html/historySeller.html"
        }
        else{
            alert("An error occured")
        }
    }
    else{
        alert("Login before proceeding.")
        window.location.href ="/html/login.html"
    }
}

// function searchFunction() {
//     const parameterValue = searchText.value;
//     window.location.href = `/html/all_Items.html?parameter=${parameterValue}`;
// }