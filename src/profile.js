  // DOM Elements
        const addAddressBtn = document.getElementById('addAddressBtn');
        const addressModal = document.getElementById('addressModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const cancelAddressBtn = document.getElementById('cancelAddressBtn');
        const addressForm = document.getElementById('addressForm');
        const addressContainer = document.getElementById('addressContainer');
        const logoutBtn = document.getElementById('logoutBtn');



        // Event Listeners
        addAddressBtn.addEventListener('click', () => {
            addressModal.classList.remove('hidden');
        });

        closeModalBtn.addEventListener('click', () => {
            addressModal.classList.add('hidden');
        });

        cancelAddressBtn.addEventListener('click', () => {
            addressModal.classList.add('hidden');
        });

     addressForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem('userId');
  const formData = new FormData(addressForm);

  const newAddress = {
    street: formData.get('street'),
    apt: formData.get('apt'),
    city: formData.get('city'),
    state: formData.get('state'),
    post: formData.get('post'),
    district: formData.get('district'),
    zip: formData.get('zip'),
    country: formData.get('country')
  };

  try {
    const res = await fetch('http://localhost:5000/api/users/address/add', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, address: newAddress })
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Address saved!');
      addressForm.reset();
      addressModal.classList.add('hidden');
      loadAddresses(); // reload address cards from DB
    } else {
      alert(data.error || 'Failed to save address');
    }
  } catch (err) {
    console.error('❌ Address submission error:', err);
    alert('Server error while saving address');
  }
});


        logoutBtn.addEventListener('click', () => {
            // In a real app, this would call your logout API
            alert('You have been logged out. Redirecting to home page...');
            // window.location.href = '/';
        });

        // Render Functions
        function renderUserInfo() {
            document.getElementById('userName').textContent = localStorage.getItem('userName');
            document.getElementById('userEmail').textContent = localStorage.getItem('userEmail');
            document.getElementById('displayName').textContent = localStorage.getItem('userName');
            document.getElementById('displayEmail').textContent = localStorage.getItem('userEmail');
            document.getElementById('userPhone').textContent = localStorage.getItem('userPhone');
        }


async function loadAddresses() {
  const userId = localStorage.getItem('userId');
  const res = await fetch(`http://localhost:5000/api/users/${userId}`);
  const user = await res.json();

  addressContainer.innerHTML = '';
  user.addresses.forEach((address, index) => { // ✅ fix here
    const countryName = getCountryName(address.country);

    const addressCard = document.createElement('div');
    addressCard.className = 'border rounded-lg p-4 bg-gray-50';
    addressCard.innerHTML = `
      <p class="text-gray-800 font-medium">${address.street}</p>
      ${address.apt ? `<p class="text-gray-600">${address.apt}</p>` : ''}
      <p class="text-gray-600">${address.city}, ${address.state}, ${address.post}, ${address.district}</p>
      <p class="text-gray-600">ZIP: ${address.zip}</p>
      <p class="text-gray-600">${countryName}</p>
      <div class="mt-2 flex space-x-2">
        <button class="edit-address text-blue-600 text-sm" data-index="${index}">Edit</button>
        <button class="delete-address text-red-600 text-sm" data-index="${index}">Delete</button>
      </div>
    `;
    addressContainer.appendChild(addressCard);
  });
}



        
        

        // Update renderOrders function to show detailed order information
async function renderOrders() {
  const userId = localStorage.getItem('userId');
  const ordersTableBody = document.getElementById('ordersTableBody');
  ordersTableBody.innerHTML = '';

  try {
    const res = await fetch(`${API_BASE}/api/orders/user/${userId}`);
    const orders = await res.json();

    if (!orders.length) {
      ordersTableBody.innerHTML = `
        <tr><td colspan="5" class="text-center py-4 text-gray-500">No orders found.</td></tr>
      `;
      return;
    }

    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('en-IN');
      const total = `₹${order.total.toFixed(2)}`;
      const status = order.status || 'Placed';

      const row = document.createElement('tr');
      row.className = 'border-b';
      row.innerHTML = `
        <td class="py-3 px-4">${order._id.substring(0, 8)}...</td>
        <td class="py-3 px-4">${date}</td>
        <td class="py-3 px-4">
          <span class="${status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'} 
                text-xs px-2 py-1 rounded-full">
            ${status}
          </span>
        </td>
        <td class="py-3 px-4">${total}</td>
        <td class="py-3 px-4">
          <button class="text-blue-600 hover:underline view-order" data-id="${order._id}">
            View
          </button>
        </td>
      `;
      ordersTableBody.appendChild(row);
    });
  } catch (err) {
    console.error('❌ Failed to load orders:', err);
    ordersTableBody.innerHTML = `
      <tr><td colspan="5" class="text-center py-4 text-red-500">Failed to load orders.</td></tr>
    `;
  }
}

