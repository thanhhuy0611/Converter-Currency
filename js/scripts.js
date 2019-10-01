const exchangeRates = {
  "usd": {
    "eur": 0.91,
    "aud": 1.48,
    "krw": 1203.00,
    "vnd": 23200.70,
    "usd": 1,
  },
  "eur": {
    "usd": 1.09,
    "aud": 1.62,
    "krw": 1316.21,
    "vnd": 25383.96,
    "eur": 1,
  },
  "aud": {
    "usd": 0.68,
    "eur": 0.62,
    "krw": 813.58,
    "vnd": 15690.63,
    "aud": 1,
  },
  "krw": {
    "usd": 0.00083,
    "aud": 0.0012,
    "eur": 0.00076,
    "vnd": 19.29,
    "krw": 1,
  },
  "vnd": {
    "krw": 0.052,
    "usd": 0.000043,
    "aud": 0.000064,
    "eur": 0.000039,
    "vnd": 1,
  },
}

//---function format
function formatFunction(type, value) {
  const formatter = new Intl.NumberFormat(type, {
    currency: type,
    style: "currency"
  });
  return formatter.format(value);
}
//------------------
//---------callApi
async function callApi(amount, from, to) {
  if (from == 0 || to == 0) {
    document.getElementById('result').innerHTML = "<span style='color: red;'>Please select currency</span>";
  } else {
    let url = 'https://free.currencyconverterapi.com/api/v6/convert?q=' + from + "_" + to + '&compact=y&apiKey=a382c717dedaf2e08af5';
    let result = await fetch(url);
    let json = await result.json();
    const conversion = from + "_" + to;
    let rate = await json[conversion.toUpperCase()].val;
    console.log(rate);
    converter(amount, from, to, rate);
  }
}
//--------------------------
//---function converter
function converter(amount, from, to, rate) {
  if (amount === "") {
    document.getElementById('result').innerHTML = "<span style='color: red;'>Please input amount.</sapn>"
  }
  else if (amount >= 0) {
    const amountConverted = amount * rate;
    //----format amount converted
    const amountFormated = formatFunction(to, amountConverted);
    //----print result
    document.getElementById('result').innerHTML = amountFormated;
  } else if (amount < 0) {
    document.getElementById('result').innerHTML = "<span style='color: red;'>Amount can not less than 0</span>"
  }

}
//-------
document.getElementById('amount').addEventListener("keyup", function () {
  //----get input
  let amount = document.getElementById('amount').value;
  const from = document.getElementById('inputGroupSelect01').value;
  const to = document.getElementById('inputGroupSelect02').value;
  //----------------
  //execute functions
  callApi(amount, from, to);
})
document.getElementById('inputGroupSelect01').addEventListener("change", function () {
  //----get input
  let amount = document.getElementById('amount').value;
  const from = document.getElementById('inputGroupSelect01').value;
  const to = document.getElementById('inputGroupSelect02').value;
  //----------------
  //execute functions
  callApi(amount, from, to);
})
document.getElementById('inputGroupSelect02').addEventListener("change", function () {
  //----get input
  let amount = document.getElementById('amount').value;
  const from = document.getElementById('inputGroupSelect01').value;
  const to = document.getElementById('inputGroupSelect02').value;
  //----------------
  //execute functions
  callApi(amount, from, to);
})



