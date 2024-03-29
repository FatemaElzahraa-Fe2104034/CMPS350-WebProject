const itemsURL = "/json/items.json"
let items = []
let itemOnSale =[]
let itemId

const uploadForm = document.querySelector("#upload-form")

// Add event listener to load the items
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

      // loadItems()
      items = JSON.parse(localStorage.getItem('items'))
      itemOnSale = JSON.parse(localStorage.getItem('itemOnSale'));

      const urlParams = new URLSearchParams(window.location.search);
      itemId = urlParams.get('id'); // Get the 'id' query parameter.
      console.log(itemId);

      if(itemId){
        handleUpdate(itemId)
      }
  
  } catch (error) {
      console.error("Failed to load nav or header:", error)
  }
});

function loadItems() {
  items = JSON.parse(localStorage.getItem('items'))
}

uploadForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  const item = formToObject(e.target);

  for (const [k, value] of Object.entries(item)) {
    if (value == "") {
      alert("Please fill all fields")
      return;
    }
  }

  const exist = items.findIndex(i => i.image_url === item.image_url)
  if (exist !== -1) {
    // Handle update
    updateItem(item.image_url)
    alert("Item updated !")
    return; // Prevent further execution after updating
  } else {
    setItemArtist(item)
    item.quantity_to_buy = 0
    item.clients = []

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items))
    //What does this do??
    localStorage.setItem('itemOnSale', JSON.stringify(itemOnSale))
    console.log("Item added")
    window.location.href = "/html/historySeller.html"
  }
}

function handleUpdate(id){
  // Find the item by its ID
  console.log(typeof id)
  console.log(items);
  const item = items.find(i => i.ID == id);
  console.log(item)
  if(item){
    // Populate the form fields with the item data
    document.querySelector("#title").value = item.title;
    document.querySelector("#available_quantity").value = item.available_quantity;
    document.querySelector("#price").value = item.price;
    document.querySelector("#image_url").value = item.image_url;
    document.querySelector("#image_url").readOnly = true; // Make image URL read-only
    document.querySelector("#description").value = item.description;
    
    // Select the category in the dropdown
    const categoryDropdown = document.querySelector(".dropdown-categories");
    for (let option of categoryDropdown.options){
      if (option.value === item.category) {
        option.selected = true;
        break;
      }
    }
  }
  else{
    alert("Item not found.");
  }
}




function setItemArtist(item) {

  let users = JSON.parse(localStorage.getItem('users'));
  console.log(users)

  let artist = users.filter(u => u.type == "seller")
  let loggedInArtist = artist.find((u) => u.isLoggedIn == true)

  console.log(loggedInArtist)
  item.ID = Date.now()
  item.currency = "QAR"
  item.artist = loggedInArtist.name
  item.artistID = loggedInArtist.id
  
  loggedInArtist.itemsOnSale.push(item.ID)
  localStorage.setItem('users', JSON.stringify(users))

}


function formToObject(form) {
  const formData = new FormData(form);
  const data = {};
  for (const [e, value] of formData) {
    data[e] = value;
  }
  console.log(data)
  return data;
}

function updateItem(imageUrl) {

  const itemIndex = items.findIndex(i => i.image_url === imageUrl);
  
  if (itemIndex !== -1) {
    const updatedItemDetails = formToObject(uploadForm);
    
    // Update the item's details except for the image URL, which is read-only.
    items[itemIndex].title = updatedItemDetails.title;
    items[itemIndex].available_quantity = updatedItemDetails.available_quantity;
    items[itemIndex].price = updatedItemDetails.price;
    items[itemIndex].description = updatedItemDetails.description;
    items[itemIndex].category = updatedItemDetails.category;
    
    localStorage.setItem('items', JSON.stringify(items));
    
    console.log("Item updated");
    window.location.href = "/html/historySeller.html"; 
  } else {
    console.log("Item with provided image URL not found");
    alert("Item not found");
  }
}









