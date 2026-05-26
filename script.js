// Navigation
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Dark Mode
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Guarantee Checker
function checkGuarantee() {
  const order = new Date(document.getElementById("orderDate").value);
  const days = parseInt(document.getElementById("guaranteeDays").value);
  const today = new Date(document.getElementById("todayDate").value);

  if (!order || !today || isNaN(days)) return;

  const expiry = new Date(order);
  expiry.setDate(expiry.getDate() + days);

  const diffTime = today - order;
  const used = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let remaining = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

  let status = today <= expiry ? "Eligible for Refund" : "Not Eligible";

  document.getElementById("guaranteeOutput").innerHTML = `
    <p><b>Order Date:</b> ${order.toDateString()}</p>
    <p><b>Today:</b> ${today.toDateString()}</p>
    <p><b>Guarantee Days:</b> ${days}</p>
    <p><b>Expiry Date:</b> ${expiry.toDateString()}</p>
    <p><b>Days Used:</b> ${used}</p>
    <p><b>${remaining >= 0 ? "Days Remaining" : "Days Expired"}:</b> ${Math.abs(remaining)}</p>
    <p><b>Status:</b> ${status}</p>
  `;
}

// Discount Calculator
function calculateDiscount() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (!amount) return;

  const rates = [10, 35, 50, 70, 75];
  let html = "";

  rates.forEach(r => {
    let discount = (amount * r) / 100;
    let final = amount - discount;

    html += `<p>${r}% → Discount: ${discount.toFixed(2)}, Final: ${final.toFixed(2)}</p>`;
  });

  document.getElementById("discountOutput").innerHTML = html;
}

// Business days helper
function addBusinessDays(date, days) {
  let result = new Date(date);
  let added = 0;

  while (added < days) {
    result.setDate(result.getDate() + 1);
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      added++;
    }
  }
  return result;
}

// Refund tracker
function calculateRefund() {
  const start = new Date(document.getElementById("refundDate").value);
  const range = document.getElementById("refundRange").value.split("-");

  if (!start) return;

  const min = addBusinessDays(start, parseInt(range[0]));
  const max = addBusinessDays(start, parseInt(range[1]));

  document.getElementById("refundOutput").innerHTML = `
    <p><b>From:</b> ${min.toDateString()}</p>
    <p><b>To:</b> ${max.toDateString()}</p>
  `;
}

// AHT Converter
function convertTime() {
  let sec = parseInt(document.getElementById("secondsInput").value);
  if (isNaN(sec)) return;

  let h = Math.floor(sec / 3600);
  sec %= 3600;
  let m = Math.floor(sec / 60);
  let s = sec % 60;

  document.getElementById("ahtOutput").innerHTML =
    `<p>${h}h ${m}m ${s}s</p>`;
}

// Notation Templates
function setTemplate(type) {
  const box = document.getElementById("notationBox");

  if (type === 1) {
    box.value =
`Agent Name: 
REASON FOR CALLING: 
OFFER SAVE: 
THREAT: 
RESOLUTION: 
ACCOUNT STATUS:`;
  }

  if (type === 2) {
    box.value =
`AGENT:
REASON FOR CALLING:
THREAT: 
SAVE OFFER:
RESOLUTION:
STATUS:

campaign:
name: 
phone number: 
email address: 
order id: 
product name:`;
  }

  if (type === 3) {
    box.value =
`FOR NO ACCOUNT FOUND
Campaign: 
Order Date: 
Email: 
Name: 
Phone Number: 
Product Name: 
Tracking Number: 
Order ID:`;
  }
}

// Copy
function copyText() {
  const box = document.getElementById("notationBox");
  navigator.clipboard.writeText(box.value);
}
