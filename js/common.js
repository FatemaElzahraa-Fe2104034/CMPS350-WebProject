let loginLINK;
let categoryLINK;
let categoryDD;
let profileB;
document.addEventListener('DOMContentLoaded', function() {
    insertCommonElements();
});

async function insertCommonElements() {
    await loadElement("header", "/html/common/header.html")
    await loadElement("nav", "/html/common/nav.html")
    // categoryLINK = document.querySelector("#categories")
    loginLINK = document.querySelector("#login")
    // categoryDD = document.querySelector("#dropdown-content")
    profileB = document.querySelector("#profile");
    updateLoginLink()
    // categoryLINK.addEventListener("click", showCategoriesDROPDOWN)
    profileB.addEventListener('click', profileCheck)
}

async function loadElement(elementId, url) {
    const element = document.getElementById(elementId);
    if (element) {
        const response = await fetch(url);
        element.innerHTML = await response.text();
    }
}

async function updateLoginLink() {
    try {
        // Fetch the users
        let users = JSON.parse(localStorage.getItem('users'));

        const loggedInUser = users.findIndex(u => u.isLoggedIn == true)

        if(loggedInUser!=-1){
            loginLINK.innerHTML = `<a href="#" id="loggedIn" class="login">Logout</a>`
            
            document.querySelector("#loggedIn").addEventListener('click', (e) => {
                e.preventDefault()
                handleLogout(loggedInUser)
            })
        }
        else{
            loginLINK.innerHTML = `<a href="#" id="loggedOut" class="login">Login</a>`
            
            document.querySelector("#loggedOut").addEventListener('click', (e) => {
                e.preventDefault()
                handleLogin()
            })
        }
    
    } catch (error) {
        console.error("Failed to update login link:", error);
    }
}


function handleLogout(loggedInUser) {
    if (loggedInUser==-1) {
        alert(`The user does not exist.`)
        return;
    } else {
        users[loggedInUser].isLoggedIn = false
        localStorage.setItem('users', JSON.stringify(users))

        alert("You have been successfully logged out.")
        updateLoginLink()
    }
}

function handleLogin() {
    window.location.href = "/html/login.html"
}

// function showCategoriesDROPDOWN(){  
//     // const dropdownContent = document.getElementById('dropdown-content');
//     // dropdownContent.classList.toggle('show-dropdown');
//     const mappedCategories = categories.map(c => `
//         <a onclick="navigateToFilteredItems(${c.id})">${c.name}</a>
//     `).join('\n')
//     categoryDD.innerHTML = mappedCategories
//     categoryDD.classList.toggle('show-dropdown')
// }

// function navigateToFilteredItems(categoryId){
//     window.location.href = `/html/all_Items.html?id=${categoryId}`
// }

// function profileCheck(){
//     console.log("entered profilecheck");
//     const users = JSON.parse(localStorage.getItem('users'))
//     const nusersSeller = JSON.parse(localStorage.getItem('seller'))
//     const loggedInUser = usersCustomer.findIndex(u => u.isLoggedIn === true)
//     if (loggedInUser!=-1) {
//         window.location.href = "/html/history.html"
//     }
//     else {
//         window.location.href = "/html/historySeller.html"
//     }
// }

function profileCheck() {
    // Retrieve customer data from local storage and parse it
    const users = JSON.parse(localStorage.getItem('users'));

    // Find index of logged-in user in the usersCustomer array
    const loggedInUser = users.findIndex(u => u.isLoggedIn === true);

    // Check if a logged-in user is found
    if(loggedInUser!=-1){
        const user = users[loggedInUser]
        if(user.type=="customer"){
            //Handle customer here
            window.location.href = "/html/history.html"
        }
        else if(user.type=="seller"){
            //Handle seller here
            window.location.href = "/html/historySeller.html"
        }
        else{
            alert("An error occured")
        }
    }
    else{
        alert("Login before proceeding.")
        window.location.href ="/html/login.html"
    }
}
