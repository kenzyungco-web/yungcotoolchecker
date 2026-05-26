// PAGE NAVIGATION
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

// DARK MODE
const darkToggle = document.getElementById("darkModeToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkToggle.innerHTML = "☀️ Light Mode";
  } else {
    darkToggle.innerHTML = "🌙 Dark Mode";
  }
});

// REFRESH BUTTON
document.getElementById("refreshPage").addEventListener("click", () => {
  location.reload();
});

// AUTO TODAY DATE
const today = new Date().toISOString().split("T")[0];
document.getElementById("todayDate").value = today;

// MONEY BACK GUARANTEE
function checkGuarantee() {
  const orderDate = new Date(document.getElementById("orderDate").value);
  const guaranteeDays = parseInt(document.getElementById("guaranteeDays").value);
  const todayDate = new Date(document.getElementById("todayDate").value);

  if (!orderDate || !guaranteeDays || !todayDate) {
    alert("Please fill all fields.");
    return;
  }

  const expirationDate = new Date(orderDate);
  expirationDate.setDate(expirationDate.getDate() + guaranteeDays);

  const daysUsed = Math.floor((todayDate - orderDate) / (1000 * 60 * 60 * 24));
  const remaining = Math.floor((expirationDate - todayDate) / (1000 * 60 * 60 * 24));

  let status = "";

  if (remaining >= 0) {
    status = `✅ Refund Eligible\nDays Remaining: ${remaining}`;
  } else {
    status = `❌ Guarantee Expired\nExpired By: ${Math.abs(remaining)} days`;
  }

  document.getElementById("guaranteeResult").innerText =
`📅 Order Date: ${formatDate(orderDate)}
🛡️ Guarantee Days: ${guaranteeDays}
⌛ Days Used: ${daysUsed}
📌 Expiration Date: ${formatDate(expirationDate)}

${status}`;
}

// DISCOUNT CALCULATOR
function calculateDiscounts() {
  const amount = parseFloat(document.getElementById("discountAmount").value);

  if (!amount) {
    alert("Enter amount.");
    return;
  }

  const discounts = [10, 35, 50, 70, 75];

  let output = "";

  discounts.forEach(d => {
    const discountAmount = amount * (d / 100);
    const finalPrice = amount - discountAmount;

    output += `🔥 ${d}% Discount
Discount Amount: $${discountAmount.toFixed(2)}
Final Price: $${finalPrice.toFixed(2)}

`;
  });

  document.getElementById("discountResult").innerText = output;
}

// BUSINESS DAYS FUNCTION
function addBusinessDays(date, days) {
  const result = new Date(date);
  let added = 0;

  while (added < days) {
    result.setDate(result.getDate() + 1);

    const day = result.getDay();

    if (day !== 0 && day !== 6) {
      added++;
    }
  }

  return result;
}

// REFUND TIMEFRAME
function calculateRefundWindow() {
  const refundDate = new Date(document.getElementById("refundDate").value);
  const range = document.getElementById("refundRange").value;

  if (!refundDate || range === "") {
    alert("Please complete the fields.");
    return;
  }

  const [minDays, maxDays] = range.split("-").map(Number);

  const fromDate = addBusinessDays(refundDate, minDays);
  const toDate = addBusinessDays(refundDate, maxDays);

  document.getElementById("refundResult").innerText =
`📦 Expected Refund Processing Window

From: ${formatDate(fromDate)}
To: ${formatDate(toDate)}`;
}

// AHT CONVERTER
function convertTime() {
  const totalSeconds = parseInt(document.getElementById("secondsInput").value);

  if (isNaN(totalSeconds)) {
    alert("Enter seconds.");
    return;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("ahtResult").innerText =
`⏱️ Time Converted

Hours: ${hours}
Minutes: ${minutes}
Seconds: ${seconds}`;
}

// NOTATION TEMPLATES
function loadTemplate(type) {
  const textarea = document.getElementById("notationText");

  if (type === 1) {
    textarea.value = `Agent Name: 
REASON FOR CALLING: 
OFFER SAVE: 
THREAT: 
RESOLUTION: 
ACCOUNT STATUS:`;
  }

  if (type === 2) {
    textarea.value = `AGENT:
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
    textarea.value = `FOR NO ACCOUNT FOUND
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

// COPY BUTTON
function copyNotation() {
  const textarea = document.getElementById("notationText");

  textarea.select();
  textarea.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(textarea.value);

  alert("Copied to clipboard!");
}

// FORMAT DATE
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
