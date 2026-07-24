//!Fetching Individual Category Data
let categoryDatas = JSON.parse(localStorage.getItem("clickedCategoryData"))
let categoryName = sessionStorage.getItem("clickedCategory")

let categoryImage = categoryDatas[0].thumbnail
let headerOne = document.getElementById("header-one")
headerOne.innerHTML = `
<img src=${categoryImage} alt=${categoryName} height=100 width=100>
`
let headerTwo = document.getElementById("header-two")
headerTwo.innerHTML = `
<h2>${categoryDatas[0].category.replace("-", " ")}</h2>
<p>${categoryDatas.length} products . Delivered in 10 minutes</p>
`

//!Displaying Category Items
let originalDatas = JSON.parse(localStorage.getItem("clickedCategoryData"))
let productDatas = [...originalDatas]
let sidebarTwo = document.getElementById("sidebar-two")
function displayingProducts(products) {
  sidebarTwo.innerHTML = ""
  products.forEach((item) => {
    sidebarTwo.innerHTML += `
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
displayingProducts(productDatas)

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

//!FILTER FUNCTIONALITY
let relevance = document.getElementById("relevance")
let priceAsc = document.getElementById("priceAsc")
let priceDesc = document.getElementById("priceDesc")
let discount = document.getElementById("discount")
let maxPriceAmount = document.querySelector("#max-price-heading>span")
let maxPrice = document.getElementById("max-price")
let inStock = document.getElementById("inStock")

function applyingFilters() {
  let filteredProducts = [...originalDatas]
  if (priceAsc.checked) {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (priceDesc.checked) {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (discount.checked) {
    filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage)
  } else {
    filteredProducts = [...filteredProducts]
  }

  //*Price Range
  filteredProducts = filteredProducts.filter((item) => {
    return (item.price <= maxPrice.value)
  })

  //*In Stock
  if (inStock.checked) {
    filteredProducts = filteredProducts.filter((item) => {
      return item.stock > 0
    })
  }
  displayingProducts(filteredProducts)
}

relevance.addEventListener("change", applyingFilters)
priceAsc.addEventListener("change", applyingFilters)
priceDesc.addEventListener("change", applyingFilters)
discount.addEventListener("change", applyingFilters)
inStock.addEventListener("change", applyingFilters)
maxPrice.addEventListener("input", () => {
  maxPriceAmount.innerHTML = maxPrice.value
  applyingFilters()
})
applyingFilters()