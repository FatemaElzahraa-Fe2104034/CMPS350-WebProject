const customersURL = "../json/customers.json";

let customers = [];

const loginFORM = document.querySelector("#login-form");


loginFORM.addEventListener('submit', handleLogin);

// Add event listener to load the customers
document.addEventListener('DOMContentLoaded', async () => {
    try {
<<<<<<< Updated upstream

        customers = JSON.parse(localStorage.getItem('customers'))
=======
        // Fetch the data since it's not in Local Storage
        const response = await fetch(customersURL);
        customers = await response.json();
        
        // Store the fetched data in Local Storage
        localStorage.setItem('customers', JSON.stringify(customers));
        
        console.log(customers);
>>>>>>> Stashed changes
    
    } catch (error) {
        console.error("Failed to load customers:", error);
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
    const userExists = customers.find(c => c.username === user.username);
    if (!userExists) {
        alert(`The username does not exist.`);
        return;
    } else {
        if (userExists.password === user.password) {
            // alert(`Login successful.`);
            userExists.isLoggedIn = true
            localStorage.setItem('customers', JSON.stringify(customers));

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
