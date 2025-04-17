// login.js
function login() {
    const id = parseInt(document.getElementById("portfolioId").value);
    if (id >= 1 && id <= 20) {
        sessionStorage.setItem("currentUser", `user${id}`);
        window.location.href = "index.html";
    } else {
        alert("Please enter a valid ID between 1 and 20.");
    }
}
