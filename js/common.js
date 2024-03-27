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
    categoryLINK = document.querySelector("#categories")
    loginLINK = document.querySelector("#login")
    categoryDD = document.querySelector("#dropdown-content")
    profileB = document.querySelector('#profile');
    updateLoginLink()
    categoryLINK.addEventListener("click", showCategoriesDROPDOWN)
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
        // Fetch the customers
        if (localStorage.getItem('customers')) {
            customers = JSON.parse(localStorage.getItem('customers'));
        } else {
            // Fetch the data since it's not in Local Storage
            const response = await fetch(customersURL);
            customers = await response.json();
            
            // Store the fetched data in Local Storage
            localStorage.customers = JSON.stringify(customers);
        }

        const loggedInUser = customers.findIndex(u => u.isLoggedIn === true)

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
        customers[loggedInUser].isLoggedIn = false
        localStorage.setItem('customers', JSON.stringify(customers))

        alert("You have been successfully logged out.")
        updateLoginLink()
    }
}

function handleLogin() {
    window.location.href = "/html/login.html"
}

function showCategoriesDROPDOWN(){  
    // const dropdownContent = document.getElementById('dropdown-content');
    // dropdownContent.classList.toggle('show-dropdown');
    const mappedCategories = categories.map(c => `
        <a onclick="navigateToFilteredItems(${c.id})">${c.name}</a>
    `).join('\n')
    categoryDD.innerHTML = mappedCategories
    categoryDD.classList.toggle('show-dropdown')
}

function navigateToFilteredItems(categoryId){
    window.location.href = `/html/all_Items.html?id=${categoryId}`
}

function profileCheck(){
    // console.log("entered profilecheck");
    // const usersCustomer = JSON.parse(localStorage.getItem('customers'))
    // const nusersSeller = JSON.parse(localStorage.getItem('seller'))
    // const loggedInUser = usersCustomer.findIndex(u => u.isLoggedIn === true)
    // if (loggedInUser!=-1) {
    //     window.location.href = "/html/history.html"
    // }
    // else {
    //     window.location.href = "/html/historySeller.html"
    // }
    const users = JSON.parse(localStorage.getItem('users'));
    const loggedInUser = users.findIndex(u => u.isLoggedIn === true)
    console.log(loggedInUser);
    if(loggedInUser != -1){
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