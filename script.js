// REALTIME CLOCK

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString();
    const date = now.toDateString();

    document.getElementById("clock").innerHTML = time;
    document.getElementById("date").innerHTML = date;
}

setInterval(updateClock, 1000);

updateClock();


// MONEY BACK GUARANTEE CHECKER

function checkGuarantee() {

    const orderDate = new Date(document.getElementById("orderDate").value);
    const guaranteeDays = parseInt(document.getElementById("guaranteeDays").value);

    const today = new Date();

    const diffTime = today - orderDate;

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const result = document.getElementById("guaranteeResult");

    if (diffDays <= guaranteeDays) {

        const remaining = guaranteeDays - diffDays;

        result.innerHTML =
            `✅ Eligible! ${remaining} day(s) remaining 🎉`;

        result.style.color = "lightgreen";

    } else {

        const expired = diffDays - guaranteeDays;

        result.innerHTML =
            `❌ Expired ${expired} day(s) ago`;

        result.style.color = "red";
    }
}


// AHT CONVERTER

function convertTime() {

    const seconds =
        parseInt(document.getElementById("secondsInput").value);

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    document.getElementById("convertedTime").innerHTML =
        `⏱️ ${minutes} minute(s) and ${remainingSeconds} second(s)`;
}


// REFUND LADDER CALCULATOR

function calculateRefund() {

    const amount =
        parseFloat(document.getElementById("productAmount").value);

    const percentages = [15, 25, 35, 50, 75];

    let output = "";

    percentages.forEach(percent => {

        const refund = (amount * percent / 100).toFixed(2);

        output += `
            <p>
            💵 ${percent}% Refund = ₱${refund}
            </p>
        `;
    });

    document.getElementById("refundResults").innerHTML = output;
}


// DARK MODE

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


// REFRESH

function refreshPage() {
    location.reload();
}


// STOPWATCH

let stopwatchInterval;
let elapsedSeconds = 0;

function updateStopwatch() {

    elapsedSeconds++;

    let hours = Math.floor(elapsedSeconds / 3600);
    let minutes = Math.floor((elapsedSeconds % 3600) / 60);
    let seconds = elapsedSeconds % 60;

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    document.getElementById("stopwatch").innerHTML =
        `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {

    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
    }
}

function stopStopwatch() {

    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {

    stopStopwatch();

    elapsedSeconds = 0;

    document.getElementById("stopwatch").innerHTML =
        "00:00:00";
}
