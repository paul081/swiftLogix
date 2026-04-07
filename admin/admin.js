// Mock Data
let shipments = [
    { id: 'SLX882910', sender: 'John Doe', recipient: 'Alice Smith', status: 'In Transit', location: 'New York, US', weight: '2.5kg' },
    { id: 'SLX991022', sender: 'Global Tech', recipient: 'Future Inc', status: 'Delivered', location: 'London, UK', weight: '12.0kg' },
    { id: 'SLX110293', sender: 'Jane Roe', recipient: 'Bob Brown', status: 'Pending', location: 'Berlin, DE', weight: '1.2kg' },
];

let users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Premium User', location: 'New York' },
    { name: 'Alice Smith', email: 'alice@example.com', role: 'Basic User', location: 'London' },
];

let updates = [
    { id: 'SLX882910', type: 'Departure', location: 'NYC Terminal', time: '2026-04-06 14:00', admin: 'Admin01' },
    { id: 'SLX882910', type: 'Arrival', location: 'Sorting Hub', time: '2026-04-07 09:30', admin: 'HubManager' },
];

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initForms();
    renderAll();
});

function initTabs() {
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    const tabs = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('pageTitle');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            tabs.forEach(t => t.classList.remove('active'));
            document.getElementById(`${tabId}Tab`).classList.add('active');
            pageTitle.innerText = item.innerText.trim();
        });
    });
}

function initForms() {
    // Shipment Creation
    document.getElementById('shipmentForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('newTrackingID').value;
        if (!id) return alert('Please generate a tracking number first');
        
        shipments.unshift({
            id: id,
            sender: e.target[1].value,
            recipient: e.target[2].value,
            location: e.target[3].value,
            status: e.target[4].value,
            weight: 'Unknown'
        });
        
        renderAll();
        closeModal('shipmentModal');
        e.target.reset();
    });

    // Movement Tracking
    document.getElementById('movementForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const trackingId = document.getElementById('moveHiddenID').value;
        const location = document.getElementById('moveLocation').value;
        const status = document.getElementById('moveStatus').value;
        const desc = document.getElementById('moveDescription').value;

        // Add to updates history
        updates.unshift({
            id: trackingId,
            type: status,
            location: location,
            time: new Date().toLocaleString(),
            admin: 'Admin_Sim'
        });

        // Update shipment main status
        const ship = shipments.find(s => s.id === trackingId);
        if (ship) {
            ship.status = status;
            ship.location = location;
        }

        renderAll();
        closeModal('movementModal');
        e.target.reset();
        alert('Movement logged and shipment updated!');
    });
}

function renderAll() {
    renderRecentShipments();
    renderAllShipments();
    renderUsers();
    renderHistory();
    updateStats();
}

function updateStats() {
    document.getElementById('totalShipments').innerText = shipments.length;
    document.getElementById('inTransit').innerText = shipments.filter(s => s.status === 'In Transit').length;
    document.getElementById('delivered').innerText = shipments.filter(s => s.status === 'Delivered').length;
}

function renderRecentShipments() {
    const container = document.getElementById('recentShipmentsTable');
    if (!container) return;
    container.innerHTML = shipments.slice(0, 5).map(s => `
        <tr>
            <td><strong>#${s.id}</strong></td>
            <td>${s.recipient}</td>
            <td><span class="badge ${getStatusBadge(s.status)}">${s.status}</span></td>
            <td>${s.location}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" style="background: #dcfce7; color: #166534;" onclick="openMoveModal('${s.id}')"><i class="fa-solid fa-location-dot"></i></button>
                    <button class="action-btn edit-btn"><i class="fa-solid fa-pen"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderAllShipments() {
    const container = document.getElementById('allShipmentsTable');
    if (!container) return;
    container.innerHTML = shipments.map(s => `
        <tr>
            <td><strong>#${s.id}</strong></td>
            <td>${s.sender}</td>
            <td>${s.recipient}</td>
            <td><span class="badge ${getStatusBadge(s.status)}">${s.status}</span></td>
            <td>${s.weight}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" style="background: #dcfce7; color: #166534;" onclick="openMoveModal('${s.id}')" title="Log Movement"><i class="fa-solid fa-location-dot"></i></button>
                    <button class="action-btn edit-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteShipment('${s.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderUsers() {
    const container = document.getElementById('usersTableContent');
    if (!container) return;
    container.innerHTML = users.map(u => `
        <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td><span class="badge badge-primary">${u.role}</span></td>
            <td>${u.location}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn edit-btn"><i class="fa-solid fa-user-pen"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderHistory() {
    const container = document.getElementById('trackingHistoryTable');
    if (!container) return;
    container.innerHTML = updates.map(u => `
        <tr>
            <td>#${u.id}</td>
            <td>${u.type}</td>
            <td>${u.location}</td>
            <td>${u.time}</td>
            <td><span class="badge badge-success">${u.admin}</span></td>
        </tr>
    `).join('');
}

function getStatusBadge(status) {
    if (status === 'Delivered') return 'badge-success';
    if (status === 'In Transit') return 'badge-warning';
    if (status === 'Pending') return 'badge-primary';
    return '';
}

// Modal Logic
window.openModal = function(id) {
    document.getElementById(id).style.display = 'flex';
}

window.closeModal = function(id) {
    document.getElementById(id).style.display = 'none';
}

window.openMoveModal = function(id) {
    document.getElementById('moveTrackingID').innerText = `#${id}`;
    document.getElementById('moveHiddenID').value = id;
    openModal('movementModal');
}

window.generateTracking = function() {
    const suffix = Math.random().toString(36).substring(2, 10).toUpperCase();
    document.getElementById('newTrackingID').value = `SLX${suffix}`;
}

window.deleteShipment = function(id) {
    if (confirm(`Are you sure you want to delete shipment #${id}?`)) {
        shipments = shipments.filter(s => s.id !== id);
        renderAll();
    }
}
