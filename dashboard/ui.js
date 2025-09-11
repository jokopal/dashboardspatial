// Add this function to display update information in the title bar
function displayUpdateInfo() {
    // Get current date and time
    const now = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    const dateStr = now.toLocaleDateString('id-ID', dateOptions);
    const timeStr = now.toLocaleTimeString('id-ID', timeOptions);
    
    // Create or update the info element
    let infoElement = document.getElementById('update-info');
    if (!infoElement) {
        infoElement = document.createElement('div');
        infoElement.id = 'update-info';
        infoElement.className = 'update-info-bar';
        
        // Add it to the header
        const header = document.querySelector('.grid6');
        if (header) {
            header.appendChild(infoElement);
        }
    }
    
    // Set the content
    infoElement.innerHTML = `
        <span>Data terakhir diperbarui: ${dateStr} ${timeStr}</span>
        <button onclick="refreshAllCharts()" class="refresh-button-small">Refresh</button>
    `;
}

// Function to refresh all charts
function refreshAllCharts() {
    // Refresh embedded charts
    const iframes = document.querySelectorAll('iframe.excel-frame');
    iframes.forEach(iframe => {
        iframe.src = iframe.src;
    });
    
    // Update the info display
    displayUpdateInfo();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    displayUpdateInfo();
    
    // Set up auto refresh every 5 minutes
    setInterval(displayUpdateInfo, 300000);
});