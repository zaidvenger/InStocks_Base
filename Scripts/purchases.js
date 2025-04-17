// purchases.js

function buyStock() {
    const stock = document.getElementById("stockSelect").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    const currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const userData = JSON.parse(sessionStorage.getItem(currentUser)) || { bought: [], sold: [] };
    userData.bought.push({ stock, price, quantity });
    sessionStorage.setItem(currentUser, JSON.stringify(userData));

    showPopup(`Successfully bought ${quantity} of ${stock} at AED${price}`);
}

function sellStock() {
    const stock = document.getElementById("stockSelect").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const toUser = document.getElementById("sellToUser").value;

    const currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    const sellerData = JSON.parse(sessionStorage.getItem(currentUser)) || { bought: [], sold: [] };
    const buyerData = JSON.parse(sessionStorage.getItem(toUser)) || { bought: [], sold: [] };

    const totalBought = sellerData.bought
        .filter((entry) => entry.stock === stock)
        .reduce((sum, entry) => sum + parseInt(entry.quantity), 0);

    const totalSold = sellerData.sold
        .filter((entry) => entry.stock === stock)
        .reduce((sum, entry) => sum + parseInt(entry.quantity), 0);

    const available = totalBought - totalSold;

    if (quantity > available) {
        showPopup(`Cannot sell ${quantity} of ${stock}. You only have ${available} available.`);
        return;
    }

    // Record in seller's sold list
    sellerData.sold.push({ stock, price, quantity });
    sessionStorage.setItem(currentUser, JSON.stringify(sellerData));

    // Record in buyer's bought list
    buyerData.bought.push({ stock, price, quantity });
    sessionStorage.setItem(toUser, JSON.stringify(buyerData));

    showPopup(`Successfully sold ${quantity} of ${stock} to ${toUser} at AED${price}`);
}

function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
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

window.onload = () => {
    const currentUser = sessionStorage.getItem("currentUser");
    const userDiv = document.getElementById("userInfo");
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }
    userDiv.innerText = `Logged in as: ${currentUser}`;

    const sellToDropdown = document.getElementById("sellToUser");
    for (let i = 1; i <= 20; i++) {
        const id = `user${i}`;
        if (id !== currentUser) {
            const option = document.createElement("option");
            option.value = id;
            option.text = id;
            sellToDropdown.add(option);
        }
    }
};
