// Sample initial data
let items = [
  {
    id: 1,
    title: "AirPods Pro",
    status: "lost",
    category: "electronics",
    location: "Student Union Dining Area",
    contact: "alex@campus.edu"
  },
  {
    id: 2,
    title: "Dorm Keys with Red Lanyard",
    status: "found",
    category: "keys",
    location: "Engineering Building Room 204",
    contact: "security@campus.edu"
  },
  {
    id: 3,
    title: "Black Denim Jacket",
    status: "lost",
    category: "clothing",
    location: "Main Gym Locker Room",
    contact: "sam@campus.edu"
  }
];

// DOM Elements
const itemsGrid = document.getElementById('itemsGrid');
const reportForm = document.getElementById('reportForm');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

// Render Items to UI
function renderItems() {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                          item.location.toLowerCase().includes(searchTerm);
    
    let matchesFilter = true;
    if (currentFilter === 'lost' || currentFilter === 'found') {
      matchesFilter = item.status === currentFilter;
    } else if (currentFilter !== 'all') {
      matchesFilter = item.category === currentFilter;
    }

    return matchesSearch && matchesFilter;
  });

  itemsGrid.innerHTML = '';

  if (filteredItems.length === 0) {
    itemsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">No items found matching your criteria.</p>';
    return;
  }

  filteredItems.forEach(item => {
    const card = document.createElement('div');
    card.className = `item-card status-${item.status}`;

    card.innerHTML = `
      <span class="badge badge-${item.status}">${item.status}</span>
      <h3>${item.title}</h3>
      <p><strong>Category:</strong> ${capitalize(item.category)}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p class="contact">Contact: ${item.contact}</p>
    `;

    itemsGrid.appendChild(card);
  });
}

// Add New Item
reportForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newItem = {
    id: Date.now(),
    title: document.getElementById('itemTitle').value,
    status: document.getElementById('itemStatus').value,
    category: document.getElementById('itemCategory').value,
    location: document.getElementById('itemLocation').value,
    contact: document.getElementById('itemContact').value
  };

  items.unshift(newItem);
  reportForm.reset();
  renderItems();
});

// Search Input Listener
searchInput.addEventListener('input', renderItems);

// Filter Button Click Listeners
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.getAttribute('data-filter');
    renderItems();
  });
});

// Helper Function
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Initial Render
renderItems();
