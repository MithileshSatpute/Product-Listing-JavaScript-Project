document.addEventListener("DOMContentLoaded", () => {
    const productDetailElement = document.getElementById("product-detail");
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        productDetailElement.innerHTML = "<p>Product not found.</p>";
        return;
    }

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            return response.json();
        })
        .then((product) => {
            localStorage.setItem("currentProduct", JSON.stringify(product));
            const productImage = product.image || "default-image.jpg";
            const productImages = Array(5).fill(productImage); 
            productDetailElement.innerHTML = `
            
        <div class="product-detail-container">  
        
        <div class="product-gallery">
            <div class="gallery-thumbnails">
              ${productImages
                    .map(
                        (image, index) =>
                            `<img src="${image}" alt="Thumbnail ${index + 1}" class="thumbnail ${index === 0 ? "active" : ""
                            }">`
                    )
                    .join("")}
            </div>
            <div class="main-image">
              <img src="${productImage}" alt="${product.title}" id="main-image">
            </div>
          </div>
          <div class="product-info">
          <div class="breadcrumb">
            <a href="#">Clothing</a><a href="#">Women's</a><a href="#">Outerwear</a>
        </div>
            <h1 class="product-title">${product.title || "Unknown Product"}</h1>
            <p class="product-price">$${product.price?.toFixed(2) || "N/A"}</p>
            <div class="rating">
              <span>${"★".repeat(Math.floor(product.rating?.rate || 0))}${"☆".repeat(
                        5 - Math.floor(product.rating?.rate || 0)
                    )}</span>
              <a href="#">(${product.rating?.count || 0})</a>
            </div>
            <p class="product-description">${product.description || "No description available."}</p>
           
            <div class="quantity-section">
            <p class="product-description-quantity">Quantity</p>
            <div class="quantity-selector">
              <button id="decrease-quantity">−</button>
              <input type="text" id="quantity" min="1" value="1" readonly>
              <button id="increase-quantity">+</button>
            </div>
            <button class="btn add-to-cart" onclick="addToCart()">ADD TO CART</button>
            <div class="actions"> 
            <span onclick="saveItem()"> 
            <svg width="20" height="20" fill="currentColor"
                        class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="M8 15s-7-4.534-7-8.5S4.5 1 8 4.5 15 6.5 15 6.5 8 15 8 15z" />
                    </svg> Save </span> 
                    <span onclick="shareItem()"> 
                    <svg width="20" height="20" fill="currentColor"
                        class="bi bi-share" viewBox="0 0 16 16">
                        <path d="M13.5 1a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM11.5 1a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zM11.5 2.5a.5.5 0 0 0-.5.5v5.793l-7.146-7.147a.5.5 0 1 0-.708.708L10.293 9H4.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5z" />
                    </svg> Share </span> 
                    </div>
        
          </div>
          </div>
          
          </div>
          <div class="product-info">
            <h1 class="product-title">${product.title || "Unknown Product"}</h1>
            <p class="product-description-title">Description</p>
            <p class="product-description">${product.description || "No description available."}</p>
          </div>
          `;
            initializeQuantityControls();
            initializeThumbnailClick();
        })
        .catch((error) => {
            console.error("Error fetching product details:", error);
            productDetailElement.innerHTML = "<p>Error loading product details.</p>";
        });
});

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    let currentProduct = JSON.parse(localStorage.getItem("currentProduct"));
    if (!currentProduct) {
        console.error("No product found in localStorage.");
        return;
    }
    let cart = JSON.parse(localStorage.getItem('ProductArray')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === currentProduct.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        currentProduct.quantity = quantity;
        cart.push(currentProduct);
    }
    localStorage.setItem('ProductArray', JSON.stringify(cart));
    window.location.href = `cart.html`;
}

function initializeQuantityControls() {
    const quantityInput = document.getElementById("quantity");
    const increaseQuantity = document.getElementById("increase-quantity");
    const decreaseQuantity = document.getElementById("decrease-quantity");
    const storedQuantity = localStorage.getItem("quantity");
    quantityInput.value = storedQuantity ? parseInt(storedQuantity) : 1;

    increaseQuantity.addEventListener("click", () => {
        const newQuantity = parseInt(quantityInput.value) + 1;
        quantityInput.value = newQuantity;
        localStorage.setItem("quantity", newQuantity); 
    });

    decreaseQuantity.addEventListener("click", () => {
        const currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            quantityInput.value = newQuantity;
            localStorage.setItem("quantity", newQuantity);
        }
    });
}

function initializeThumbnailClick() {
    document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
        thumbnail.addEventListener("click", function () {
            document.querySelectorAll(".thumbnail").forEach((thumb) => {
                thumb.classList.remove("active");
            });
            this.classList.add("active");
            const mainImage = document.getElementById("main-image");
            mainImage.src = this.src;
        });
    });
}

const cart = JSON.parse(localStorage.getItem('ProductArray')) || [];
document.getElementById('cart-items').textContent = `${cart.length}`

function goBack() {
    window.history.back();
}
