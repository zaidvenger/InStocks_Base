// portfolio.js

window.onload = function () {
  const boughtTable = document.getElementById('boughtTable');
  const soldTable = document.getElementById('soldTable');
  const cashElement = document.querySelector('h1:nth-of-type(2)');

  const bought = JSON.parse(sessionStorage.getItem('boughtStocks')) || [];
  const sold = JSON.parse(sessionStorage.getItem('soldStocks')) || [];

  let totalSpent = 0;
  let totalEarned = 0;

  bought.forEach(({ stock, price, quantity }) => {
    const row = boughtTable.insertRow();
    const total = price * quantity;
    totalSpent += total;
    row.innerHTML = `<td>${stock}</td><td>${total}</td>`;
  });

  sold.forEach(({ stock, price, quantity }) => {
    const row = soldTable.insertRow();
    const total = price * quantity;
    totalEarned += total;
    row.innerHTML = `<td>${stock}</td><td>${total}</td>`;
  });

  const initialCash = 100000;
  const cashInHand = initialCash - totalSpent + totalEarned;
  cashElement.innerText = `Cash in Hand: ₹${cashInHand}`;
};
