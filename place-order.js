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

  const cart = JSON.parse(localStorage.getItem('ProductArray')) || [];
  document.getElementById('item-length').textContent = `${cart.length} Items in your order`;
  const itemsContainer = document.getElementById('items-container');
  cart.forEach(item => {
      const itemCard = document.createElement('div');
      itemCard.className = 'item-card';

      itemCard.innerHTML = `
       <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
              <p><strong>${item.category}</strong></p>
              <p>Size: Medium</p>
              <p>Color: Green</p>
              <p>Quantity: ${item.quantity}</p>
          </div>
          
      `;
      itemsContainer.appendChild(itemCard);
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
  }

  const placeOrderButton = document.getElementById("place-order-button");
  placeOrderButton.addEventListener("click", placeOrder);

  function placeOrder() {
    window.location.href = "order-confirmation.html"; 
  }


  renderPricingSummary();
});
