// utils.js

// Constants
const INITIAL_BALANCE = 100000;

// Storage functions - using localStorage instead of sessionStorage for persistence
function getUser() {
    return localStorage.getItem("currentUser");
}

function setUser(username) {
    localStorage.setItem("currentUser", username);
}

function removeUser() {
    localStorage.removeItem("currentUser");
}

function getUserData(user) {
    return JSON.parse(localStorage.getItem(user)) || { bought: [], sold: [] };
}

function saveUserData(user, data) {
    localStorage.setItem(user, JSON.stringify(data));
}

// Calculates portfolio balance for any user
function calculateBalance(user) {
    const data = getUserData(user);
    let totalSpent = data.bought.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    let totalEarned = data.sold.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    return INITIAL_BALANCE - totalSpent + totalEarned;
}

// Check if user has enough balance to make a purchase
function canAffordPurchase(user, cost) {
    return calculateBalance(user) >= cost;
}

// Check if user has enough of a specific stock to sell
function getAvailableStockQuantity(user, stockName) {
    const userData = getUserData(user);

    const totalBought = userData.bought
        .filter(entry => entry.stock === stockName)
        .reduce((sum, entry) => sum + parseInt(entry.quantity), 0);

    const totalSold = userData.sold
        .filter(entry => entry.stock === stockName)
        .reduce((sum, entry) => sum + parseInt(entry.quantity), 0);

    return totalBought - totalSold;
}

// Common logout function
function logout() {
    removeUser();
    window.location.href = "login.html";
}

// Initialize user info on page load
function initPage() {
    const user = getUser();
    if (!user) {
        window.location.href = "login.html";
        return false;
    }

    const userInfoElement = document.getElementById("userInfo");
    if (userInfoElement) {
        userInfoElement.innerText = `Logged in as: ${user}`;
    }
    return true;
}

// Validate numeric input
function isValidNumber(value) {
    return !isNaN(value) && value > 0;
}

// Format currency
function formatCurrency(amount) {
    return `AED${amount.toLocaleString()}`;
}

// Show confirmation dialog
function confirmAction(message) {
    return confirm(message);
}
