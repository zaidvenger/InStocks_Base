// login.js
function login() {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }
    const validUsers = Array.from({ length: 20 }, (_, i) => `user${i + 1}`).concat("admin1");
    if (!validUsers.includes(username)) {
        alert("Invalid username.");
        return;
    }
    sessionStorage.setItem("currentUser", username);
    window.location.href = "index.html";
}
