document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  
  let currentIndex = 0;

  const updateSliderPosition = () => {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  next.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSliderPosition();
  });

  prev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1; 
    }
    updateSliderPosition();
  });
});

const womenButton = document.getElementById("women");
womenButton.addEventListener("click", function () {
  window.location.href = "product-list.html"; 
});

const menButton = document.getElementById("men");
menButton.addEventListener("click", function () {
  window.location.href = "product-list.html"; 
});

const jewelleryButton = document.getElementById("jewellery");
jewelleryButton.addEventListener("click", function () {
  window.location.href = "product-list.html"; 
});
const electronicsButton = document.getElementById("electronic");
electronicsButton.addEventListener("click", function () {
  window.location.href = "product-list.html"; 
});
const shopNowButton = document.getElementById("shop-now");
shopNowButton.addEventListener("click", function () {
  window.location.href = "product-list.html"; 
});

const cart = JSON.parse(localStorage.getItem('ProductArray')) || [];
document.getElementById('cart-items').textContent = `${cart.length}`