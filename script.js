function scrollToPayment() {
    document.getElementById("payment").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("✅ Payment successful! Your session is booked.");
});
``
