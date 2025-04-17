// portfolio.js

// Redirect to login if not logged in
if (!sessionStorage.getItem("currentUser")) {
    window.location.href = "login.html";
}

window.onload = function () {
    const user = sessionStorage.getItem("currentUser");
    const cashElement = document.querySelector("h1:nth-of-type(2)");
    const boughtTable = document.getElementById("boughtTable");
    const soldTable = document.getElementById("soldTable");

    const portfolio = JSON.parse(sessionStorage.getItem(user)) || { bought: [], sold: [] };

    let totalSpent = 0;
    let totalEarned = 0;

    // Fill bought table
    portfolio.bought.forEach(({ stock, price, quantity }) => {
        const row = boughtTable.insertRow();
        const total = price * quantity;
        totalSpent += total;
        row.innerHTML = `
      <td>${stock}</td>
      <td>${total}</td>
    `;
    });

    // Fill sold table
    portfolio.sold.forEach(({ stock, price, quantity }) => {
        const row = soldTable.insertRow();
        const total = price * quantity;
        totalEarned += total;
        row.innerHTML = `
      <td>${stock}</td>
      <td>${total}</td>
    `;
    });

    const initialCash = 100000;
    const cashInHand = initialCash - totalSpent + totalEarned;
    cashElement.innerText = `Cash in Hand: ₹${cashInHand}`;
};
