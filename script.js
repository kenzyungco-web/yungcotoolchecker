// DOM Elements
const optionCards = document.querySelectorAll('.option-card');
const selectButtons = document.querySelectorAll('.select-btn');
const selectionDisplay = document.getElementById('selectedOption');
const selectedSummary = document.getElementById('selectedSummary');
const paymentMethods = document.querySelectorAll('.payment-method');
const payButton = document.getElementById('payButton');

// State variables
let selectedOption = null;
let selectedPaymentMethod = null;

// Option selection handlers
optionCards.forEach(card => {
    card.addEventListener('click', () => {
        const option = card.id.replace('option', '');
        selectOption(option);
    });
});

selectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const option = button.getAttribute('data-option');
        selectOption(option);
        
        // Scroll to payment section
        document.querySelector('.payment').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Payment method selection
paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        paymentMethods.forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');
        selectedPaymentMethod = method.getAttribute('data-method');
        updatePaymentButton();
    });
});

// Select option function
function selectOption(optionNumber) {
    selectedOption = optionNumber;
    
    // Remove selected class from all options
    optionCards.forEach(card => {
        card.style.borderColor = 'transparent';
        card.style.boxShadow = 'none';
    });
    
    // Add selected effect to chosen option
    const selectedCard = document.getElementById(`option${optionNumber}`);
    selectedCard.style.borderColor = '#1E90FF';
    selectedCard.style.boxShadow = '0 10px 30px rgba(30, 144, 255, 0.4)';
    
    // Update selection display
    const optionTitle = selectedCard.querySelector('.option-title').textContent;
    const price = selectedCard.getAttribute('data-price');
    
    selectionDisplay.innerHTML = `
        <div>
            <h4 style="color: #1E90FF; margin-bottom: 5px;">✓ Selected: ${optionTitle}</h4>
            <p style="color: #ffffff;">You've chosen Option ${optionNumber}. Proceed to payment below.</p>
            <p style="color: #a0a0a0; font-size: 0.9rem; margin-top: 5px;">
                <i class="fas fa-clock"></i> Click any payment method to continue
            </p>
        </div>
    `;
    
    // Update selected summary
    selectedSummary.innerHTML = `
        <div class="summary-content">
            <div class="summary-text">
                <h4>Your Selected Plan</h4>
                <p>${optionTitle}</p>
                <p style="font-size: 0.9rem; color: #a0a0a0;">
                    <i class="fas fa-info-circle"></i> Click on a payment method to proceed
                </p>
            </div>
            <div class="summary-price">$${price}</div>
        </div>
    `;
    
    // Trigger selection animation
    triggerSelectionAnimation();
}

// Trigger selection animation
function triggerSelectionAnimation() {
    const animation = document.querySelector('.selection-animation');
    animation.style.opacity = '0';
    
    setTimeout(() => {
        animation.style.transition = 'opacity 0.5s ease';
        animation.style.opacity = '1';
    }, 300);
}

// Update payment button state
function updatePaymentButton() {
    if (selectedPaymentMethod && selectedOption) {
        payButton.disabled = false;
        
        // Get payment method name
        let methodName = '';
        switch(selectedPaymentMethod) {
            case 'creditcard': methodName = 'Credit Card'; break;
            case 'paypal': methodName = 'PayPal'; break;
            case 'vendo': methodName = 'Vendo'; break;
        }
        
        // Update button text
        payButton.innerHTML = `
            <i class="fas fa-lock"></i> 
            Pay with ${methodName} 
            <i class="fas fa-arrow-right" style="margin-left: 10px;"></i>
        `;
        
        // Add pulse animation
        payButton.classList.add('pulse');
        setTimeout(() => {
            payButton.classList.remove('pulse');
        }, 1000);
    }
}

// Payment button handler
payButton.addEventListener('click', () => {
    if (!selectedPaymentMethod || !selectedOption) {
        alert('Please select both an option and a payment method');
        return;
    }
    
    // Get option details
    const selectedCard = document.getElementById(`option${selectedOption}`);
    const optionTitle = selectedCard.querySelector('.option-title').textContent;
    const price = selectedCard.getAttribute('data-price');
    
    // Get payment method name
    let methodName = '';
    switch(selectedPaymentMethod) {
        case 'creditcard': methodName = 'Credit Card'; break;
        case 'paypal': methodName = 'PayPal'; break;
        case 'vendo': methodName = 'Vendo'; break;
    }
    
    // Show processing
    const originalText = payButton.innerHTML;
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    payButton.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Show success message
        alert(`✅ Payment Successful!\n\n${optionTitle}\nAmount: $${price}\nMethod: ${methodName}\n\nThank you for joining EMONEY! Our team will contact you shortly to begin your journey to financial freedom.`);
        
        // Reset button
        payButton.innerHTML = originalText;
        payButton.disabled = false;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset selections
        selectedOption = null;
        selectedPaymentMethod = null;
        optionCards.forEach(card => {
            card.style.borderColor = 'transparent';
            card.style.boxShadow = 'none';
        });
        paymentMethods.forEach(m => m.classList.remove('selected'));
        selectionDisplay.innerHTML = '<p>No option selected yet. Choose an option above to proceed.</p>';
        selectedSummary.innerHTML = '';
    }, 2000);
});

// Auto-select first payment method
document.addEventListener('DOMContentLoaded', () => {
    // Select first payment method by default if option is selected
    setTimeout(() => {
        if (document.querySelector('.payment-method') && !selectedPaymentMethod) {
            const firstMethod = document.querySelector('.payment-method');
            firstMethod.click();
        }
    }, 1000);
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});

// Optional: Add hover effects for better UX
optionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.id.includes(`option${selectedOption}`)) {
            card.style.transform = 'translateY(-5px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.id.includes(`option${selectedOption}`)) {
            card.style.transform = 'translateY(0)';
        }
    });
});
