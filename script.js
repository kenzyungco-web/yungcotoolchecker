// REALTIME CLOCK & DATE
function updateDateTime() {

  const now = new Date();

  const time = now.toLocaleTimeString();
  const date = now.toDateString();

  document.getElementById("clock").innerHTML = `🕒 ${time}`;
  document.getElementById("date").innerHTML = `📅 ${date}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();


// DARK MODE TOGGLE
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    darkModeBtn.innerHTML = "☀️ Light Mode";
  } else {
    darkModeBtn.innerHTML = "🌙 Dark Mode";
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

  const orderDate = new Date(
    document.getElementById("orderDate").value
  );

  const presentDate = new Date(
    document.getElementById("presentDate").value
  );

  const guaranteeDays = parseInt(
    document.getElementById("guaranteeType").value
  );

  const difference = presentDate - orderDate;

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  let result = "";

  if (days >= 0 && days <= guaranteeDays) {

    result = `
      ✅ Eligible <br>
      Guarantee: ${guaranteeDays} Days <br>
      Days Used: ${days} Days <br>
      Remaining: ${guaranteeDays - days} Days
    `;

  } else {

    result = `
      ❌ Expired <br>
      Guarantee: ${guaranteeDays} Days <br>
      Days Used: ${days} Days <br>
      Exceeded By: ${days - guaranteeDays} Days
    `;
  }

  document.getElementById("guaranteeResult").innerHTML = result;
}


// AHT TIME CONVERTER
function convertTime() {

  const seconds = parseInt(
    document.getElementById("secondsInput").value
  );

  if (isNaN(seconds)) {

    document.getElementById("timeResult").innerHTML =
      "⚠️ Please enter valid seconds.";

    return;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  document.getElementById("timeResult").innerHTML =
    `⏱ ${seconds} seconds = ${minutes} minute(s) and ${remainingSeconds} second(s)`;
}


// REFUND OPTION CALCULATOR
function calculateRefund() {

  const amount = parseFloat(
    document.getElementById("productAmount").value
  );

  if (isNaN(amount)) {

    document.getElementById("refundResult").innerHTML =
      "⚠️ Please enter a valid amount.";

    return;
  }

  const refundOptions = [15, 25, 35, 50, 75];

  let output = `<h3>Refund Options:</h3>`;

  refundOptions.forEach(percent => {

    const refund = (amount * percent / 100).toFixed(2);

    output += `
      <p>💰 ${percent}% Refund = $${refund}</p>
    `;
  });

  document.getElementById("refundResult").innerHTML = output;
}
