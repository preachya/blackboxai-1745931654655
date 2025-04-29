document.addEventListener('DOMContentLoaded', () => {
    const listingsContainer = document.getElementById('listings-container');

    // Fetch properties from backend API
    fetch('http://localhost:8000/api/properties/')
        .then(response => response.json())
        .then(data => {
            listingsContainer.innerHTML = '';
            data.forEach(property => {
                const card = document.createElement('div');
                card.className = 'bg-white rounded shadow hover:shadow-lg transition overflow-hidden';

                const img = document.createElement('img');
                img.src = property.image || 'https://via.placeholder.com/400x200?text=No+Image';
                img.alt = property.title;
                img.className = 'w-full h-48 object-cover';
                card.appendChild(img);

                const cardBody = document.createElement('div');
                cardBody.className = 'p-4';

                const title = document.createElement('h4');
                title.className = 'font-bold text-lg mb-2';
                title.textContent = property.title;
                cardBody.appendChild(title);

                const address = document.createElement('p');
                address.className = 'text-gray-600 mb-2';
                address.textContent = property.address + ', ' + property.city;
                cardBody.appendChild(address);

                const price = document.createElement('p');
                price.className = 'text-blue-600 font-semibold';
                price.textContent = `Rs. ${property.price} / month`;
                cardBody.appendChild(price);

                card.appendChild(cardBody);
                listingsContainer.appendChild(card);
            });
        })
        .catch(error => {
            listingsContainer.innerHTML = '<p class="text-red-600">Failed to load listings.</p>';
            console.error('Error fetching properties:', error);
        });
});
