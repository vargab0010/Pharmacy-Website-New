const API_BASE = 'http://localhost:5000';

window.onload = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/products/category/medicine');
    const products = await res.json();
    const container = document.getElementById('product-container');

    products.forEach(p => {
      const productHTML = `
        <div class="bg-white shadow-md rounded-lg p-6 flex items-center gap-6 mb-6">
          <img class="w-64 h-64 object-cover rounded-lg shadow-lg" src="${p.imageUrl}" alt="${p.name}">
          <div>
            <h3 class="text-2xl font-bold text-blue-600">${p.name}</h3>

            <p class="text-gray-700 mt-2">Type: ${p.category}</p>

            <p class="text-gray-600 mt-2">${p.description}</p>

            <p class="text-green-600 font-bold mt-2">₹${p.price}</p>

           <div class="flex justify-start gap-4 mt-4">
              <button class="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300 add-to-cart " data-id="${p._id}" >
                <i class="fa-solid fa-cart-plus mr-2"></i>Add to Cart
              </button>
              <button class="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ml-4" data-id="${p._id}"  data-price="${p.price}">
                <i class="fa-solid fa-credit-card mr-2"></i>Buy Now
              </button>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productHTML;
    });
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};


document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    const productId = e.target.getAttribute('data-id');
    const userId = localStorage.getItem('userId'); // make sure it's stored on login

    if (!userId) {
      alert('You must be logged in to add to cart.');
      return;
    }
    
  const payload = {
  userId,
  productId,
  quantity: 1
};

    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity: 1 })
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Product added to cart!');
      } else {
        alert(data.error || 'Failed to add to cart');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  }
});


document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('buy-now')) {
    const productId = e.target.getAttribute('data-id');
    const price = Number(e.target.getAttribute('data-price'));
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please log in to place an order.');
      return;
    }

    const order = {
      userId,
      items: [{ productId, quantity: 1 }],
      total: price
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Order placed successfully!');
      } else {
        alert(data.error || 'Failed to place order');
      }
    } catch (err) {
      console.error('❌ Buy Now failed:', err);
      alert('Server error while placing order');
    }
  }
});


// Update the Buy Now button functionality
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('buy-now')) {
    const productId = e.target.getAttribute('data-id');
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please log in to place an order.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/orders/direct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity: 1 })
      });

      const data = await res.json();
      
      if (res.ok) {
        alert('✅ Order placed successfully!');
        // Refresh orders in profile
        renderOrders();
      } else {
        alert(data.error || 'Failed to place order');
      }
    } catch (err) {
      console.error('❌ Buy Now failed:', err);
      alert('Server error while placing order');
    }
  }
});



