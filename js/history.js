const historyContainer = document.querySelector('#history_container');
const customerInfo = document.querySelector('#customer_info');
const totalAmount = document.querySelector('#total');
const header = document.querySelector("#headerContainer")
const nav = document.querySelector("#navContainer");
const customerName = document.querySelector('#name');
const customerAdd = document.querySelector('#shipAdd');
const customerPurchaces = document.querySelector('#totalPur');
const cutsomerUsername = document.querySelector('#user_username');

const users = JSON.parse(localStorage.getItem('users'));
const loggedInUser = users.findIndex(u => u.isLoggedIn === true);

let items = [];

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

        items = loggedInUser.purchaseHistory;
        localStorage.items = JSON.stringify(items)
        console.log(items)


        showItems();

    
    } catch (error) {
        console.error("Failed to load items:", error)
    }
});

function showItems() {
    const itemsHTML = items.map(i => itemsToHTML(i)).join(' ');
    historyContainer.innerHTML = itemsHTML;
    getTotalAmount();
    completeCustomerInfo();
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
    const sum = items.reduce(((acc, b) => acc+b.price), 0);
    totalAmount.Placeholder = `${sum}`;
}

function completeCustomerInfo(){
    cutsomerUsername.innerHTML = `${loggedInUser.username}`;
    customerName.Placeholder = `${loggedInUser.name} ${loggedInUser.surname}`;
    customerAdd.Placeholder = `${loggedInUser.shipping_address}`;
    customerPurchaces = `${items.length}`;
}





