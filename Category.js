//!Fetching Individual Category Data
let categoryDatas = JSON.parse(localStorage.getItem("clickedCategoryData"))
let categoryName = sessionStorage.getItem("clickedCategory")
console.log(categoryName)
console.log(categoryDatas)
let categoryImage = categoryDatas[0].thumbnail
let headerOne = document.getElementById("header-one")
headerOne.innerHTML = `
<img src=${categoryImage} alt=${categoryName} height=100 width=100>
`
let headerTwo = document.getElementById("header-two")
headerTwo.innerHTML = `
<h2>${categoryDatas[0].category.replace("-"," ")}</h2>
<p>${categoryDatas.length} products . Delivered in 10 minutes</p>
`

//!Displaying Category Items
let productDatas = JSON.parse(localStorage.getItem("clickedCategoryData"))
let sidebarTwo = document.getElementById("sidebar-two")
productDatas.forEach((item) => {
  sidebarTwo.innerHTML += `
  <article class="product-cards">
        <div class="product-card-one">
          <p class="discount-percentage">${item.discountPercentage}% Off</p>
          <img src=${item.thumbnail} alt=${item.title}>
          <p class="wishlist"><i class="fa-regular fa-heart"></i></p>
        </div>
        <div class="product-card-two">
          <p class="delivery-time">⚡ ${Math.floor(Math.random() * (10 - 5 + 1)) + 5}Mins</p>
          <p class="product-title">${item.title}</p>
          <p class="product-brand">${item.brand}</p>
          <div class="product-price">
            <p class="discount-price">$${Math.round(item.price - (item.price * item.discountPercentage/100))}</p>
            <p class="actual-price">$${item.price}</p>
            <button class="addBtn">Add</button>
          </div>
          <p class="ratings"><i class="fa-regular fa-star"></i>${item.rating} (${item.stock})</p>
        </div>
      </article>
  `
})