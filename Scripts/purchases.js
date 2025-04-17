// purchases.js

// Ensure user is logged in
if (!sessionStorage.getItem("currentUser")) {
    window.location.href = "login.html";
}

const user = sessionStorage.getItem("currentUser");

function getPortfolioData(key) {
    const data = JSON.parse(sessionStorage.getItem(user)) || { bought: [], sold: [] };
    return data[key] || [];
}

function setPortfolioData(key, value) {
    const data = JSON.parse(sessionStorage.getItem(user)) || { bought: [], sold: [] };
    data[key] = value;
    sessionStorage.setItem(user, JSON.stringify(data));
}

function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

function buyStock() {
    const stock = document.getElementById("stockSelect").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!stock || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
        showPopup("Please enter valid stock, price, and quantity.");
        return;
    }

    const bought = getPortfolioData("bought");
    bought.push({ stock, price, quantity });
    setPortfolioData("bought", bought);

    showPopup(`Successfully bought ${quantity} of ${stock} at ${price}`);
}

function sellStock() {
    const stock = document.getElementById("stockSelect").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const sellTo = parseInt(document.getElementById("sellToUser").value);

    if (!stock || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
        showPopup("Please enter valid stock, price, and quantity.");
        return;
    }

    const portfolio = JSON.parse(sessionStorage.getItem(user)) || { bought: [], sold: [] };

    const totalBought = portfolio.bought
        .filter((entry) => entry.stock === stock)
        .reduce((sum, entry) => sum + parseInt(entry.quantity), 0);
    const totalSold = portfolio.sold
        .filter((entry) => entry.stock === stock)
        .reduce((sum, entry) => sum + parseInt(entry.quantity), 0);
    const available = totalBought - totalSold;

    if (quantity > available) {
        showPopup(`Cannot sell ${quantity} of ${stock}. Only ${available} available.`);
        return;
    }

    portfolio.sold.push({ stock, price, quantity });
    sessionStorage.setItem(user, JSON.stringify(portfolio));

    // Selling to another portfolio
    if (
        !isNaN(sellTo) &&
        sellTo >= 1 &&
        sellTo <= 20 &&
        sellTo !== parseInt(user.replace("user", ""))
    ) {
        const targetUser = `user${sellTo}`;
        const targetPortfolio = JSON.parse(sessionStorage.getItem(targetUser)) || {
            bought: [],
            sold: [],
        };
        targetPortfolio.bought.push({ stock, price, quantity });
        sessionStorage.setItem(targetUser, JSON.stringify(targetPortfolio));
        showPopup(`Sold ${quantity} of ${stock} to Portfolio ${sellTo} at ₹${price}`);
    } else {
        showPopup(`Successfully sold ${quantity} of ${stock} at ₹${price}`);
    }
}

function showPopup(message) {
    const popup = document.getElementById("popupModal");
    const popupMessage = document.getElementById("popupMessage");
    popupMessage.innerText = message;
    popup.style.display = "block";
}

function closePopup() {
    document.getElementById("popupModal").style.display = "none";
}
