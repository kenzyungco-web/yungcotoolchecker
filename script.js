function scrollToOrder() {
    document.getElementById("order").scrollIntoView({ 
        behavior: "smooth" 
    });
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("✅ Order submitted!\n\nPlease complete payment via selected method.\n\nContact: 09198963548");

    this.reset();
});
