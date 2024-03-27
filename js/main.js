const categoriesURL = "/json/categories.json"
const itemsURL = "/json/items.json"
const usersURL = "/json/users.json"
// const artistsURL = "/json/seller.json"


const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const categoriesDIV = document.querySelector("#categoriesDivs")
const profileB = document.querySelector('#profile');

let categories =[]

profileB.addEventListener('click', profileCheck)
// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {

        // Loading categories into local storage
        loadCategories()

        //loading items into local storage
        loadItems()

        //loading users into local storage
        loadUsers()


        // //loading customers into local storage
        // loadCustomers()

        // //loading artists into local storage
        // loadArtists()
        
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
    let users;
    if (!localStorage.getItem('users')) {
        const response = await fetch(usersURL);
        users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// // Function to load customers
// async function loadCustomers() {
//     let customers;
//     if (!localStorage.getItem('customers')) {
//         const response = await fetch(customersURL);
//         customers = await response.json();
//         localStorage.setItem('customers', JSON.stringify(customers));
//     }
// }

// //Function to load artists
// async function loadArtists() {
//     let artists;
//     if (!localStorage.getItem('artists')) {
//         const response = await fetch(artistsURL);
//         artists = await response.json();
//         localStorage.setItem('artists', JSON.stringify(artists));
//     }
// }

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



function profileCheck(){
    const usersCustomer = JSON.parse(localStorage.getItem('customers'))
    const nusersSeller = JSON.parse(localStorage.getItem('seller'))
    const loggedInUser = usersCustomer.findIndex(u => u.isLoggedIn === true)
    if (loggedInUser!=-1) {
        window.location.href = "../html/history.html"
    }
    else {
        window.location.href = "../html/historySeller.html"
    }
}