const itemDetailsDIV = document.querySelector("#main")

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Get the 'id' query parameter.

    if (itemId) {
        const items = JSON.parse(localStorage.getItem('items'));
        const item = items.find(i => i.ID === itemId);
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
                <div class="quantity">
                    <button id="decreaseQuantity">-</button>
                    <p>${item.quantity_to_buy}</p>
                    <button id="increaseQuantity">+</button>
                </div>
                <button id="purchase">Add to Cart</button>
            </section>
            `

    document.querySelector("#decreaseQuantity").addEventListener('click', () => decreaseQuantity(item.ID))
    document.querySelector("#increaseQuantity").addEventListener('click', () => increaseQuantity(item.ID))
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
    const amountToBePaid = items[itemIndex].quantity_to_buy*items[itemIndex].price
    if(itemIndex !== -1) {             
        const users = JSON.parse(localStorage.getItem('customers'))
        const loggedInUser = users.findIndex(u => u.isLoggedIn === true)
        if(loggedInUser!=-1){
            if(users[loggedInUser].balance>amountToBePaid){
                alert(`Purchase successful.`)
            }
            else{
                alert(`You don't have sufficient balance.`)
            }
        }
        else{
            alert(`Please login-in before purchasing an item.`)
        }
    }
}