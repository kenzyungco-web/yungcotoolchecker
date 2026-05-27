// Real-Time Clock & Date
function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString();
    const date = now.toDateString();

    document.getElementById("clock").innerText = "🕒 " + time;
    document.getElementById("date").innerText = "📅 " + date;
}

setInterval(updateClock, 1000);
updateClock();


// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
}


// Go Back Button
function goBack() {
    window.history.back();
}


// Money Back Guarantee Checker
function checkGuarantee() {

    const orderDate = new Date(document.getElementById("orderDate").value);
    const guaranteeDays = parseInt(document.getElementById("guaranteeDays").value);

    const today = new Date();

    const diffTime = today - orderDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let result = "";

    if (diffDays <= guaranteeDays) {
        result = `✅ Eligible! ${guaranteeDays - diffDays} days remaining.`;
    } else {
        result = `❌ Expired ${diffDays - guaranteeDays} days ago.`;
    }

    document.getElementById("guaranteeResult").innerHTML = result;
}


// AHT Time Converter
function convertTime() {

    const seconds = parseInt(document.getElementById("secondsInput").value);

    if (isNaN(seconds)) {
        document.getElementById("timeResult").innerHTML = "⚠️ Please enter valid seconds.";
        return;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    document.getElementById("timeResult").innerHTML =
        `⏱️ ${seconds} seconds = ${minutes} minute(s) and ${remainingSeconds} second(s)`;
}


// Refund Ladder Calculator
function calculateRefunds() {

    const amount = parseFloat(document.getElementById("productAmount").value);

    if (isNaN(amount)) {
        document.getElementById("refundResult").innerHTML = "⚠️ Please enter a valid amount.";
        return;
    }

    const percentages = [15, 25, 35, 50, 75];

    let output = "💵 Refund Options:<br><br>";

    percentages.forEach(percent => {

        const refund = (amount * percent / 100).toFixed(2);

        output += `✅ ${percent}% Refund = $${refund}<br>`;
    });

    document.getElementById("refundResult").innerHTML = output;
}
