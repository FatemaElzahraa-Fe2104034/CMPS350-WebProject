const categoriesURL = "/json/categories.json"
const itemsURL = "/json/items.json"
const usersURL = "/json/users.json"


const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const categoriesDIV = document.querySelector("#categoriesDivs")
// const profileB = document.querySelector('#profile');

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



// function profileCheck(){
//     const loggedInUser = users.findIndex(u => u.isLoggedIn === true)
//     console.log(loggedInUser);
//     if(loggedInUser != -1){
//         const user = users[loggedInUser]
//         if(user.type=="customer"){
//             //Handle customer here
//             window.location.href = "/html/history.html"
//         }
//         else if(user.type=="seller"){
//             //Handle seller here
//             window.location.href = "/html/historySeller.html"
//         }
//         else{
//             alert("An error occured")
//         }
//     }
//     else{
//         alert("Login before proceeding.")
//         window.location.href ="/html/login.html"
//     }
// }
