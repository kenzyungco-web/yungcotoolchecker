// Auto-fill today's date
window.onload = () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("todayDate").value = today;
  document.getElementById("refundDate").value = today;
};

// Navigation
function showSection(id) {
  const sections = document.querySelectorAll(".tool-section");

  sections.forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

// Dark Mode
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Refresh Button
document.getElementById("refreshBtn").addEventListener("click", () => {
  location.reload();
});

// Money Back Guarantee Checker
function checkGuarantee() {
  const orderDate = new Date(document.getElementById("orderDate").value);
  const guaranteeDays = parseInt(document.getElementById("guaranteeDays").value);
  const today = new Date(document.getElementById("todayDate").value);

  if (!orderDate || !guaranteeDays || !today) {
    alert("Please fill all fields.");
    return;
  }

  const expirationDate = new Date(orderDate);
  expirationDate.setDate(expirationDate.getDate() + guaranteeDays);

  const usedDays = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.floor((expirationDate - today) / (1000 * 60 * 60 * 24));

  let status = "";

  if (remainingDays >= 0) {
    status = `
      <strong>Refund Eligible ✅</strong><br>
      Days Used: ${usedDays}<br>
      Days Remaining: ${remainingDays}
    `;
  } else {
    status = `
      <strong>Guarantee Expired ❌</strong><br>
      Expired By: ${Math.abs(remainingDays)} days
    `;
  }

  document.getElementById("guaranteeResult").innerHTML = `
    ${status}<br><br>
    Expiration Date: ${expirationDate.toDateString()}
  `;
}

// Discount Calculator
function calculateDiscounts() {
  const amount = parseFloat(document.getElementById("discountAmount").value);

  if (!amount) {
    alert("Enter amount.");
    return;
  }

  const discounts = [10, 35, 50, 70, 75];

  let html = "";

  discounts.forEach(percent => {
    const discountAmount = amount * (percent / 100);
    const finalPrice = amount - discountAmount;

    html += `
      <div>
        <strong>${percent}% Discount</strong><br>
        Discount Amount: ${discountAmount.toFixed(2)}<br>
        Final Price: ${finalPrice.toFixed(2)}
        <hr>
      </div>
    `;
  });

  document.getElementById("discountResult").innerHTML = html;
}

// Refund Timeframe Tracker
function trackRefund() {
  const refundDate = new Date(document.getElementById("refundDate").value);
  const option = document.getElementById("refundOption").value;

  let minDays, maxDays;

  if (option === "3-5") {
    minDays = 3;
    maxDays = 5;
  } else {
    minDays = 7;
    maxDays = 14;
  }

  const fromDate = addBusinessDays(refundDate, minDays);
  const toDate = addBusinessDays(refundDate, maxDays);

  document.getElementById("refundResult").innerHTML = `
    <strong>Expected Processing Window</strong><br><br>
    From: ${fromDate.toDateString()}<br>
    To: ${toDate.toDateString()}
  `;
}

function addBusinessDays(date, days) {
  let result = new Date(date);
  let count = 0;

  while (count < days) {
    result.setDate(result.getDate() + 1);

    const day = result.getDay();

    if (day !== 0 && day !== 6) {
      count++;
    }
  }

  return result;
}

// AHT Converter
function convertAHT() {
  const seconds = parseInt(document.getElementById("secondsInput").value);

  if (isNaN(seconds)) {
    alert("Enter seconds.");
    return;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  document.getElementById("ahtResult").innerHTML = `
    <strong>Converted Time</strong><br><br>
    Hours: ${hours}<br>
    Minutes: ${minutes}<br>
    Seconds: ${remainingSeconds}
  `;
}
