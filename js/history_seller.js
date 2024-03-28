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

const users = JSON.parse(localStorage.getItem("users"));
const loggedInUser = users.findIndex((u) => u.isLoggedIn == true);

let itemsSold = users[loggedInUser].soldItems;
let itemsOnSale = users[loggedInUser].itemsOnSale;
let numberOfItemsSold = 0;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load header
    const headerResponse = await fetch("/html/common/header.html");
    const headerHTML = await headerResponse.text();
    header.innerHTML = headerHTML;

    //  Load nav
    const navResponse = await fetch("/html/common/nav.html");
    const navHTML = await navResponse.text();
    nav.innerHTML = navHTML;

    showItemsOnSale();
    showitemsSold();
    completeSellerInfo();
    getTotalAmount();

  } catch (error) {
    console.error("Failed to load items:", error);
  }
});

// function showItemsOnSale() {
//     if (itemsOnSale.length != 0) {
//         // const filteredItemsOnSale = itemsOnSale.filter(i => i.artistID == loggedInUser.id)
//         // itemsOnSale.map()
//         const itemsOnSaleHTML = filteredItemsOnSale.map(i => itemsToHTML(i)).join(' ')
//         onsaleContainer.innerHTML = itemsOnSaleHTML
//     }
//     else{
//         onsaleContainer.innerHTML += "<p>Currently No Items Are On-Sale!</p>"
//     }
// }

function showItemsOnSale() {
  // Retrieve items from local storage
  const allItems = JSON.parse(localStorage.getItem("items")) || [];
  const sellerItemsOnSale = users[loggedInUser].itemsOnSale;

  if (sellerItemsOnSale.length > 0) {
    // Find the corresponding items in allItems array using the itemsOnSale IDs
    const filteredItemsOnSale = allItems.filter((item) =>
      sellerItemsOnSale.includes(item.ID)
    );

    // Generate HTML for each item and join them into a single string
    const itemsOnSaleHTML = filteredItemsOnSale
      .map((item) => itemsToHTML(item))
      .join(" ");

    // Insert the HTML into the onsaleContainer
    onsaleContainer.innerHTML = itemsOnSaleHTML;
  } else {
    onsaleContainer.innerHTML += "<p>Currently No Items Are On-Sale!</p>";
  }
}

function showitemsSold() {
  if (itemsSold.length != 0) {
    const itemsSoldHTML = itemsSold.map((i) => itemsSoldToHTML(i)).join(" ");
    soldContainer.innerHTML = itemsSoldHTML;
  } else {
    soldContainer.innerHTML += "<p>No Items Are Sold Yet!</p>";
  }
}

function itemsToHTML(item) {
  const clientsHTML = clientsToHTML(item.clients);
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

function itemsSoldToHTML(item) {
  const clientsHTML = clientsToHTML(item.clients);
  console.log(`Clients array: ${item.clients}`);
  numberOfItemsSold += item.sold;
  return `
    <div class="card">
            <img src="${item.image_url}">
            <div class="content">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <p><b>Price: </b>${item.price}</p>
              <p><b>${item.sold}</b> Items got sold</p>
              <h4> Who bought this item :</h4>
              <p>${item.clients.join(", ")}</p>
            </div>
        </div>`;
}

function clientsToHTML(clientsArray) {
  return clientsArray.map((c) => `<li> ${c} </li>`).join("");
}

function getTotalAmount() {
  let sum = 0;
  if (itemsSold.length != 0) {
    sum = itemsSold.reduce((acc, b) => acc + b.price, 0);
  }
  totalAmountSold.value = `${sum} $`;
}

function completeSellerInfo() {
  cutsomerUsername.innerHTML = `${users[loggedInUser].username}`;
  customerName.value = users[loggedInUser].name;
  TotalitemsOnsale.value = itemsOnSale.length;
  itemssold.value = numberOfItemsSold;
}

function addItemBEvent() {
  window.location.href = "/html/add_item.html";
}

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

  function updateItem(id) {
    const item = items.find(i => i.ID == id);
    if (item) {
      const queryString = `?id=${id}`;
      window.location.href = `/html/add_item.html${queryString}`;
    } else {
      console.log("Item not found");
    }
  }
  
  