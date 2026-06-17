// ✅ THEME SWITCH
const themeSelect = document.getElementById("themeSelect");
const colorPicker = document.getElementById("colorPicker");

themeSelect.addEventListener("change", function () {
    document.body.className = this.value;
});

colorPicker.addEventListener("input", function () {
    document.body.style.background = this.value;
});


// ✅ MONEYBACK CHECKER
function checkEligibility() {
    const orderDateValue = document.getElementById("orderDate").value;

    if (!orderDateValue) {
        document.getElementById("mbResult").innerText = "Select a date";
        return;
    }

    const orderDate = new Date(orderDateValue);
    const validity = parseInt(document.getElementById("validity").value);
    const today = new Date();

    const diffDays = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

    if (diffDays <= validity) {
        document.getElementById("mbResult").innerText =
            "✅ Eligible (" + (validity - diffDays) + " days remaining)";
    } else {
        document.getElementById("mbResult").innerText = "❌ Not Eligible";
    }
}


// ✅ REFUND CALCULATOR
function calculateRefund() {
    const amount = parseFloat(document.getElementById("amount").value);
    const percent = parseFloat(document.getElementById("refundPercent").value);

    if (isNaN(amount)) {
        document.getElementById("refundResult").innerText = "Enter valid amount";
        return;
    }

    let refund = (amount * percent) / 100;

    document.getElementById("refundResult").innerText =
        "Refund Amount: " + refund.toFixed(2);
}


// ✅ TIME CONVERTER
function convertTime() {
    const seconds = parseInt(document.getElementById("seconds").value);

    if (isNaN(seconds)) {
        document.getElementById("timeResult").innerText = "Enter seconds";
        return;
    }

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    document.getElementById("timeResult").innerText =
        `${hrs}h ${mins}m ${secs}s`;
}


// ✅ WORLD CLOCK
function updateClock() {
    const tz = document.getElementById("timezone").value;

    const now = new Date().toLocaleString("en-US", {
        timeZone: tz,
        hour12: true
    });

    document.getElementById("clock").innerText = now;
}

setInterval(updateClock, 1000);
updateClock();
