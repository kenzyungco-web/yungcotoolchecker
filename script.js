// Set today's date auto-fill
document.getElementById("todayDate").valueAsDate = new Date();
document.getElementById("refundDate").valueAsDate = new Date();
document.getElementById("deliveryDate").valueAsDate = new Date();

// Dark mode toggle
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Money Back Guarantee Checker
function checkGuarantee() {
  let order = new Date(document.getElementById("orderDate").value);
  let days = parseInt(document.getElementById("guaranteedDays").value);
  let today = new Date(document.getElementById("todayDate").value);

  let expiry = new Date(order);
  expiry.setDate(expiry.getDate() + days);

  let result = today <= expiry ? "Within guarantee period ✅" : "Expired ❌";

  document.getElementById("guaranteeResult").innerText =
    `Expires on: ${expiry.toDateString()} | ${result}`;
}

// Discount Calculator
function calculateDiscount() {
  let amount = parseFloat(document.getElementById("amount").value);
  let discounts = [10, 35, 50, 70, 75];

  let output = "<h4>Discount Results:</h4>";

  discounts.forEach(d => {
    let discountAmt = (amount * d) / 100;
    let finalPrice = amount - discountAmt;

    output += `<p>${d}% → Discount: ${discountAmt.toFixed(2)}, Final: ${finalPrice.toFixed(2)}</p>`;
  });

  document.getElementById("discountResult").innerHTML = output;
}

// Refund Tracker (business days only)
function addBusinessDays(startDate, days) {
  let date = new Date(startDate);
  let added = 0;

  while (added < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      added++;
    }
  }
  return date;
}

function calculateRefund() {
  let start = document.getElementById("refundDate").value;
  let type = document.getElementById("refundType").value;

  let [min, max] = type.split("-").map(Number);

  let from = addBusinessDays(start, min);
  let to = addBusinessDays(start, max);

  document.getElementById("refundResult").innerText =
    `From: ${from.toDateString()} To: ${to.toDateString()}`;
}

// AHT Converter
function convertTime() {
  let sec = parseInt(document.getElementById("secondsInput").value);

  let h = Math.floor(sec / 3600);
  let m = Math.floor((sec % 3600) / 60);
  let s = sec % 60;

  document.getElementById("ahtResult").innerText =
    `${h}h ${m}m ${s}s`;
}

// Parcel Tracker
function trackParcel() {
  let address = document.getElementById("address").value;
  let update = document.getElementById("latestUpdate").value;
  let date = document.getElementById("deliveryDate").value;

  document.getElementById("parcelResult").innerText =
    `Delivered to ${address} on ${date}. Latest update: ${update}`;
}

// Realtime Clock
function updateClock() {
  let now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();
