document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('ProductArray')) || [];
    const orderData = {
        orderNumber: "#1700834",
        shipping: {
            email: "q_farhan@gmail.com",
            phone: "+1 (555) 229-3367",
            name: "Qadim Farhan",
            address: "1098 Wapello Street, Altadena, California 91001",
            country: "United States",
        },
        shippingMethod: {
            method: "Standard Shipping",
            cost: "FREE (4-8 business days)",
        },
        payment: {
            method: "Credit Card",
            details: "Visa ending in 4567",
        },
        items: cart,
        confirmationMessage:
            "You will also receive an email with the details and we will let you know when your order has shipped.",
    };

    console.log('orderData--', orderData)
    document.getElementById('order-number').textContent = orderData.orderNumber;

    document.getElementById('shipping-email').textContent = orderData.shipping.email;
    document.getElementById('shipping-phone').textContent = orderData.shipping.phone;
    document.getElementById('shipping-name').textContent = orderData.shipping.name;
    document.getElementById('shipping-address').textContent = orderData.shipping.address;
    document.getElementById('shipping-country').textContent = orderData.shipping.country;

    document.getElementById('shipping-method').textContent = orderData.shippingMethod.method;
    document.getElementById('shipping-cost').textContent = orderData.shippingMethod.cost;

    document.getElementById('payment-method').textContent = orderData.payment.method;
    document.getElementById('payment-details').textContent = orderData.payment.details;
    document.getElementById('item-length').textContent = `${orderData.items.length} Items in your order`;

    const itemsContainer = document.getElementById('items-container');


    orderData.items.forEach(item => {
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

    document.getElementById('cart-items').textContent = `${cart.length}`
    document.getElementById('email-confirmation').textContent = orderData.confirmationMessage;
});
