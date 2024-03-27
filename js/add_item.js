const itemsURL = "../json/items.json";
let items = JSON.parse(localStorage.getItem("items")) || []; 

const uploadForm = document.querySelector("#upload-form");

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
  
  } catch (error) {
      console.error("Failed to load items:", error)
  }
});


function setItemArtist(item) {
  const artists = JSON.parse(localStorage.getItem("users"));
  console.log(artists)
  const loggedInArtist = artists.find((u) => u.isLoggedIn === true);
  item.id = Date.now();
  item.currency = "QAR";
  item.artist = loggedInArtist.name;
  item.artistID = loggedInArtist.id;
  loggedInArtist.itemsOnSale.push(item);
}

function formToObject(form) {
  const formData = new FormData(form);
  const data = {};
  for (const [e, value] of formData) {
    data[e] = value;
  }
  console.log(data); 
  return data;
}


function updateItem(id) {
  const item = items.find(i => i.id == id);
  if (item) {
    Object.entries(item).forEach(([key, value]) => {
      const element = document.querySelector(`#${key}`);
      if (element) {
        if (key !== "quantity") {
          element.setAttribute("readonly", true);
        }
        element.value = value;
      }
    });
  } else {
    console.log("Item not found");
  }
}


function handleSubmit(e) {
  alert("Start submiting")
  console.log("Inside handle submission")
  e.preventDefault();
  console.log("Form submitted");
  const item = formToObject(e.target);
  setItemArtist(item);
  let validating = true;
  for (const [k, value] of Object.entries(item)) {
    if (value == "") {
      validating = false;
      alert("Please fill all fields");
      return;
    }
  }
  const exist = items.findIndex((i) => i.id == item.id);
  if (exist != -1) {
    //handle update
    updateItem(item.id)
    alert("Already there !");
    items[exist] = item;
  } else {
    items.push(item); 
  }

  localStorage.setItem("items", JSON.stringify(items));
  window.location.href = "/html/all_Items.html"
}

uploadForm.addEventListener("submit", handleSubmit);

