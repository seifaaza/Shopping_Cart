// Initialize the variables
let total = 0, liked = [], added = []
let products = [
    {
        id: 1,
        img: "nft1.jpg",
        name: "Bored Ape",
        price: 27.89,
        quantity: 1
    },
    {
        id: 2,
        img: "nft2.jpg",
        name: "Bored Ace",
        price: 17.89,
        quantity: 1
    },
    {
        id: 3,
        img: "nft3.jpg",
        name: "Bored Ace",
        price: 10.90,
        quantity: 1
    },
    {
        id: 4,
        img: "nft4.jpg",
        name: "Bored ika",
        price: 13.80,
        quantity: 1
    },
    {
        id: 5,
        img: "nft5.jpg",
        name: "Bored Kib",
        price: 22.80,
        quantity: 1
    },
    {
        id: 6,
        img: "nft6.jpg",
        name: "Bored Bam",
        price: 19.40,
        quantity: 1
    },
    {
        id: 7,
        img: "nft7.jpg",
        name: "Bored Lak",
        price: 18.35,
        quantity: 1
    },
    {
        id: 8,
        img: "nft8.jpg",
        name: "Bored ika",
        price: 18.20,
        quantity: 1
    },
    
]

// Items listing with DOM
const productList = document.querySelector('.product-list')

const listProduct = (array) => productList.innerHTML = array.map(product => 
    `<div id="${product.id}" class="product">
       <div><span class="product-img" style="background-image: url('./assets/images/${product.img}')"></span></div>
       <span><p>${product.price} ETH</p><p>${product.name}</p></span>
       <span><i class="bi bi-heart" id="like" onclick='like(this)'></i>
       <i class="bi bi-bag-plus-fill" id="add" onclick='add(this)'></i></span>
    </div>` ).join('') 

listProduct(products)

const body = document.querySelector('body')
const backdrop = document.createElement("div");
const alertModal = document.querySelector('#exampleModal')

const openAlertModal = () => {
    document.body.appendChild(backdrop);
    body.classList.add('overflow-hidden', 'modal-open')
    backdrop.classList.add('modal-backdrop', 'fade', 'show')
    alertModal.style.display="block"
    alertModal.classList.add('show')
}
const closeAlertModal = () => {
    body.classList.remove('overflow-hidden', 'modal-open')
    backdrop.classList.remove('modal-backdrop', 'fade', 'show')
    alertModal.style.display="none"
    alertModal.classList.remove('show')
}

// Close the alert modal when click outside
body.onclick = (e) => e.target == alertModal ? closeAlertModal() : null;

const removeLikedItem = (itemId) => {
    liked = liked.filter(item => item.id != itemId);
    displayToCart(liked, "liked", likedBody)
}
const removeAddedItem = (itemId, itemPrice) => { 
    added = added.filter(item => item.id != itemId)
    displayToCart(added, "added", addedBody)
    let quantity = 1
    products.map((product) => itemId == product.id ? quantity = product.quantity : null)
    total -= itemPrice * quantity

    insertTotal(total)
}
const displayToast = (itemImg) => document.querySelector('#toast').innerHTML += 
`<div class="toast-container position-fixed bottom-0 end-0 p-3">
<div id="liveToast" class="toast">
    <img src='./assets/images/${itemImg}' class="added-item-img" >
    <span>You have added an item to the cart</span>
</div>
</div>`

const addedToast = document.querySelector('#liveToast')
const addedItemImg = document.querySelector('.added-item-img')

const push = (array, arrayName, obj) => {
    const id = obj.parentElement.parentElement.id
    let quantity = 1
    products.map((product) => {
        if (id == product.id) { item = product ; quantity = product.quantity}})
    let img = item.img, price = item.price, name = item.name

    if(arrayName == "added") {
        if(!array.some((el) => el.id === id)){
            displayToast(item.img);
            array.push({id, img, name, price, quantity});
            total += parseFloat(price )* quantity
        } else openAlertModal()
    }
    if(arrayName == "liked"){
        if(!array.some((el) => el.id === id)){
            array.push({id, img, name, price, quantity})
        } else removeLikedItem(id)
    }
    insertTotal(total)
}

const likeToggle = (obj) => {
    obj.classList.toggle('bi-heart')
    obj.classList.toggle('bi-heart-fill')
}
const add = (obj) => {
    push(added, "added", obj)
    displayToCart(added, "added", addedBody)
}
const like = (obj) =>{
    likeToggle(obj)
    push(liked, "liked", obj)
    displayToCart(liked, "liked", likedBody)
}

addedBody = document.querySelector('.added-body')
likedBody = document.querySelector('.liked-body')

// Switch between liked & added items in HTML
const addedToggle = () => {
    likedBody.style.display = "none"
    addedBody.style.display = "block"
    totalBody.style.display = "block"
}
const likedToggle = () => {
    addedBody.style.display = "none"
    likedBody.style.display = "block"
    totalBody.style.display = "none"
}

const totalBody = document.querySelector(".total");
const insertTotal = (total) => {
    totalBody.innerHTML = `Total : ${total.toFixed(2)} ETH`.replace('-', '')
}
const plus = (id) => {
    products[id].quantity += 1
    insertTotal(products[id -1].price * products[id].quantity)
    displayToCart(added, "added", addedBody, products[id].quantity)
}
const minus = (id) => {
    products[id].quantity > 0 ? products[id].quantity -= 1 : products[id].quantity
    insertTotal(products[id -1].price * products[id].quantity)
    displayToCart(added, "added", addedBody, products[id].quantity)
}
const displayToCart = (array, arrayName, location, quantity = 1) => {
    array.length == 0 ? location.innerHTML = `You have not ${arrayName} any item yet` 
    : location.innerHTML = array.map(item => `<div class="cart-product">
    <span>
    <p>${quantity}</p>
    <span><i onclick="plus(${item.id})" class="bi bi-plus-circle-fill"></i>
    <i onclick="minus(${item.id})" class="bi bi-dash-circle-fill"></i></span>
    </span>
    <img src="./assets/images/${item.img}" />
    <div><h3>${item.price} ETH</h3><p>${item.name}</p></div>
    ${arrayName == "liked" ? `<i onclick="removeLikedItem(${item.id})" class="bi bi-x-lg"></i>` 
    : `<i onclick="removeAddedItem(${item.id}, ${item.price})" class="bi bi-trash3-fill"></i>`}
    </div><hr/>`).join('') 
}

const mainBanner = document.querySelector('.main-banner')
const searchInput = document.querySelector('.search-input')

searchInput.addEventListener('click', function(){ mainBanner.style.display = "none" })
searchInput.addEventListener('blur', function(){ mainBanner.style.display = "block" })
searchInput.addEventListener('keyup', function(e){
    let searchedItems = [], searchedItem = e.target.value ;
    searchedItems = products.filter(product => product.name.includes(searchedItem))
    listProduct(searchedItems)
})








