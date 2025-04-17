// leaderboard.js

window.onload = function () {
    const table = document.getElementById("leaderboardTable");
    const users = [];

    for (let i = 1; i <= 20; i++) {
        const userId = `user${i}`;
        const balance = calculateBalance(userId);
        users.push({ userId, balance });
    }

    users.sort((a, b) => b.balance - a.balance);

    users.forEach(({ userId, balance }) => {
        const row = table.insertRow();
        row.innerHTML = `
        <td>${userId}</td>
        <td>${balance}</td>
      `;
    });
};

function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
