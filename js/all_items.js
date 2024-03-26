const itemsURL = "../json/items.json";

let items = []

const itemsDIV = document.querySelector("#all-items") 
const searchBAR = document.querySelector("#search")
const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const ascDD = document.querySelector("#price-asc")
const descDD = document.querySelector("#price-desc")


searchBAR.addEventListener('input', handleSearchBar)
// ascDD.addEventListener('click', sortItemsByPrice('asc'))
// descDD.addEventListener('click', sortItemsByPrice('desc'))
ascDD.addEventListener('click', () => sortItemsByPrice('asc'));
descDD.addEventListener('click', () => sortItemsByPrice('desc'));


// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load header
        const headerResponse = await fetch("/html/common/header.html")
        const headerHTML = await headerResponse.text()
        header.innerHTML = headerHTML
        
        //  Load nav
        const navResponse = await fetch("/html/common/nav.html")
        const navHTML = await navResponse.text()
        nav.innerHTML = navHTML

        const urlParams = new URLSearchParams(window.location.search)
        const categoryId = urlParams.get('id')
    
        items = JSON.parse(localStorage.getItem('items'))

        if (categoryId) {
            handleFilter(categoryId)
        }
        else{
        showItems(items)
        }
    
    } catch (error) {
        console.error("Failed to load items:", error)
    }
});

function sortItemsByPrice(order) {
    console.log("called sort");
    let sortedItems 
    if (order == 'asc') {
        sortedItems = items.sort((a, b) => a.price - b.price);
    } else if (order == 'desc') {
        sortedItems = items.sort((a, b) => b.price - a.price);
    }
    showItems(sortedItems);
}

function showItems(itemsList) {
    const mappedItems = itemsList.map(
        item => `
        <div class="card" data-id="${item.ID}" onclick="navigateToItemDetail('${item.ID}')">
            <img src="${item.image_url}" alt="${item.title}'s thumbnail">
            <div class="item-properties">
                <p> <span class="titles">Title:</span> ${item.title}</p>
                <p> <span class="titles">Artist:</span> ${item.artist}</p>
                <p> <span class="titles">Category:</span> ${item.category}</p>
                <p> <span class="titles">Price:</span> ${item.price}</p>
                <p> <span class="titles">Availability:</span> ${item.available_quantity}</p>
            </div>
            <button class="purchaseBTN" id="purchasebutton" onclick="onPurchase('${item.ID}')">Purchase</button>
        </div>
        `
    ).join('\n');
    
    itemsDIV.innerHTML = mappedItems
}

// This function will be called when a card is clicked.
function navigateToItemDetail(itemId) {
    window.location.href = `/html/item_details.html?id=${itemId}`
}

function handleFilter(categoryId){
    let filter;
    if(categoryId == 1){
        filter="painting";
    } else if(categoryId == 2){
        filter="sculpture";
    } else if(categoryId == 3){
        filter="pottery";
    } else if(categoryId == 4){
        filter="drawing";
    } else if(categoryId == 5){
        filter="digital";
    }
    console.log(filter);
    const filteredItems = items.filter(item => {
        return item.category && typeof item.category === 'string' && item.category.toLowerCase().includes(filter);
    });
    console.log(`Filtered items: ${filteredItems.length}`);
    showItems(filteredItems);
}


function handleSearchBar() {
    const filter = searchBAR.value.toLowerCase().trim()
    if (filter) {
        const filteredItems = items.filter(item => {
            // Safe check for title
            const titleMatch = item.title && typeof item.title === 'string' ? item.title.toLowerCase().includes(filter) : false;
            const categoryMatch = item.category && typeof item.category === 'string' ? item.category.toLowerCase().includes(filter) : false;
            const artistMatch = item.artist && typeof item.artist === 'string' ? item.artist.toLowerCase().includes(filter) : false;

            return titleMatch || categoryMatch || artistMatch
        });

        showItems(filteredItems)
    } else {
        showItems(items) // Show all books when there's no filter
    }
}

function onPurchase(itemId){

    const items = JSON.parse(localStorage.getItem('items'))
    const itemIndex = items.findIndex(i => i.ID === itemId)

    if(itemIndex !== -1) {             

        const users = JSON.parse(localStorage.getItem('customers'))
        const loggedInUser = users.findIndex(u => u.isLoggedIn === true)

        if(loggedInUser!=-1){

            // alert(`purchase activated, user logged in ${users[loggedInUser].username}`)
            window.location.href = `/html/purchase.html?id=${itemId}`

        }
        else{

            alert(`Please login-in before purchasing an item.`)
            window.location.href = `/html/login.html`

        }
    }
}