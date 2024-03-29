// Define variables for common DOM elements
let loginLINK;
let profileB;

// Add a listener for the DOMContentLoaded event to initialize the page once it's fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Insert common elements like header and navigation into the page
    await insertCommonElements();
    // Add an event listener to the profile button for performing profile-related checks
    profileB.addEventListener('click', profileCheck);
});

// Function to insert common elements like headers and navigation bars
async function insertCommonElements() {
    // Load and insert the header
    await loadElement("header", "/html/common/header.html");
    // Load and insert the navigation bar
    await loadElement("nav", "/html/common/nav.html");

    // Initialize DOM element references after they have been loaded into the page
    profileB = document.querySelector('#profile');
    loginLINK = document.querySelector("#login");
    // Update the login link based on user's login status
    updateLoginLink();
}

// Function to load HTML content into a specified element by its ID
async function loadElement(elementId, url) {
    const element = document.getElementById(elementId);
    if (element) {
        const response = await fetch(url);
        element.innerHTML = await response.text();
    }
}

// Function to update the login link based on the user's login status
async function updateLoginLink() {
    try {
        // Retrieve the list of users from localStorage and parse it
        let users = JSON.parse(localStorage.getItem('users'));

        // Find the index of the logged-in user
        const loggedInUser = users.findIndex(u => u.isLoggedIn == true);

        if(loggedInUser != -1) {
            // If a user is logged in, change the link to a logout option
            loginLINK.innerHTML = `<a href="#" id="loggedIn" class="login">Logout</a>`;
            
            // Add a logout event listener
            document.querySelector("#loggedIn").addEventListener('click', (e) => {
                e.preventDefault();
                handleLogout(loggedInUser);
            });
        }
        else {
            // If no user is logged in, provide a login link
            loginLINK.innerHTML = `<a href="#" id="loggedOut" class="login">Login</a>`;
            
            // Add a login event listener
            document.querySelector("#loggedOut").addEventListener('click', (e) => {
                e.preventDefault();
                handleLogin();
            });
        }
    
    } catch (error) {
        console.error("Failed to update login link:", error);
    }
}

// Function to handle user logout
function handleLogout(loggedInUser) {
    if (loggedInUser == -1) {
        alert(`The user does not exist.`);
        return;
    } else {
        // Set the user's loggedIn status to false and update localStorage
        users[loggedInUser].isLoggedIn = false;
        localStorage.setItem('users', JSON.stringify(users));

        alert("You have been successfully logged out.");
        // Refresh the login link to reflect the logout
        updateLoginLink();
    }
}

// Function to redirect the user to the login page
function handleLogin() {
    window.location.href = "/html/login.html";
}

// Function to check the user's profile type and redirect accordingly
function profileCheck() {
    // Retrieve and parse the user data from localStorage
    const users = JSON.parse(localStorage.getItem('users'));

    // Find the logged-in user
    const loggedInUser = users.findIndex(u => u.isLoggedIn === true);

    // If a user is logged in, redirect based on their type
    if(loggedInUser != -1) {
        const user = users[loggedInUser];
        if(user.type == "customer") {
            // Redirect customer users
            window.location.href = "/html/history.html";
        }
        else if(user.type == "seller") {
            // Redirect seller users
            window.location.href = "/html/historySeller.html";
        }
        else {
            alert("An error occurred");
        }
    }
    else {
        // If no user is logged in, prompt login and redirect to the login page
        alert("Login before proceeding.");
        window.location.href ="/html/login.html";
    }
}