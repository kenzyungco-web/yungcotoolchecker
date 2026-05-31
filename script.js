let bookings = [];

/* Navigation */
function showPayment() {
    hideAll();
    document.getElementById("paymentSection").style.display = "block";
}

function showBooking() {
    hideAll();
    document.getElementById("bookingSection").style.display = "block";
}

function showAdmin() {
    hideAll();
    document.getElementById("adminSection").style.display = "block";
    loadBookings();
}

function hideAll() {
    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("bookingSection").style.display = "none";
    document.getElementById("adminSection").style.display = "none";
}

/* Booking System */
function bookSession() {
    let name = document.getElementById("clientName").value;
    let date = document.getElementById("sessionDate").value;

    if (name && date) {
        bookings.push({ name, date });
        alert("Session booked successfully!");
    }
}

function loadBookings() {
    let list = document.getElementById("bookingList");
    list.innerHTML = "";

    bookings.forEach((b) => {
        list.innerHTML += `<p>${b.name} - ${b.date}</p>`;
    });
}

/* Stripe Payment (Demo Only) */
const stripe = Stripe("YOUR_STRIPE_PUBLIC_KEY"); // Replace with your key

function payNow() {
    alert("Redirecting to secure payment...");

    // Normally you call backend to create checkout session
    stripe.redirectToCheckout({
        lineItems: [{
            price: "price_id_here", // Your Stripe price ID
            quantity: 1
        }],
        mode: "subscription",
        successUrl: window.location.href,
        cancelUrl: window.location.href
    });
}
