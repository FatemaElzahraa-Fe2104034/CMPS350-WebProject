const itemsURL = "/json/items.json"
let items = []

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

      loadItems()
  
  } catch (error) {
      console.error("Failed to load nav or header:", error)
  }
});

async function loadItems() {
  items = JSON.parse(localStorage.getItem('items'))
}

uploadForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  //working
  const item = formToObject(e.target)
  console.log(item)

  //working
  for (const [k, value] of Object.entries(item)) {
    if (value == "") {
      // validating = false
      alert("Please fill all fields")
      return
    }
  }

  setItemArtist(item)
  item.quantity_to_buy = 0

  // const exist = items.findIndex(i => i.ID == item.ID)
  // if (exist != -1) {
  //   //handle update
  //   updateItem(item.ID)
  //   alert("Already there !")
  //   items[exist] = item
  // } else {
  //   // console.log(items)
  // }
  
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items))
  console.log("Item added")
  window.location.href = "/html/all_Items.html"
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


//!!!! not working 
function formToObject(form) {
  const formData = new FormData(form);
  const data = {};
  for (const [e, value] of formData) {
    data[e] = value;
  }
  console.log(data)
  return data;
}



function updateItem(id) {
  const item = items.find(i => i.ID == id);
  if (item) {
    Object.entries(item).forEach(([key, value]) => {
      const element = document.querySelector(`#${key}`);
      if (element) {
        if (key !="quantity") {
          element.setAttribute("readonly", true);
        }
        element.value = value;
      }
    });
  } else {
    console.log("Item not found");
  }
}







