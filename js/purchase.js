const itemDetailsDIV = document.querySelector("#itemdetails")
const quantity = document.querySelector("#quantity")
const header = document.querySelector("#header")
const nav = document.querySelector("#nav")

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Get the 'id' query parameter.

    if (itemId) {
        const items = JSON.parse(localStorage.getItem('items'));
        const item = items.find(i => i.ID === itemId);
        if (item) {
            displayItemInfo(item);
        } else {
            console.error('Item not found');
        }
    }
});

function displayItemInfo(item) {
    itemDetailsDIV.innerHTML=`
            <section class="item-details info">
                <p class="info-title">Information</p>
                <p class="item-title">Title: ${item.title}</p>
                <p class="item-quantity">Number of Items Available: ${item.available_quantity}</p>
                <p class="item-price">Price: ${item.price}</p> 
                <p>Category: ${item.category}</p>
                <p>ID: ${item.ID}</p>
                <p>Artist: ${item.artist}</p>
                
            </section>
            `
    quantity.innerHTML =`
    <div class="quantity">
        <button id="decreaseQuantity">-</button>
        <p>${item.quantity_to_buy}</p>
        <button id="increaseQuantity">+</button>
    </div>
    `
    document.querySelector("#decreaseQuantity").addEventListener('click', () => decreaseQuantity(item.ID))
    document.querySelector("#increaseQuantity").addEventListener('click', () => increaseQuantity(item.ID))
}

function findItemAndUpdateQuantity(itemId, change) {
    const items = JSON.parse(localStorage.getItem('items'))
    const itemIndex = items.findIndex(i => i.ID === itemId)
    if(itemIndex !== -1) {
        const newQuantity = items[itemIndex].quantity_to_buy + change
        if(newQuantity>=0){
            items[itemIndex].quantity_to_buy += change
            localStorage.setItem('items', JSON.stringify(items))
            displayItemInfo(items[itemIndex])
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
    // const items = JSON.parse(localStorage.getItem('items'))
    // const itemIndex = items.findIndex(i => i.ID === itemId)
    // // const amountToBePaid = items[itemIndex].quantity_to_buy*items[itemIndex].price
    // if(itemIndex !== -1) {             
    //     const users = JSON.parse(localStorage.getItem('customers'))
    //     const loggedInUser = users.findIndex(u => u.isLoggedIn === true)
    //     if(loggedInUser!=-1){
    //         window.location.href = `../purchase.html?id=${itemId}`
    //         alert(`purchase activated, user logged in ${users[loggedInUser]}`)
    //         // if(items[itemIndex].quantity_to_buy>0){
    //         //     if(users[loggedInUser].balance>amountToBePaid){
    //         //         alert(`Purchase successful.`)
    //         //     }
    //         //     else{
    //         //         alert(`You don't have sufficient balance.`)
    //         //     }
    //         // }
    //         // else{
    //         //     alert(`You don't have sufficient balance.`)
    //         // }
    //     }
    //     else{
    //         window.location.href = `../login.html?id=${itemId}`
    //         alert(`Please login-in before purchasing an item.`)
    //     }
    // }
}