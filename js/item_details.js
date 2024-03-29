const itemDetailsDIV = document.querySelector("#main")
const header = document.querySelector("#header")
const nav = document.querySelector("#nav")

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Get the 'id' query parameter.

    if (itemId) {
        const items = JSON.parse(localStorage.getItem('items'));
        const item = items.find(i => i.ID == itemId);
        if (item) {
                
            displayItemDetail(item);
        
        } else {
            console.error('Item not found');
        }
    }
});

function displayItemDetail(item) {
    itemDetailsDIV.innerHTML=`
            <section class="item-image">
                <img src="${item.image_url}" alt="item">
            </section>

            <section class="item-details">
                <h1 class="item-title">${item.title}</h1>
                <p class="item-quantity">Number of Items Available: ${item.available_quantity}</p>
                <p class="item-price">Price: ${item.price}</p>
                <section class="info">
                    <p class="info-title">Information</p>
                    <p>Category: ${item.category}</p>
                    <p>ID: ${item.ID}</p>
                    <P>Description: ${item.description}</P>
                    <p>Artist: ${item.artist}</p>
                </section>
                <button id="purchase">Purchase</button>
            </section>
            `

    // document.querySelector("#decreaseQuantity").addEventListener('click', () => decreaseQuantity(item.ID))
    // document.querySelector("#increaseQuantity").addEventListener('click', () => increaseQuantity(item.ID))
    document.querySelector("#purchase").addEventListener('click', () => onPurchase(item.ID))
}

function findItemAndUpdateQuantity(itemId, change) {
    const items = JSON.parse(localStorage.getItem('items'))
    const itemIndex = items.findIndex(i => i.ID === itemId)
    if(itemIndex !== -1) {
        const newQuantity = items[itemIndex].quantity_to_buy + change
        if(newQuantity>=0){
            items[itemIndex].quantity_to_buy += change
            localStorage.setItem('items', JSON.stringify(items))
            displayItemDetail(items[itemIndex])
        }               
        
    }
}

function decreaseQuantity(itemId) {
    findItemAndUpdateQuantity(itemId, -1)
}

function increaseQuantity(itemId) {
    findItemAndUpdateQuantity(itemId, 1)
}

function onPurchase(itemId){
    const items = JSON.parse(localStorage.getItem('items'))
    const itemIndex = items.findIndex(i => i.ID === itemId)
    // const amountToBePaid = items[itemIndex].quantity_to_buy*items[itemIndex].price
    if(itemIndex !== -1) {             
        const users = JSON.parse(localStorage.getItem('users'))
        const loggedInUser = users.findIndex(u => u.isLoggedIn == true)
        if(loggedInUser!=-1){
            // alert(`purchase activated, user logged in ${users[loggedInUser].username}`)
            window.location.href = `/html/purchase.html?id=${itemId}`
        }
        else{
            alert(`Please login-in before purchasing an item.`)
            window.location.href = `/html/login.html?id=${itemId}`
            
        }
    }
}