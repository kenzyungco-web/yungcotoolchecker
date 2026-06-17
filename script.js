// THEME SWITCHER
const themeSelect = document.getElementById("themeSelect");
const colorPicker = document.getElementById("colorPicker");

themeSelect.addEventListener("change", () => {
    document.body.className = themeSelect.value;
});

colorPicker.addEventListener("input", () => {
    document.body.style.background = colorPicker.value;
});

// MONEYBACK CHECKER
function checkEligibility() {
    const orderDate = new Date(document.getElementById("orderDate").value);
    const validity = parseInt(document.getElementById("validity").value);
    const today = new Date();

    const diffTime = today - orderDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays <= validity) {
        document.getElementById("mbResult").innerText = 
            "✅ Eligible (" + Math.floor(validity - diffDays) + " days left)";
    } else {
        document.getElementById("mbResult").innerText = 
            "❌ Not Eligible";
    }
}

// REFUND CALCULATOR
function calculateRefund() {
    const amount = parseFloat(document.getElementById("amount").value);
    const percent = parseFloat(document.getElementById("refundPercent").value);

    if (!amount) {
        document.getElementById("refundResult").innerText = "Enter amount";
        return;
    }

    const refund = (amount * percent) / 100;

    document.getElementById("refundResult").innerText =
        "Refund: " + refund.toFixed(2);
}

// TIME CONVERTER
function convertTime() {
    const seconds = parseInt(document.getElementById("seconds").value);

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    document.getElementById("timeResult").innerText =
        `${hrs}h ${mins}m ${secs}s`;
}

// WORLD CLOCK
function updateClock() {
    const tz = document.getElementById("timezone").value;

    const now = new Date().toLocaleString("en-US", { timeZone: tz });
    document.getElementById("clock").innerText = now;
}

setInterval(updateClock, 1000);
