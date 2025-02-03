let itemCount = 0;
let totalMRP = 0;
let totalDiscount = 0;
let convenienceFee = 99; 
let totalAmount = 0;
let itemsInBag = []; 

const addToBagButtons = document.querySelectorAll('.add_to_bag');

const bagIcon = document.querySelector('.bag');
const bagCount = document.getElementById('bag_count');

function updateBag() {
    if (itemCount > 0) {
        bagCount.textContent = `(${itemCount})`; 
    } else {
        bagCount.textContent = ''; 
    }
}

function showBagDetails() {
    const mainContent = document.getElementById('main-content');
    
    let bagDetailsHTML = `  
        <div id="bag_details" class="bag-details-container">
            <h3>Price Details (<span id="item_count">${itemCount}</span> Items)</h3>
            <div class="price-details">
                <div class="price-row">
                    <span>Total MRP</span>
                    <span>₹${totalMRP.toFixed(2)}</span>
                </div>
                <div class="price-row">
                    <span>Discount on MRP</span>
                    <span>- ₹${totalDiscount.toFixed(2)}</span>
                </div>
                <div class="price-row" id="convenience_fee">
                    <span>Convenience Fee</span>
                    <span>₹${convenienceFee.toFixed(2)}</span>
                </div>
                <div class="price-row total-amount">
                    <span>Total Amount</span>
                    <span>₹${totalAmount.toFixed(2)}</span>
                </div>
            </div>
            <h4>Items in Your Bag:</h4>
            <ul id="item_list">`;

    itemsInBag.forEach(item => {
        bagDetailsHTML += `
            <li>
                <div class="item-details">
                    <img src="${item.image}" alt="${item.name}" class="item-image" />
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">₹${item.price.toFixed(2)}</span>
                        <span class="item-quantity">x${item.quantity}</span>
                    </div>
                </div>
            </li>`;
    });

    bagDetailsHTML += `
            </ul>
            <button id="place_order_button" class="place-order-btn">Place Order</button>
        </div>`;

    mainContent.innerHTML = bagDetailsHTML;
}

bagIcon.addEventListener('click', function() {
    showBagDetails(); 
});

addToBagButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));
        const itemImage = button.getAttribute('data-image'); 
        const itemIndex = itemsInBag.findIndex(item => item.name === itemName);
        
        if (itemIndex !== -1) {
            itemsInBag[itemIndex].quantity += 1;
        } else {
            itemsInBag.push({
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            });
        }

        itemCount++;
        totalMRP += itemPrice;
        totalDiscount += itemPrice * 0.1; 
        totalAmount = totalMRP - totalDiscount + convenienceFee;

        updateBag();
    });
});
