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
        if (localStorage.getItem('categories')) {
            categories = JSON.parse(localStorage.getItem('categories'))
        } else {
            const response = await fetch(categoriesURL)
            categories = await response.json()
            localStorage.categories = JSON.stringify(categories)
        }

        //loading items into local storage
        if (!localStorage.getItem('items')){
            const response = await fetch(itemsURL)
            items = await response.json()
            localStorage.items = JSON.stringify(items)
        }


        //loading customers into local storage
        if(!localStorage.getItem('customers')){
            const response = await fetch(customersURL);
            customers = await response.json();
            localStorage.setItem('customers', JSON.stringify(customers));
        }

        // console.log(categories)
        // load items from either Local Storage or fetched data
        showCategories(categories)
    } catch (error) {
        console.error("Failed to load categories", error)
    }
})

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