// REALTIME CLOCK & DATE
function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString();
  const date = now.toDateString();

  document.getElementById("clock").innerHTML = `🕒 ${time}`;
  document.getElementById("date").innerHTML = `📅 ${date}`;
}

setInterval(updateClock, 1000);
updateClock();

// DARK MODE TOGGLE
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    darkModeToggle.innerHTML = "☀️ Light Mode";
  } else {
    darkModeToggle.innerHTML = "🌙 Dark Mode";
  }
});

// HOME BUTTON
document.getElementById("homeBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// MONEYBACK GUARANTEE CHECKER
function checkGuarantee() {
  const orderDate = new Date(document.getElementById("orderDate").value);
  const presentDate = new Date(document.getElementById("presentDate").value);

  const difference = presentDate - orderDate;
  const days = difference / (1000 * 60 * 60 * 24);

  let result = "";

  if (days <= 30 && days >= 0) {
    result = `✅ Eligible for MoneyBack Guarantee (${Math.floor(days)} days)`;
  } else {
    result = `❌ Expired (${Math.floor(days)} days)`;
  }

  document.getElementById("guaranteeResult").innerHTML = result;
}

// AHT TIME CONVERTER
function convertTime() {
  const seconds = parseInt(document.getElementById("secondsInput").value);

  if (isNaN(seconds)) {
    document.getElementById("timeResult").innerHTML = "⚠️ Please enter valid seconds.";
    return;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  document.getElementById("timeResult").innerHTML =
    `⏱ ${seconds} seconds = ${minutes} minute(s) and ${remainingSeconds} second(s)`;
}

// REFUND CALCULATOR
function calculateRefund() {
  const amount = parseFloat(document.getElementById("productAmount").value);

  if (isNaN(amount)) {
    document.getElementById("refundResult").innerHTML = "⚠️ Please enter a valid amount.";
    return;
  }

  const options = [15, 25, 35, 50, 75];

  let output = `<h3>Refund Options:</h3>`;

  options.forEach(percent => {
    const refund = (amount * percent / 100).toFixed(2);

    output += `
      <p>💰 ${percent}% Refund = $${refund}</p>
    `;
  });

  document.getElementById("refundResult").innerHTML = output;
}

// COPY NOTATIONS
function copyNotation() {
  const notation = document.getElementById("notationBox");

  notation.select();
  notation.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(notation.value);

  alert("✅ Notation copied successfully!");
}
