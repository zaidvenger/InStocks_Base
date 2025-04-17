// admin.js
if (sessionStorage.getItem("currentUser") !== "admin1") {
    alert("Access Denied");
    window.location.href = "index.html";
}

window.onload = function () {
    const table = document.getElementById("adminTable");
    const currentUser = sessionStorage.getItem("currentUser");
    document.getElementById("userInfo").innerText = `Logged in as: ${currentUser}`;

    for (let i = 1; i <= 20; i++) {
        const userId = `user${i}`;
        const balance = calculateBalance(userId);

        const row = table.insertRow();
        row.innerHTML = `
        <td>${userId}</td>
        <td>AED${balance}</td>
        <td><button onclick="resetUser('${userId}')">Reset</button></td>
      `;
    }
};

function resetUser(userId) {
    sessionStorage.setItem(userId, JSON.stringify({ bought: [], sold: [] }));
    alert(`Reset ${userId}`);
    location.reload();
}

function resetAllUsers() {
    for (let i = 1; i <= 20; i++) {
        sessionStorage.setItem(`user${i}`, JSON.stringify({ bought: [], sold: [] }));
    }
    alert("All users have been reset.");
    location.reload();
}

function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
