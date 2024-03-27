const itemsURL = "../json/items.json";
let items = [];

const uploadForm = document.querySelector("upload-form");

uploadForm.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const item = formToObject(e.target);
  //   item._id = Date.now();
  setItemArtiest(item);
  let validating = true;
  for (const [k, value] of Object.entries(item)) {
    if (value == "") {
      validating = false;
      alert("Please fill all field");
      return;
    }
  }

  const exist = items.findIndex((i) => b.is == item.id);
  if (exist != -1) {
    //handle update
    items[exist] = item;
  } else {
    items.push(item);
  }

  localStorage.setItem("items", JSON.stringify(items));
  e.target.reset();
}

function setItemArtiest(item) {
  const artists = JSON.parse(localStorage.getItem("users"));
  const loggedInArtist = artists.find((u) => u.isLoggedIn === true);
  item._id = Date.now();
  item.currency = "QAR";
  item.quantity_to_buy = 0;
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
  return data;
}
