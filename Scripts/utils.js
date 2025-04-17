// utils.js

// Calculates portfolio balance for any user
function calculateBalance(user) {
    const data = JSON.parse(sessionStorage.getItem(user)) || { bought: [], sold: [] };
    let totalSpent = data.bought.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    let totalEarned = data.sold.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    return 100000 - totalSpent + totalEarned;
}

const user = sessionStorage.getItem("currentUser");
if (!user) window.location.href = "login.html";
else document.getElementById("userInfo").innerText = `Logged in as: ${user}`;
function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
