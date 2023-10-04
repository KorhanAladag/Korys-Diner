import {menuArray} from '/data.js'

const orderField = document.getElementById('order-field')
const checkoutForm = document.getElementById("checkout-form")
const modal = document.getElementById('payment-checkout-modal')
const addButtons = document.getElementsByClassName('button')

let ordersArray =[]
let pizzaCount = 0
let burgerCount = 0
let beerCount = 0
let isOrderFinished = false

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
       orderField.style.display = 'flex';
       handleOrder(e.target.dataset.add) 
    }
    else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    else if (e.target.dataset.purchasebtn){
        purchasePopup()
    }
})

checkoutForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const userName = document.getElementById('name').value
    modal.style.display = 'none'
    isOrderFinished = false
    ordersArray = []
    let thanksMsg = ``
    thanksMsg = `
        <div class="thanks-modal">
        <h3>Thanks, ${userName}! Your order is on its way!</h3>
    </div>`

    orderField.innerHTML = thanksMsg
})


function handleOrder(orderId){
    const targetItem = menuArray.filter(function(item){
        return item.id == orderId
    })[0]
    if(!isOrderFinished){
    ordersArray.push({
        Name : targetItem.name,
        Price : targetItem.price
    })
    renderOrdersHTML()
}
}

function addItem(){
    let newItem = ``

    ordersArray.forEach((item) => {
    let Index = ordersArray.indexOf(item)

        newItem += `
        <div class="order-items">
            <p>${item.Name}</p>
            <p class="remove-btn" data-remove=${Index}>remove</p>
            <p class="order-price">$${item.Price}</p>
        </div>
    `
    
    
})
return newItem
}

function removeItem(itemId) {
    ordersArray.splice(itemId, 1)
    if(ordersArray.length == 0){
        orderField.style.display = 'none'
    }
    renderOrdersHTML()
}

function totalPrice(){

    let totalPriceNum = 0

    for( let i=0; i< ordersArray.length; i++){
        totalPriceNum += (ordersArray[i].Price)
    }
    return totalPriceNum
}

function purchasePopup(){
    isOrderFinished = true
    modal.style.display = "block"
    modal.classList = "fixed"
}
        


function renderOrderList(){

    let orderHTML= ``
    orderHTML =`
    <div class="orders-container" id="orders-container">
        <p class="your-order-title"> Your order </p>
        ${addItem()}
        <div class="total-price">
            <p>Total price: </p>
            <p class="order-price">$${totalPrice()}</p>
        </div>
        <button class="purchase-btn" id="purchase-btn"
        data-purchaseBtn="btn">Complete order</button>
    </div>
    `
    return orderHTML
}

function getElementsList(){
    let itemHtml = ``
    
    menuArray.forEach(function(itemData){
        itemHtml += `
        <div class="item-inner">
        
            <div class =item-inner-emoji">
                <p class="item-emoji">${itemData.emoji}</p>
            </div>    
            
            <div class="item-inner-info">
                <p class="item-title">${itemData.name}</p>
                <p class="item-desc">${itemData.ingredients}</p>
                <p class="item-price">$${itemData.price}</p>
            </div>  
            
            <div class="button-container">
            <button class="button" data-add= "${itemData.id}">+</button>
            </div>
            
        
        </div>
        <hr style="background-color:#D2D2D2;width:90%;border: 1.5px solid #DEDEDE">

        
        `
    })
    return itemHtml
}

function renderItems(){
    document.getElementById('item-container').innerHTML = getElementsList()
}

function renderOrdersHTML(){
    orderField.innerHTML = renderOrderList()
}

renderItems()