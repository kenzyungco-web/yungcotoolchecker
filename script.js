// DARK MODE
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// AUTO FILL TODAY DATE
window.onload = () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("todayDate").value = today;
  setInterval(updateClock, 1000);
};

// CLOCK
function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleString();
}

// MONEY BACK GUARANTEE
function checkGuarantee() {
  const order = new Date(document.getElementById("orderDate").value);
  const days = parseInt(document.getElementById("guaranteedDays").value);
  const today = new Date(document.getElementById("todayDate").value);

  if (!order || !days) return;

  const limit = new Date(order);
  limit.setDate(limit.getDate() + days);

  const result = today <= limit
    ? "✅ Still within guarantee period"
    : "❌ Guarantee expired";

  document.getElementById("guaranteeResult").innerText = result;
}

// DISCOUNT CALCULATOR
function calcDiscount() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (!amount) return;

  const rates = [10, 35, 50, 70, 75];
  let output = "";

  rates.forEach(r => {
    const discount = (amount * r) / 100;
    const final = amount - discount;
    output += `${r}% → Discount: ${discount.toFixed(2)} | Final: ${final.toFixed(2)}\n`;
  });

  document.getElementById("discountResult").innerText = output;
}

// REFUND TRACKER (BUSINESS DAYS ONLY)
function addBusinessDays(startDate, days) {
  let date = new Date(startDate);
  let count = 0;

  while (count < days) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) count++;
  }

  return date;
}

function calcRefund() {
  const start = document.getElementById("refundDate").value;
  const range = parseInt(document.getElementById("refundRange").value);

  if (!start) return;

  const from = addBusinessDays(start, 3);
  const to = addBusinessDays(start, range);

  document.getElementById("refundResult").innerText =
    `From: ${from.toDateString()} \nTo: ${to.toDateString()}`;
}

// AHT CONVERTER
function convertTime() {
  let sec = parseInt(document.getElementById("seconds").value);
  if (!sec && sec !== 0) return;

  const h = Math.floor(sec / 3600);
  sec %= 3600;
  const m = Math.floor(sec / 60);
  const s = sec % 60;

  document.getElementById("ahtResult").innerText =
    `${h}h ${m}m ${s}s`;
}

// PARCEL TRACKER (SIMULATED)
function trackParcel() {
  const tracking = document.getElementById("trackingNumber").value;

  if (!tracking) return;

  const fakeStatus = [
    "In Transit 🚚",
    "Out for Delivery 📦",
    "Arrived at Sorting Center 🏢",
    "Delivered ✅"
  ];

  const status = fakeStatus[Math.floor(Math.random() * fakeStatus.length)];

  document.getElementById("parcelResult").innerText =
    `Tracking #: ${tracking}\nStatus: ${status}`;
}
