//!Fetch Address Functionality
let userLocation = document.getElementById("location")
userLocation.addEventListener("click", () => {
  userLocation.innerHTML = "Fetching Loaction..."
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let locationApi = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
    let fetchingArea = async () => {
      let response = await fetch(locationApi)
      let { address: { suburb, city } } = await response.json()
      userLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${suburb}, ${city}`
    }
    fetchingArea()
  })
})

//!Displaying All Products
let allProducts = []
async function displayingProducts() {
  let response = await fetch("https://dummyjson.com/products?limit=194")
  let { products } = await response.json()
  allProducts = products
  renderProducts(allProducts)
  let searchBar = document.querySelector("#products-section-1>input")
  searchBar.addEventListener("input", (e) => {
    let searchValue = e.target.value.trim().toLowerCase()
    let filteredProducts = allProducts.filter((item) => {
      return item.title.trim().toLowerCase().includes(searchValue)
    })
    renderProducts(filteredProducts)
  })
}
displayingProducts()

function renderProducts(products) {
  let productsSection = document.getElementById("products-section-2")
  productsSection.innerHTML=""
  products.forEach((item) => {
    productsSection.innerHTML += `
    <article class="product-cards">
        <div class="product-card-one">
          <p class="discount-percentage">${item.discountPercentage}% Off</p>
          <img src=${item.thumbnail} alt=${item.title}>
          <p class="wishlist"><i class="fa-solid fa-heart"></i></p>
        </div>
        <div class="product-card-two">
          <p class="delivery-time">⚡ ${Math.floor(Math.random() * (10 - 5 + 1)) + 5}Mins</p>
          <p class="product-title">${item.title}</p>
          <p class="product-brand">${item.brand || "Imported"}</p>
          <div class="product-price">
            <p class="discount-price">$${Math.ceil(item.price - (item.price * item.discountPercentage / 100))}</p>
            <p class="actual-price">$${item.price}</p>
            <button class="addBtn">Add</button>
          </div>
          <p class="ratings"><i class="fa-solid fa-star"></i> ${item.rating} (${item.stock})</p>
        </div>
      </article>
    `
  })
  wishlistIcons()
}

//! Wishlist
function wishlistIcons() {
  let wishListIcons = document.querySelectorAll(".wishlist>i")
  wishListIcons.forEach((item) => {
    console.log(item)
    item.addEventListener("click", () => {
      item.classList.toggle("clicked")
    })
  })
}