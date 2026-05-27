// REALTIME CLOCK & DATE
function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString();
    const date = now.toDateString();

    document.getElementById("clock").innerText = time;
    document.getElementById("date").innerText = date;
}

setInterval(updateClock, 1000);
updateClock();


// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


// REFRESH PAGE
function refreshPage() {
    location.reload();
}


// MONEY BACK GUARANTEE CHECKER
function checkGuarantee() {

    const orderDate = new Date(document.getElementById("orderDate").value);
    const guaranteeDays = parseInt(document.getElementById("guaranteeDays").value);

    const today = new Date();

    const diffTime = today - orderDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let result = "";

    if (diffDays <= guaranteeDays) {

        const remaining = guaranteeDays - diffDays;

        result = `✅ Eligible! ${remaining} day(s) remaining 🎉`;

    } else {

        const expired = diffDays - guaranteeDays;

        result = `❌ Expired ${expired} day(s) ago`;
    }

    document.getElementById("guaranteeResult").innerHTML = result;
}


// AHT TIME CONVERTER
function convertTime() {

    const seconds = parseInt(document.getElementById("secondsInput").value);

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    document.getElementById("timeResult").innerHTML =
        `⏱️ ${seconds} seconds = ${mins} minute(s) and ${secs} second(s)`;
}


// REFUND LADDER CALCULATOR
function calculateRefunds() {

    const amount = parseFloat(document.getElementById("productAmount").value);

    const refunds = [15, 25, 35, 50, 75];

    let output = "";

    refunds.forEach(percent => {

        const value = (amount * percent / 100).toFixed(2);

        output += `
            <p>💵 ${percent}% Refund = $${value}</p>
        `;
    });

    document.getElementById("refundResult").innerHTML = output;
}


// STOPWATCH
let stopwatchInterval;
let seconds = 0;

function updateStopwatch() {

    seconds++;

    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    hrs = String(hrs).padStart(2, '0');
    mins = String(mins).padStart(2, '0');
    secs = String(secs).padStart(2, '0');

    document.getElementById("stopwatch").innerText =
        `${hrs}:${mins}:${secs}`;
}

function startStopwatch() {

    clearInterval(stopwatchInterval);

    stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function stopStopwatch() {

    clearInterval(stopwatchInterval);
}

function resetStopwatch() {

    clearInterval(stopwatchInterval);

    seconds = 0;

    document.getElementById("stopwatch").innerText =
        "00:00:00";
}
