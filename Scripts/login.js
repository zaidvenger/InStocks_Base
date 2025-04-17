// login.js

// Initialize user accounts if they don't exist
function initializeUserAccounts() {
    // Create regular users
    for (let i = 1; i <= 20; i++) {
        const userId = `user${i}`;
        if (!localStorage.getItem(`${userId}_auth`)) {
            // Store authentication info - in a real app, passwords would be hashed
            localStorage.setItem(`${userId}_auth`, JSON.stringify({
                username: userId,
                password: userId, // Default password same as username
                isAdmin: false
            }));

            // Initialize user data if not exists
            if (!localStorage.getItem(userId)) {
                saveUserData(userId, { bought: [], sold: [] });
            }
        }
    }

    // Create admin account
    if (!localStorage.getItem('admin1_auth')) {
        localStorage.setItem('admin1_auth', JSON.stringify({
            username: 'admin1',
            password: 'admin1',
            isAdmin: true
        }));
    }
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    // Hide after 3 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

// Login function
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Validate inputs
    if (!username || !password) {
        showError("Please enter both username and password.");
        return;
    }

    // Get user auth data
    const authData = localStorage.getItem(`${username}_auth`);

    if (!authData) {
        showError("Invalid username.");
        return;
    }

    const userData = JSON.parse(authData);

    // Check password
    if (userData.password !== password) {
        showError("Incorrect password.");
        return;
    }

    // Set current user
    setUser(username);

    // Redirect to home page
    window.location.href = "index.html";
}

// Initialize on page load
window.onload = function() {
    // Initialize user accounts
    initializeUserAccounts();

    // Add enter key support
    document.getElementById("password").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            login();
        }
    });
};
