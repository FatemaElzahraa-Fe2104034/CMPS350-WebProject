// Select elements from the DOM for manipulation
const onsaleContainer = document.querySelector("#onsale_container");
const soldContainer = document.querySelector("#sold_container");
const customerInfo = document.querySelector("#customer_info");
const header = document.querySelector("#header");
const nav = document.querySelector("#nav");
const customerName = document.querySelector("#name");
const TotalitemsOnsale = document.querySelector("#totalOnsale");
const itemssold = document.querySelector("#totalSold");
const cutsomerUsername = document.querySelector("#user_username");
const totalAmountSold = document.querySelector("#totalAmount");
const addItem = document.querySelector("#addItemButton")

// Retrieve the list of users and find the currently logged-in user
const users = JSON.parse(localStorage.getItem("users"));
const loggedInUser = users.findIndex((u) => u.isLoggedIn == true);

// Extract information about items sold and items on sale from the logged-in user
let itemsSold = users[loggedInUser].soldItems;
let itemsOnSale = users[loggedInUser].itemsOnSale;
let numberOfItemsSold = 0;

// Retrieve the items from local storage
let items = JSON.parse(localStorage.getItem("items")) 

// When the content is loaded, perform these actions
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load the common header and navigation content
    const headerResponse = await fetch("/html/common/header.html");
    const headerHTML = await headerResponse.text();
    header.innerHTML = headerHTML;

    const navResponse = await fetch("/html/common/nav.html");
    const navHTML = await navResponse.text();
    nav.innerHTML = navHTML;

    // Display the items on sale, items sold, seller info, and the total amount sold
    showItemsOnSale();
    showitemsSold();
    completeSellerInfo();
    getTotalAmount();

  } catch (error) {
    console.error("Failed to load items:", error);
  }
});

// Function to display items that are currently on sale
function showItemsOnSale() {
  const allItems = JSON.parse(localStorage.getItem("items")) || [];
  const sellerItemsOnSale = users[loggedInUser].itemsOnSale;

  if (sellerItemsOnSale.length > 0) {
    // Filter and display items that are on sale
    const filteredItemsOnSale = allItems.filter((item) =>
      sellerItemsOnSale.includes(item.ID)
    );

    const itemsOnSaleHTML = filteredItemsOnSale
      .map((item) => itemsToHTML(item))
      .join(" ");

    onsaleContainer.innerHTML = itemsOnSaleHTML;
  } else {
    onsaleContainer.innerHTML += "<p class='message'>Currently No Items</p><p class='mark'> Are On-Sale!</p>";
  }
}

// Function to display items that have been sold
function showitemsSold() {
  if (itemsSold.length != 0) {
    const itemsSoldHTML = itemsSold.map((i) => itemsSoldToHTML(i)).join(" ");
    soldContainer.innerHTML = itemsSoldHTML;
  } else {
    soldContainer.innerHTML += "<p class='message'>No Items Are</p><p class='mark'> Sold Yet !</p>";
  }
}

// Function to convert item details to HTML format
function itemsToHTML(item) {
  return `
    <div class="card">
        <img src="${item.image_url}">
        <div class="content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <button id="deleteBtn" onclick="deleteItem(${item.ID})">Delete</button>
            <button id="updateBtn" onclick="updateItem(${item.ID})">Update</button>
        </div>
    </div>`;
}

// Function to convert sold items details to HTML format
function itemsSoldToHTML(item) {
  numberOfItemsSold += item.sold;
  return `
    <div class="card">
            <img src="${item.image_url}">
            <div class="content">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <p><b>Price: </b>${item.price} ${item.currency}</p>
              <p><b>${item.sold}</b> Items got sold</p>
              <h4> Who bought this item :</h4>
              <p>${item.clients.join(", ")}</p>
            </div>
        </div>`;
}

// Function to compile client details into HTML list format
function clientsToHTML(clientsArray) {
  return clientsArray.map((c) => `<li> ${c} </li>`).join("");
}

// Function to calculate the total amount from sold items
function getTotalAmount() {
  let sum = 0;
  if (itemsSold.length != 0) {
    sum = itemsSold.reduce((acc, b) => acc + b.price, 0);
  }
  totalAmountSold.value = `${sum} QAR`;
}

// Function to fill in seller information
function completeSellerInfo() {
  cutsomerUsername.innerHTML = `${users[loggedInUser].username}`;
  customerName.value = users[loggedInUser].name;
  TotalitemsOnsale.value = itemsOnSale.length;
  itemssold.value = numberOfItemsSold;
}

// Function to handle item deletion
function deleteItem(itemId) {
  const allItems = JSON.parse(localStorage.getItem("items")) || [];
  const index = allItems.findIndex((item) => item.ID == itemId);
  if (index != -1) {
    allItems.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(allItems));
    showItemsOnSale();
  } else {
    console.log("Item not found");
  }
}

// Function to redirect for item update
function updateItem(id) {
  const item = items.find(i => i.ID == id);
  if (item) {
    window.location.href = `/html/add_item.html?id=${item.ID}`;
  } else {
    console.log("Item not found");
  }
}

addItem.addEventListener("click", addItemBEvent)

function addItemBEvent() {
  window.location.href = "/html/add_item.html";
}