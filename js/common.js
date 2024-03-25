let loginLINK;
let categoryLINK;
let categoryDD;

document.addEventListener('DOMContentLoaded', function() {
    insertCommonElements();
});

async function insertCommonElements() {
    await loadElement("header", "/html/common/header.html")
    await loadElement("nav", "/html/common/nav.html")
    categoryLINK = document.querySelector("#categories")
    loginLINK = document.querySelector("#login")
    categoryDD = document.querySelector("#dropdown-content")
    
    updateLoginLink()
    categoryLINK.addEventListener("click", showCategoriesDROPDOWN)
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
