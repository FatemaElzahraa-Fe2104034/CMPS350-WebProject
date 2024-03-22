const itemsURL = "../json/items.json";

let items = []

const itemsDIV = document.querySelector("#all-items") 
const searchBAR = document.querySelector("#search")

searchBAR.addEventListener('input', handleSearchBar)

// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {

        // // Check if items are in Local Storage
        // if (localStorage.getItem('items')) {
        //     items = JSON.parse(localStorage.getItem('items'));
        // } else {
            // Fetch the data since it's not in Local Storage
            const response = await fetch(itemsURL);
            items = await response.json();
            
            // Store the fetched data in Local Storage
            localStorage.items = JSON.stringify(items);
        // }
        
        console.log(items)
        // load items from either Local Storage or fetched data
        showItems(items); 
    
    } catch (error) {
        console.error("Failed to load items:", error);
    }
});

function showItems(items) {
    const mappedItems = items.map(
        item => `
        <div class="card" data-id="${item.ID}" onclick="navigateToItemDetail('${item.ID}')">
            <img src="${item.image_url}" alt="${item.title}'s thumbnail">
            <div class="item-properties">
                <p> <span class="titles">Title:</span> ${item.title}</p>
                <p> <span class="titles">Artist:</span> ${item.artist}</p>
                <p> <span class="titles">Category:</span> ${item.category}</p>
                <p> <span class="titles">Price:</span> ${item.price}</p>
            </div>
        </div>
        `
    ).join('\n');
    
    itemsDIV.innerHTML = mappedItems;
}

// This function will be called when a card is clicked.
function navigateToItemDetail(itemId) {
    window.location.href = `../item_details.html?id=${itemId}`;
}

function handleSearchBar() {
    const filter = searchBAR.value.toLowerCase().trim();
    if (filter) {
        const filteredItems = items.filter(item => {
            // Safe check for title
            const titleMatch = item.title && typeof item.title === 'string' ? item.title.toLowerCase().includes(filter) : false;
            const categoryMatch = item.category && typeof item.category === 'string' ? item.category.toLowerCase().includes(filter) : false;
            const artistMatch = item.artist && typeof item.artist === 'string' ? item.artist.toLowerCase().includes(filter) : false;

            return titleMatch || categoryMatch || artistMatch;
        });

        showItems(filteredItems);
    } else {
        showItems(items); // Show all books when there's no filter
    }
}