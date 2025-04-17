// portfolio.js

window.onload = function () {
    const boughtTable = document.getElementById("boughtTable");
    const soldTable = document.getElementById("soldTable");
    const cashElement = document.querySelector("h1:nth-of-type(2)");
    const userDiv = document.getElementById("userInfo");

    const currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    userDiv.innerText = `Logged in as: ${currentUser}`;

    const userData = JSON.parse(sessionStorage.getItem(currentUser)) || { bought: [], sold: [] };

    let totalSpent = 0;
    let totalEarned = 0;

    userData.bought.forEach(({ stock, price, quantity }) => {
        const row = boughtTable.insertRow();
        const total = price * quantity;
        totalSpent += total;
        row.innerHTML = `<td>${stock}</td><td>${total}</td>`;
    });

    userData.sold.forEach(({ stock, price, quantity }) => {
        const row = soldTable.insertRow();
        const total = price * quantity;
        totalEarned += total;
        row.innerHTML = `<td>${stock}</td><td>${total}</td>`;
    });

    const initialCash = 100000;
    const cashInHand = initialCash - totalSpent + totalEarned;
    cashElement.innerText = `Cash in Hand: AED${cashInHand}`;
};

function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
