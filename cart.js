document.addEventListener("DOMContentLoaded", () => {
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

  const cartContainer = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart-message");

  //   const cart = JSON.parse(localStorage.getItem('ProductArray')) || [];
  // document.getElementById('cart-items').textContent = `${cart.length}`

  let productsArray = JSON.parse(localStorage.getItem("ProductArray"));

  if (!Array.isArray(productsArray)) {
    productsArray = [productsArray]; 
  }
  const renderCart = () => {
    cartContainer.innerHTML = ""; 

    if (productsArray.length === 0) {
      emptyCartMessage.style.display = "block"; 
      emptyCartMessage.textContent = "Your cart is empty! Start shopping now."; // User-friendly message
      return;
    }

    emptyCartMessage.style.display = "none";

    productsArray.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="product-image">
        <div class="item-details">
          <h4>${item.title}</h4>
          <p style="font-size: 12px">Size: ${item.size}</p>
          <p style="font-size: 12px">Color: ${item.color}</p>
          <p style="font-size: 12px">$${item.price.toFixed(2)}</p>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn decrease" data-id="${item.id}">−</button>
          <input type="text" value="${item.quantity}" class="quantity-input" id="quantity-${item.id}" readonly>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
        </div>
        <div class="item-actions">
          <button class="action-btn edit-item" data-id="${item.id
        }">✏ Edit item</button>
          <button class="action-btn remove-item" data-id="${item.id
        }">🗑 Remove</button>
          <button class="action-btn save-item" data-id="${item.id
        }">❤ Save for later</button>
        </div>
      `;

      cartContainer.appendChild(cartItem);
    });

    attachEventListeners(); 
  };

  const renderPricingSummary = () => {
    const pricing = calculatePricing(productsArray);
    const pricingDetails = document.getElementById("pricing-details");

    pricingDetails.innerHTML = `
      <div class="pricing-row"><span>Subtotal:</span><span>$${pricing.subtotal.toFixed(
      2
    )}</span></div>
      <div class="pricing-row"><span>Coupon:</span><span>-$${pricing.coupon.toFixed(
      2
    )}</span></div>
      <div class="pricing-row"><span>Gift Card:</span><span>-$${pricing.giftCard.toFixed(
      2
    )}</span></div>
      <div class="pricing-row"><span>Estimated Tax:</span><span>$${pricing.estimatedTax.toFixed(
      2
    )}</span></div>
      <div class="pricing-row"><span>Estimated Shipping:</span><span>FREE</span></div>
      <div class="pricing-row total-row"><span>Total:</span><span>$${pricing.total.toFixed(
      2
    )}</span></div>
      <div class = "buttonGroup">
        <button class="checkout-btn" id="checkout-btn">Checkout</button>
        <button class="paypal-btn">PayPal</button>
      </div>
    `;

    const checkoutButton = document.getElementById("checkout-btn");
    checkoutButton.addEventListener("click", checkout);
  };

  function checkout() {
    window.location.href = "checkout.html"; 
  }

  const updateQuantity = (id, delta) => {
    const item = productsArray.find((item) => item.id === id);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta); 
      renderCart(); 
      renderPricingSummary();
    }
  };

  const removeItem = (id) => {
    const itemIndex = productsArray.findIndex((item) => item.id === id);
    console.log('itemIndex--', itemIndex)

    if (itemIndex !== -1) {
      let removedItem = productsArray.splice(itemIndex, 1);
      console.log('removedItem--', removedItem)
      localStorage.setItem('ProductArray', JSON.stringify(productsArray));
      renderCart();
      renderPricingSummary();
    }
  };

  const attachEventListeners = () => {
    document.querySelectorAll(".quantity-btn.increase").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        updateQuantity(id, 1);
      });
    });

    document.querySelectorAll(".quantity-btn.decrease").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        updateQuantity(id, -1);
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        removeItem(id);
      });

    });

    document.querySelectorAll(".edit-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        window.location.href = `product-detail.html?id=${id}`;
      });
    });
  };


  // Accordion functionality
  const setupAccordion = () => {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling; 
        const isExpanded = content.classList.contains("expanded");

        document.querySelectorAll(".accordion-content").forEach((panel) => {
          panel.classList.remove("expanded");
          panel.style.maxHeight = null; 
        });

        document.querySelectorAll(".accordion-header").forEach((hdr) => {
          hdr.classList.remove("active");
        });

        if (!isExpanded) {
          content.classList.add("expanded");
          header.classList.add("active");
          content.style.maxHeight = `${content.scrollHeight}px`; // Dynamically set height
        }
      });
    });
  };

  renderCart();
  renderPricingSummary();
  setupAccordion();
});
