const categoriesURL = "/json/categories.json"

const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const categoriesDIV = document.querySelector("#categoriesDivs")

let categories =[]

// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {

        // Check if categories are in Local Storage
        if (localStorage.getItem('categories')) {
            categories = JSON.parse(localStorage.getItem('categories'))
        } else {
            // Fetch the data since it's not in Local Storage
            const response = await fetch(categoriesURL)
            categories = await response.json()
            
            // Store the fetched data in Local Storage
            localStorage.categories = JSON.stringify(categories)
        }
        
        console.log(categories)
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