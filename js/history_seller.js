const onsaleContainer = document.querySelector('#onsale_container');
const soldContainer = document.querySelector('#sold_container');
const customerInfo = document.querySelector('#customer_info');
const header = document.querySelector("#headerContainer")
const nav = document.querySelector("#navContainer");
const customerName = document.querySelector('#name');
const itemsOnsale = document.querySelector('#totalOnsale');
const itemssold = document.querySelector('#totalSold');
const cutsomerUsername = document.querySelector('#user_username');
const totalAmountSold = document.querySelector('#totalAmount');
const addItemB = document.querySelector('#addItemButton');

const users = JSON.parse(localStorage.getItem('users'));
const loggedInUser = users.findIndex(u => u.isLoggedIn === true);

let itemsSold = users[loggedInUser].itemsSold;
let itemsOnSale = users[loggedInUser].itemsOnSale;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load header
        const headerResponse = await fetch("../html/common/header.html")
        const headerHTML = await headerResponse.text()
        header.innerHTML = headerHTML
        
        //  Load nav
        const navResponse = await fetch("../html/common/nav.html")
        const navHTML = await navResponse.text()
        nav.innerHTML = navHTML

        showItems();
        completeSellerInfo();
        getTotalAmount();

    
    } catch (error) {
        console.error("Failed to load items:", error)
    }
});

addItemB.addEventListener('click', addItemBEvent);


function showItems() {
    if (itemsOnSale.length != 0) {
        const itemsOnSaleHTML = itemsOnSale.map(i => itemsToHTML(i)).join(' ');
        onsaleContainer.innerHTML = itemsOnSaleHTML;
    }
    else{
        onsaleContainer.innerHTML = "<p>Currently No Items Are On-Sale!</p>"
    }
    
    if (itemsSold.length != 0) {
        const itemsSoldHTML = itemsSold.map(i => itemsToHTML(i)).join(' ');
        soldContainer.innerHTML = itemsSoldHTML;
    }
    else{
        soldContainer.innerHTML = "<p>No Items Are Sold Yet!</p>"
    }
}

function itemsToHTML(item){
    return `
    <div class="card">
            <img src="${item.image_url}">
            <div class="content">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
        </div>`
}

function getTotalAmount() {
    const sum =0;
    if (itemsSold.length != 0) {
        sum = itemsSold.reduce(((acc, b) => acc+b.price), 0);
    } 
    totalAmountSold.value = sum;
}

function completeCustomerInfo(){
    cutsomerUsername.innerHTML = `${loggedInUser.username}`;
    customerName.value = users[loggedInUser].name;
    itemsOnsale.value = itemsOnSale.length;
    itemssold.value = itemsSold.length;
}

function addItemBEvent(){
    window.location.href = "/html/add_item.html";
}





