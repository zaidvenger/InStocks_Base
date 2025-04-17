// leaderboard.js

// Load leaderboard data
function loadLeaderboard() {
    const table = document.getElementById("leaderboardTable");
    const currentUserHighlight = document.getElementById("currentUserRank");
    const users = [];
    const currentUser = getUser();

    // Clear existing table rows except header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Get all user balances
    for (let i = 1; i <= 20; i++) {
        const userId = `user${i}`;
        const balance = calculateBalance(userId);
        const userData = getUserData(userId);

        // Calculate transaction count
        const transactions = userData.bought.length + userData.sold.length;

        users.push({ userId, balance, transactions });
    }

    // Sort by balance (highest first)
    users.sort((a, b) => b.balance - a.balance);

    // Find current user's rank
    const currentUserRank = users.findIndex(user => user.userId === currentUser) + 1;

    // Display users in table
    users.forEach(({ userId, balance, transactions }, index) => {
        const rank = index + 1;
        const isCurrentUser = userId === currentUser;

        const row = table.insertRow();

        // Highlight current user
        if (isCurrentUser) {
            row.className = "current-user-row";
        }

        row.innerHTML = `
            <td>${rank}</td>
            <td>${userId}</td>
            <td>${formatCurrency(balance)}</td>
            <td>${transactions}</td>
        `;
    });

    // Update current user rank display
    if (currentUserRank > 0) {
        currentUserHighlight.textContent = `Your current rank: ${currentUserRank} of 20`;
    }
}

// Initialize page
window.onload = function () {
    // Check if user is logged in
    if (!initPage()) {
        return;
    }

    // Load leaderboard
    loadLeaderboard();
};