// Add this at the top of the file
const API_BASE = 'http://localhost:5000';

// Add this to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  renderUserInfo();
  loadAddresses();
  renderOrders();
  
  // Add event listener for order details modal
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('view-order')) {
      const orderId = e.target.getAttribute('data-id');
      const modal = document.getElementById('orderDetailsModal');
      const modalBody = document.getElementById('orderDetailsBody');
      
      try {
        const res = await fetch(`${API_BASE}/api/orders/${orderId}`);
        const order = await res.json();
        
        // Format order items
        const itemsHtml = order.items.map(item => `
          <li class="flex justify-between">
            <span>${item.productId.name} (x${item.quantity})</span>
            <span>₹${item.productId.price * item.quantity}</span>
          </li>
        `).join('');
        
        modalBody.innerHTML = `
          <div class="mb-4">
            <h3 class="text-lg font-semibold mb-2">Order #${order._id.substring(0, 8)}</h3>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
          
          <div class="border-t border-b py-4 my-4">
            <h4 class="font-medium mb-2">Items:</h4>
            <ul class="space-y-2">
              ${itemsHtml}
            </ul>
          </div>
          
          <div class="flex justify-between font-semibold">
            <span>Total:</span>
            <span>₹${order.total.toFixed(2)}</span>
          </div>
        `;
        
        modal.classList.remove('hidden');
      } catch (err) {
        console.error('Error loading order details:', err);
        modalBody.innerHTML = `<p class="text-red-500">Failed to load order details.</p>`;
        modal.classList.remove('hidden');
      }
    }
  });
});




        // Helper function
        function getCountryName(code) {
            const countries = {
                'US': 'United States',
                'CA': 'Canada',
                'UK': 'United Kingdom',
                'AU': 'Australia',
                'IN': 'India'
            };
            return countries[code] || code;
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderUserInfo();
           loadAddresses(); 

            renderOrders();
        });


        // DELETE
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-address')) {
    const index = e.target.getAttribute('data-index');
    const userId = localStorage.getItem('userId');

    if (!confirm('Are you sure you want to delete this address?')) return;

    const res = await fetch(`http://localhost:5000/api/users/address/${userId}/${index}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (res.ok) {
      alert('Address deleted');
      loadAddresses();
    } else {
      alert(data.error || 'Failed to delete');
    }
  }
});

// EDIT
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit-address')) {
    const index = e.target.getAttribute('data-index');
    const userId = localStorage.getItem('userId');

    const res = await fetch(`http://localhost:5000/api/users/${userId}`);
    const user = await res.json();
    const addr = user.addresses[index];

    // Fill the form with existing data
    addressForm.street.value = addr.street || '';
    addressForm.apt.value = addr.apt || '';
    addressForm.city.value = addr.city || '';
    addressForm.state.value = addr.state || '';
    addressForm.post.value = addr.post || '';
    addressForm.district.value = addr.district || '';
    addressForm.zip.value = addr.zip || '';
    addressForm.country.value = addr.country || '';

    addressModal.classList.remove('hidden');

    // Replace default form submit with update
    addressForm.onsubmit = async (ev) => {
      ev.preventDefault();
      const formData = new FormData(addressForm);
      const updated = Object.fromEntries(formData.entries());

      const updateRes = await fetch(`http://localhost:5000/api/users/address/update/${userId}/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      const updateData = await updateRes.json();
      if (updateRes.ok) {
        alert('Address updated');
        addressForm.reset();
        addressModal.classList.add('hidden');
        loadAddresses();
      } else {
        alert(updateData.error || 'Update failed');
      }
    };
  }
});


//View Order Handler


document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('view-order')) {
    e.preventDefault();
    const orderId = e.target.getAttribute('data-id');

    const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);
    const order = await res.json();

    const body = document.getElementById('orderDetailsBody');
    body.innerHTML = `
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <hr class="my-2">
      <p class="font-semibold">Items:</p>
      <ul class="list-disc pl-4">
        ${order.items.map(i => `
          <li>${i.productId.name} (x${i.quantity}) - ₹${i.productId.price}</li>
        `).join('')}
      </ul>
    `;
    document.getElementById('orderDetailsModal').classList.remove('hidden');
  }
});
