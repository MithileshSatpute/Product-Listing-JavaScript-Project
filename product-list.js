const apiEndpoint = "https://fakestoreapi.com/products";
const productList = document.getElementById("product-list");
const sortDropdown = document.getElementById("sort-by-price");
const searchInput = document.createElement("input");
const filters = document.querySelector(".filters");

const resultsCount = document.querySelector(".results-count");

let allProducts = [];
let displayedProducts = [];
const batchSize = 10; 
let currentIndex = 0;

searchInput.type = "text";
searchInput.placeholder = "Search products...";
searchInput.classList.add("search-bar");
filters.appendChild(searchInput);

async function fetchProducts() {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) throw new Error("Failed to fetch products");
    allProducts = await response.json();
    displayProducts(allProducts.slice(0, batchSize));
    currentIndex = batchSize;
  } catch (error) {
    showErrorState(error.message);
  }
}

function displayProducts(products) {
  displayedProducts = [...displayedProducts, ...products];
  const productMarkup = products
    .map((product) => {
      return `
        <div data-id="${product.id}" class="product-card">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <div class="favorite">❤</div>
        </div>
      `;
    })
    .join("");
  productList.innerHTML += productMarkup;
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card) => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-id');
      window.location.href = `product-detail.html?id=${productId}`;
    });
  });
  updateResultsCount(displayedProducts.length);
}

function updateResultsCount(count) {
  resultsCount.textContent = `${count} Results`;
}

function loadMoreProducts() {
  if (currentIndex < allProducts.length) {
    const nextBatch = allProducts.slice(currentIndex, currentIndex + batchSize);
    displayProducts(nextBatch);
    currentIndex += batchSize;
  } else {
    document.getElementById("load-more").style.display = "none"; // Hide button if no more products
  }
}

function sortProducts(event) {
  const sortOption = event.target.value;
  const sortedProducts = [...displayedProducts].sort((a, b) => {
    return sortOption === "low-to-high"
      ? a.price - b.price
      : b.price - a.price;
  });
  productList.innerHTML = "";
  displayProducts(sortedProducts);
}

function filterProducts() {
  const checkedFilters = Array.from(
    document.querySelectorAll(".categories input:checked")
  ).map((checkbox) => checkbox.id);
  const filteredProducts = allProducts.filter((product) => {
    return checkedFilters.length
      ? checkedFilters.includes(product.category.toLowerCase())
      : true;
  });
  currentIndex = batchSize;
  displayedProducts = [];
  productList.innerHTML = "";
  displayProducts(filteredProducts.slice(0, batchSize));
}

function searchProducts(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  productList.innerHTML = "";
  displayedProducts = [];
  displayProducts(filteredProducts.slice(0, batchSize));
  currentIndex = batchSize;
}

function showLoadingState() {
  productList.innerHTML = `<p>Loading products...</p>`;
}

function hideLoadingState() {
}

function showErrorState(message) {
  productList.innerHTML = `<p class="error">${message}</p>`;
}

const cart = JSON.parse(localStorage.getItem('ProductArray')) || [];
document.getElementById('cart-items').textContent = `${cart.length}`
sortDropdown.addEventListener("change", sortProducts);
document.getElementById("load-more").addEventListener("click", loadMoreProducts);
searchInput.addEventListener("input", searchProducts);
filters.addEventListener("change", filterProducts);

fetchProducts();
