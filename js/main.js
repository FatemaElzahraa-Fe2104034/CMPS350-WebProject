const categoriesURL = "/json/categories.json"
const itemsURL = "../json/items.json"
const customersURL = "../json/customers.json"


const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const categoriesDIV = document.querySelector("#categoriesDivs")

let categories =[]

// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {

        // Loading categories into local storage
        loadCategories()

        //loading items into local storage
        loadItems()

        //loading customers into local storage
        loadCustomers()

        showCategories(categories)
    } catch (error) {
        console.error("Failed to load categories", error)
    }
})

// =======================================================Loading Functions================================================

// Function to load categories
async function loadCategories() {
    let categories;
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

// Function to load customers
async function loadCustomers() {
    let customers;
    if (!localStorage.getItem('customers')) {
        const response = await fetch(customersURL);
        customers = await response.json();
        localStorage.setItem('customers', JSON.stringify(customers));
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