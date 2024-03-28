const onsaleContainer = document.querySelector('#onsale_container');
const soldContainer = document.querySelector('#sold_container');
const customerInfo = document.querySelector('#customer_info');
const header = document.querySelector("#header")
const nav = document.querySelector("#nav");
const customerName = document.querySelector('#name');
const TotalitemsOnsale = document.querySelector('#totalOnsale');
const itemssold = document.querySelector('#totalSold');
const cutsomerUsername = document.querySelector('#user_username');
const totalAmountSold = document.querySelector('#totalAmount');

const users = JSON.parse(localStorage.getItem('users'));
const loggedInUser = users.findIndex(u => u.isLoggedIn == true);

let itemsSold = users[loggedInUser].soldItems;
let itemsOnSale = users[loggedInUser].itemsOnSale;



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

        showItemsOnSale();
        showitemsSold();
        completeSellerInfo();
        getTotalAmount();

    
    } catch (error) {
        console.error("Failed to load items:", error)
    }
});

function showItemsOnSale() {
    if (itemsOnSale.length != 0) {
        const itemsOnSaleHTML = itemsOnSale.map(i => itemsToHTML(i)).join(' ')
        onsaleContainer.innerHTML = itemsOnSaleHTML
    }
    else{
        onsaleContainer.innerHTML += "<p>Currently No Items Are On-Sale!</p>"
    }
}

function showitemsSold(){
    if (itemsSold.length != 0) {
        const itemsSoldHTML = itemsSold.map(i => itemsToHTML(i)).join(' ')
        soldContainer.innerHTML = itemsSoldHTML
    }
    else{
        soldContainer.innerHTML += "<p>No Items Are Sold Yet!</p>"
    }
}

function itemsToHTML(item){
    const clientsHTML = clientsToHTML(item.clients);
    return `
    <div class="card">
            <img src="${item.image_url}">
            <div class="content">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <h4> Who bought this item :</h4>
              <div class="hoverOverHere">Clients Usernames
              <p class="hoverText">
                  ${item.clients.join(', ')}
              </p>
              </div>
            </div>
        </div>`
}

function clientsToHTML(clientsArray){
    return clientsArray.map(c => `<li> ${c} </li>`).join('');
}

function getTotalAmount() {
    let sum =0;
    if (itemsSold.length != 0) {
        sum = itemsSold.reduce(((acc, b) => acc+b.price), 0);
    } 
    totalAmountSold.value = `${sum} $`;
}

function completeSellerInfo(){
    cutsomerUsername.innerHTML = `${users[loggedInUser].username}`;
    customerName.value = users[loggedInUser].name;
    TotalitemsOnsale.value = itemsOnSale.length;
    itemssold.value = itemsSold.length;
}

function addItemBEvent(){
    window.location.href = "/html/add_item.html";
}



