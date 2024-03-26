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

const users = JSON.parse(localStorage.getItem('sellers'));
const loggedInUser = users.findIndex(u => u.isLoggedIn === true);

let itemsSold = [];
let itemsOnSale = [];

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

        itemsSold = loggedInUser.soldItems;
        localStorage.itemsSold = JSON.stringify(itemsSold)
        console.log(itemsSold)

        itemsOnSale = loggedInUser.itemsOnSale;
        localStorage.itemsOnSale = JSON.stringify(itemsOnSale)
        console.log(itemsOnSale)

        showItems();

    
    } catch (error) {
        console.error("Failed to load items:", error)
    }
});

function showItems() {
    const itemsOnSaleHTML = itemsOnSale.map(i => itemsToHTML(i)).join(' ');
    onsaleContainer.innerHTML = itemsOnSaleHTML;

    const itemsSoldHTML = itemsSold.map(i => itemsToHTML(i)).join(' ');
    soldContainer.innerHTML = itemsSoldHTML;
    completeSellerInfo();
    getTotalAmount();
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
    const sum = itemsSold.reduce(((acc, b) => acc+b.price), 0);
    totalAmountSold.Placeholder = `${sum}`;
}

function completeCustomerInfo(){
    cutsomerUsername.innerHTML = `${loggedInUser.username}`;
    customerName.Placeholder = `${loggedInUser.name}`;
    itemsOnsale.Placeholder = `${itemsOnSale.length}`;
    itemssold.Placeholder = `${itemsSold.length}`
}





