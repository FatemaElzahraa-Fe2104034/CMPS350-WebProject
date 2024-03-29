
let users = [];

const loginFORM = document.querySelector("#login-form");


loginFORM.addEventListener('submit', handleLogin);

// Add event listener to load the users
document.addEventListener('DOMContentLoaded', async () => {   

    try {
        localStorage.setItem('lastSearchTerm', null);
        users = JSON.parse(localStorage.getItem('users'))
    
    } catch (error) {
        console.error("Failed to load users:", error);
    }
});

function handleLogin(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    for (const [key, value] of Object.entries(user)) {
        if (value == "") {
            alert(`Please fill in all fields.`);
            return;
        }
    }

    // Find user by username
    const userExists = users.find(c => c.username === user.username);
    if (!userExists) {
        alert(`The username does not exist.`);
        return;
    } else {
        if (userExists.password === user.password) {
            // alert(`Login successful.`);
            userExists.isLoggedIn = true
            localStorage.setItem('users', JSON.stringify(users));

            window.location.href = "../html/main.html";
        } else {
            alert(`Incorrect Password. Try Again.`);
            return;
        }
    }
}

function formToObject(form){
    const formData = new FormData(form)
    const data = {}

    for(const [key, value] of formData){
        data[key] = value
    }

    return data;
}