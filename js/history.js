const historyContainer = document.querySelector('#history_container');
const customerInfo = document.querySelector('#customer_info');
const totalAmount = document.querySelector('#totalAmount');
const header = document.querySelector("#header")
const nav = document.querySelector("#nav");
const customerName = document.querySelector('#name');
// const customerAdd = document.querySelector('#shipAdd');
const customerPurchaces = document.querySelector('#totalPur');
const cutsomerUsername = document.querySelector('#user_username');

const users = JSON.parse(localStorage.getItem('users'));
const loggedInUser = users.findIndex(u => u.isLoggedIn === true);
let items = users[loggedInUser].purchaseHistory;

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

        showItems();
        getTotalAmount();
        completeCustomerInfo();

    
    } catch (error) {
        console.error("Failed to load items:", error)
    }
});

function showItems() {
    console.log("in showItems function");
    items = users[loggedInUser].purchaseHistory;
    if (items.length == 0) {
        historyContainer.innerHTML = "<p class='message'>You didn't buy any</p><p class='mark'> items yet !</p>";
    }
    else{
        const itemsHTML = items.map(i => itemsToHTML(i)).join(' ');
        historyContainer.innerHTML = itemsHTML;
    }
}

function itemsToHTML(item){
    return `
    <div class="card">
            <img src="${item.image_url}">
            <div class="content">
              <h3>${item.title}</h3>
              <p><b>Price: </b>${item.price} ${item.currency}</p>
              <p><b>Quantity Bought: </b>${item.quantity_to_buy}</p>
            </div>
        </div>`
}

function getTotalAmount() {
    console.log("in getTotalAmount function");
    let sum = 0;
    if (items.length != 0) {
        sum = items.reduce(((acc, b) => acc+(b.price*b.quantity_to_buy)), 0);
    }
    totalAmount.value = `${sum} QAR`;
}

function completeCustomerInfo(){
    console.log("in completeCustomerInfo function");
    cutsomerUsername.innerHTML = `${users[loggedInUser].username}`;
    customerName.value = users[loggedInUser].name;
    // customerAdd.value = users[loggedInUser].shipping_address;
    customerPurchaces.value = items.length;
}





