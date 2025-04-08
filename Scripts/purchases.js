// purchases.js

function buyStock() {
  const stock = document.getElementById('stockSelect').value;
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value);

  const purchase = { stock, price, quantity };
  let bought = JSON.parse(sessionStorage.getItem('boughtStocks')) || [];
  bought.push(purchase);
  sessionStorage.setItem('boughtStocks', JSON.stringify(bought));

  showPopup(`Successfully bought ${quantity} of ${stock} at ${price}`);
}

function sellStock() {
  const stock = document.getElementById('stockSelect').value;
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value);

  let bought = JSON.parse(sessionStorage.getItem('boughtStocks')) || [];
  let sold = JSON.parse(sessionStorage.getItem('soldStocks')) || [];

  const totalBought = bought
    .filter(entry => entry.stock === stock)
    .reduce((sum, entry) => sum + parseInt(entry.quantity), 0);

  const totalSold = sold
    .filter(entry => entry.stock === stock)
    .reduce((sum, entry) => sum + parseInt(entry.quantity), 0);

  const available = totalBought - totalSold;

  if (quantity > available) {
    showPopup(`Cannot sell ${quantity} of ${stock}. You only have ${available} available.`);
    return;
  }

  const sale = { stock, price, quantity };
  sold.push(sale);
  sessionStorage.setItem('soldStocks', JSON.stringify(sold));

  showPopup(`Successfully sold ${quantity} of ${stock} at ${price}`);
}

function showPopup(message) {
  const popup = document.getElementById('popupModal');
  const popupMessage = document.getElementById('popupMessage');
  popupMessage.innerText = message;
  popup.style.display = 'block';
}

function closePopup() {
  document.getElementById('popupModal').style.display = 'none';
}
