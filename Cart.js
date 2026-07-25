let CART_KEY ="cartItems"

function getCartItems(){
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
}

function saveCartItems(getCartItems){
    return localStorage.setItem(CART_KEY,JSON.stringify(cartItems))
}

function addToCart(product){
    let cartItems = getCartItems()
    let existingProducts = cartItems.find((item)=>{
        return item.id === product.id
    })
    if(existingProducts){
        existingProducts.qty++ 
    }else{
        cartItems.push({
            id:product.id,
            title:product.title,
            qty:1,
            price:product.price,
            img:product.thumbnail
        })
    }
    saveCartItems(cartItems)
}

function incrementQuantity(productId){
    let cartItems=getCartItems()
    let product = cartItems.find((item)=>{
    return item.id === productId
    })
    if(product){
        product.qty++
    }
    saveCartItems(cartItems)
}

function DecrementQuantity(productId){
    let cartItems=getCartItems()
    let product = cartItems.find((item)=>{
    return item.id === productId
    })
    if(product){
        product.qty--
        if(product.qty===0){
            cartItems = cartItems.filter((item)=>{
            return item.id !== productId
            })
        }
    }
    saveCartItems(cartItems)
}

function getProductQuantity(productId){
    let cartItems = getCartItems()
    let product = cartItems.find((item)=>{
    return item.id === productId
    })
    if(product){
        return product.qty
    }
    return 0
}