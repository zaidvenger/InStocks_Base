function buyStock() {
    const stock = document.getElementById('stockSelect').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
  
    const purchase = { stock, price, quantity };
    let bought = JSON.parse(sessionStorage.getItem('boughtStocks')) || [];
    bought.push(purchase);
    sessionStorage.setItem('boughtStocks', JSON.stringify(bought));
    alert(`Bought ${quantity} of ${stock} at ₹${price}`);
  }
  
  function sellStock() {
    const stock = document.getElementById('stockSelect').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
  
    const sale = { stock, price, quantity };
    let sold = JSON.parse(sessionStorage.getItem('soldStocks')) || [];
    sold.push(sale);
    sessionStorage.setItem('soldStocks', JSON.stringify(sold));
    alert(`Sold ${quantity} of ${stock} at ₹${price}`);
  }
  