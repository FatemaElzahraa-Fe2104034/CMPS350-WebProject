let item;

const itemDetailsDIV = document.querySelector("#itemdetails")
const quantity = document.querySelector("#quantity")
const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const purchaseFORM = document.querySelector("#purchase-form")

purchaseFORM.addEventListener('submit', onPurchase)

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Get the 'id' query parameter.

    if (itemId) {
        const items = JSON.parse(localStorage.getItem('items'));
        item = items.find(i => i.ID === itemId);
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

function onPurchase(e){
    e.preventDefault()

    const artists = JSON.parse(localStorage.getItem('artists'))
    const artist = artists.find(a=> a.id == item.artistID)
    const amountToBePaid = item.quantity_to_buy*item.price

    const users = JSON.parse(localStorage.getItem('customers'))
    const loggedInUser = users.find(u => u.isLoggedIn === true)

    if(loggedInUser.balance>amountToBePaid){
        loggedInUser.balance-=amountToBePaid
        item.quantity-=1

        //Update purchase/sale histories
        loggedInUser.purchaseHistory.push(item)
        artist.soldItems.push(item)

        console.log(`purchase history ${loggedInUser.purchaseHistory.toString()}`)
        console.log(`sale history ${artist.soldItems.toString()}`)

        alert(`Purchase sucessful\nNew balance: ${loggedInUser.balance}`)
        window.location.href = `/html/main.html`
    }
    else{
        alert("Insufficient balance.")
    }
}

function formToObject(form){
    const formData = new FormData(form)
    const data = {}

    for(const [key, value] of formData){
        data[key] = value
    }

    return data;
}