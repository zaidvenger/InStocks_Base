window.onload = function () {
    const boughtTable = document.getElementById('boughtTable');
    const soldTable = document.getElementById('soldTable');
  
    const bought = JSON.parse(sessionStorage.getItem('boughtStocks')) || [];
    const sold = JSON.parse(sessionStorage.getItem('soldStocks')) || [];
  
    bought.forEach(({ stock, price, quantity }) => {
      const row = boughtTable.insertRow();
      row.innerHTML = `<td>${stock}</td><td>${price*quantity}</td>`;
    });
  
    sold.forEach(({ stock, price, quantity }) => {
      const row = soldTable.insertRow();
      row.innerHTML = `<td>${stock}</td><td>${price*quantity}</td>`;
    });
  };
  