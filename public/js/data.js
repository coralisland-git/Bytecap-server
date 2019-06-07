const getData = (symbol, start, end) =>
    fetch(`https://cors-anywhere.herokuapp.com/https://graphs2.coinmarketcap.com/currencies/${symbol}/${end}/${start}/`)
    .then(response => response.json());