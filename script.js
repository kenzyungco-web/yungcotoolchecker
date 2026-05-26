/* CLOCK */

function updateClock(){

  const now = new Date();

  document.getElementById("clock").innerHTML =
    now.toLocaleTimeString();
}

setInterval(updateClock,1000);

updateClock();

/* DARK MODE */

document
.getElementById("darkBtn")
.onclick = function(){

  document.body.classList.toggle("dark");
};

/* MONEYBACK CHECKER */

function checkGuarantee(){

  const purchase =
    document.getElementById("purchaseDate").value;

  const days =
    parseInt(document.getElementById("days").value);

  const result =
    document.getElementById("guaranteeResult");

  if(!purchase || !days){

    result.innerHTML =
      "Please fill all fields";

    return;
  }

  const purchaseDate = new Date(purchase);

  const expiry = new Date(purchaseDate);

  expiry.setDate(expiry.getDate() + days);

  const today = new Date();

  if(today <= expiry){

    result.innerHTML =
      `<span style="color:lightgreen">
      Eligible for Refund
      </span>`;

  }else{

    result.innerHTML =
      `<span style="color:red">
      Guarantee Expired
      </span>`;
  }
}

/* AHT CONVERTER */

function convertTime(){

  const seconds =
    parseInt(document.getElementById("seconds").value);

  const result =
    document.getElementById("timeResult");

  if(isNaN(seconds)){

    result.innerHTML =
      "Enter valid seconds";

    return;
  }

  const minutes =
    (seconds/60).toFixed(2);

  const hours =
    (seconds/3600).toFixed(2);

  const hh =
    String(Math.floor(seconds/3600))
    .padStart(2,"0");

  const mm =
    String(Math.floor((seconds%3600)/60))
    .padStart(2,"0");

  const ss =
    String(seconds%60)
    .padStart(2,"0");

  result.innerHTML = `
    <p>Minutes: ${minutes}</p>
    <p>Hours: ${hours}</p>
    <p>HH:MM:SS: ${hh}:${mm}:${ss}</p>
  `;
}

/* REFUND CALCULATOR */

function calculateRefund(){

  const price =
    parseFloat(document.getElementById("price").value);

  const percent =
    parseFloat(document.getElementById("percent").value);

  const fee =
    parseFloat(document.getElementById("fee").value);

  const result =
    document.getElementById("refundResult");

  if(isNaN(price) || isNaN(percent) || isNaN(fee)){

    result.innerHTML =
      "Please fill all fields";

    return;
  }

  const refund =
    (price * percent / 100) - fee;

  result.innerHTML = `
    <h3>Final Refund</h3>
    <p>$${refund.toFixed(2)}</p>
  `;
}

/* PRODUCT DATA */

const products = [

  {
    id:"P1001",
    name:"Wireless Mouse",
    category:"Accessories",
    warranty:"1 Year",
    refund:"30 Days",
    price:"$25"
  },

  {
    id:"P1002",
    name:"Gaming Keyboard",
    category:"Gaming",
    warranty:"2 Years",
    refund:"15 Days",
    price:"$80"
  }

];

/* SEARCH PRODUCT */

function searchProduct(){

  const query =
    document.getElementById("productSearch")
    .value
    .toLowerCase();

  const result =
    document.getElementById("productResult");

  const found =
    products.find(product =>

      product.id.toLowerCase() === query ||

      product.name.toLowerCase().includes(query)
    );

  if(found){

    result.innerHTML = `
      <h3>${found.name}</h3>
      <p>Category: ${found.category}</p>
      <p>Warranty: ${found.warranty}</p>
      <p>Refund Policy: ${found.refund}</p>
      <p>Price: ${found.price}</p>
    `;

  }else{

    result.innerHTML =
      "Product not found";
  }
}
