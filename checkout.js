document.addEventListener('DOMContentLoaded', () => {

  const cartData = [
    {
      id: 1,
      name: "Electric Leggings",
      size: "Medium",
      color: "Storm",
      price: 145.0,
      quantity: 2,
    },
    {
      id: 2,
      name: "Signature Sports jacket",
      size: "Medium",
      color: "Red",
      price: 98.0,
      quantity: 1,
    },
  ];

  // Expandable accordion functionality
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const panel = document.getElementById(header.dataset.panel);
      const isOpen = panel.classList.contains('open');

      document.querySelectorAll('.accordion-content').forEach(content => {
        content.classList.remove('open');
      });
      if (!isOpen) {
        panel.classList.add('open');
      } else {
        panel.classList.remove('open');
      }
    });
  });

  const inputs = document.querySelectorAll('.accordion-content input, .accordion-content select');
  inputs.forEach(input => {
    input.addEventListener('click', event => {
      event.stopPropagation();
    });
  });

  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia'];
  const states = ['California', 'Texas', 'New York', 'Florida'];
  const countrySelect = document.getElementById('country');
  const stateSelect = document.getElementById('state');

  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });

  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });

  const checkoutForm = document.getElementById('checkoutForm');

  checkoutForm.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      event.preventDefault(); 

      switch (event.target.textContent.trim()) {
        case 'CONTINUE TO SHIPPING METHOD':
          window.location.href = 'place-order.html';
          break;
        case 'CONTINUE TO PAYMENT':
          window.location.href = 'place-order.html';
          break;
        case 'CONTINUE TO REVIEW ORDER':
          window.location.href = 'place-order.html';
          break;
        default:
          console.warn('No redirection set for this button.');
      }
    }
  });

  const calculatePricing = (items) => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const coupon = 77.6; 
    const giftCard = 100.0; 
    const estimatedTax = subtotal * 0.06; 
    const estimatedShipping = 0; 
    const total = subtotal - coupon - giftCard + estimatedTax;

    return {
      subtotal,
      coupon,
      giftCard,
      estimatedTax,
      estimatedShipping,
      total,
    };
  };

  const renderPricingSummary = () => {
    const pricing = calculatePricing(cartData); 
    const pricingDetails = document.getElementById("pricing-details");

    pricingDetails.innerHTML = `
          <div class="pricing-row"><span>Subtotal:</span><span>$${pricing.subtotal.toFixed(2)}</span></div>
          <div class="pricing-row"><span>Coupon:</span><span>-$${pricing.coupon.toFixed(2)}</span></div>
          <div class="pricing-row"><span>Gift Card:</span><span>-$${pricing.giftCard.toFixed(2)}</span></div>
          <div class="pricing-row"><span>Estimated Tax:</span><span>$${pricing.estimatedTax.toFixed(2)}</span></div>
          <div class="pricing-row"><span>Estimated Shipping:</span><span>FREE</span></div>
          <div class="pricing-row total-row"><span>Total:</span><span>$${pricing.total.toFixed(2)}</span></div>
        `;

    const checkoutButton = document.getElementById("checkout-btn");
    checkoutButton.addEventListener("click", checkout);
  }

  document.getElementById('continue').addEventListener('click', function () {
    window.location.href = 'place-order.html';
  });

  document.getElementById('continue2').addEventListener('click', function () {
    window.location.href = 'place-order.html';
  });

  document.getElementById('continue3').addEventListener('click', function () {
    window.location.href = 'place-order.html';
  });

  const cart = JSON.parse(localStorage.getItem('ProductArray')) || [];
  document.getElementById('cart-items').textContent = `${cart.length}`

  renderPricingSummary();
});
