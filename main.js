// Navbar Toggle
function navToggle() {
    document.getElementById('nav-icon').classList
    .toggle('nav-open')
}
let total = 0, liked = [], added = []
const products = [
    {
        id: 1,
        img: "nft1.jpg",
        name: "Bored Ape",
        price: 27.89,
    },
    {
        id: 2,
        img: "nft2.jpg",
        name: "Bored Ace",
        price: 17.89,
    },
    {
        id: 3,
        img: "nft3.jpg",
        name: "Bored Ace",
        price: 10.90,
    },
    {
        id: 4,
        img: "nft4.jpg",
        name: "Bored ika",
        price: 13.80,
    },
    {
        id: 5,
        img: "nft5.jpg",
        name: "Bored Kib",
        price: 22.80,
    },
    {
        id: 6,
        img: "nft6.jpg",
        name: "Bored Bam",
        price: 19.40,
    },
    {
        id: 7,
        img: "nft7.jpg",
        name: "Bored Lak",
        price: 18.35,
    },
    {
        id: 8,
        img: "nft8.jpg",
        name: "Bored ika",
        price: 18.20,
    },
]
// Product List
const productList = document.querySelector('.product-list')
products.map((product, index) => {
    productList.innerHTML +=
   `<div id="${product.id}" class="col-lg-3 col-sm-6">
       <img src='./assets/images/${product.img}'/>
       <p>${product.name}</p>
       <span>${product.price} </span>ETH
       <input type="number" onchange='quantity(this)'/>
       <button id="like" onclick='like(this)'>Like</button>
       <button id="add" onclick='add(this)'>Add</button>
    </div>`
})

// Actions
const push = (location, locationName, obj) => {
    const id = obj.parentElement.id,
     img = obj.parentElement.children[0].src,
     name = obj.parentElement.children[1].innerHTML,
     price = obj.parentElement.children[2].innerHTML

    // check occurence of product
    if(!location.some((el) => el.id === id)) {
        location.push({id, img, name, price})
        locationName == "added" ? total = parseFloat(price)+total : total
    }else if(locationName == "liked"){
        location.pop({id, img, name, price}) 
    } else alert("Product already exists !")
    console.log(locationName);
    console.log(location);
    console.log(total);
}
const add = (obj) => push(added, "added", obj)
const like = (obj) => push(liked, "liked", obj)

const likedBag = document.querySelector('#likedBag')
const addedBag = document.querySelector('#addedBag')

document.querySelector('#addedClick').onclick = () => {
    likedBag.classList.remove('open')
    addedBag.classList.toggle('open')
}
document.querySelector('#likedClick').onclick = () => {
    addedBag.classList.remove('open')
    likedBag.classList.toggle('open')
}

