const itemDetailsDIV = document.querySelector("#main")

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Get the 'id' query parameter.

    if (itemId) {
        const items = JSON.parse(localStorage.getItem('items'));
        const item = items.find(i => i.ID === itemId);
        if (item) {
            displayItemDetail(item);
        } else {
            console.error('Item not found');
        }
    }
});

function displayItemDetail(item) {
    itemDetailsDIV.innerHTML=`
            <section class="item-image">
                <img src="${item.image_url}" alt="item">
            </section>

            <section class="item-details">
                <h1 class="item-title">${item.title}</h1>
                <p class="item-quantity">Number of Items Available: ${item.quantity}</p>
                <p class="item-price">Price: ${item.price}</p>
                <section class="info">
                    <p class="info-title">Information</p>
                    <p>Category: ${item.category}</p>
                    <p>ID: ${item.ID}</p>
                    <P>Description: ${item.description}</P>
                    <p>Artist: ${item.artist}</p>
                    <button>Add to Cart</button>
                </section>
            </section>
            `
}
