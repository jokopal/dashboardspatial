/**
 * Enhanced UI functionality for TUKS Dashboard
 * Includes progress bar visualization and countdown timer
 */

// Global variable to track if countdown has errors
let countdownHasError = false;

/**
 * Enhances the popup content with progress bar and countdown timer
 * @param {HTMLElement} popupContent - The popup content element
 * @param {Object} feature - The GeoJSON feature with properties
 */
function enhancePopupContent(popupContent, feature) {
    if (!popupContent || !feature) return;
    
    console.log("Enhancing popup for feature:", feature.getProperties());
    const properties = feature.getProperties();
    
    // Check if we've already enhanced this popup
    if (popupContent.querySelector('.progress-container') || 
        popupContent.querySelector('.countdown-container')) {
        console.log("Popup already enhanced, skipping");
        return;
    }
    
    // Process all integer properties between 0-100 as progress bars
    for (const key in properties) {
        const value = properties[key];
        
        // Check if the value is an integer between 0 and 100
        if (Number.isInteger(Number(value)) && value >= 0 && value <= 100) {
            try {
                // Remove any existing text line for this property
                removeExistingElement(popupContent, `${key}:`);
                
                // Add progress bar with the property name as label
                addProgressBar(popupContent, value, key);
            } catch (error) {
                console.error(`Error adding progress bar for ${key}:`, error);
            }
        }
    }
    
    // Add countdown timer if Expired property exists
    if ('Expired' in properties) {
        try {
            removeExistingElement(popupContent, 'Expired:');
            addCountdownTimer(popupContent, properties.Expired);
        } catch (error) {
            console.error("Error adding countdown timer:", error);
            countdownHasError = true;
            
            // Add link to backup solution
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Error calculating expiration date';
            
            const backupLink = document.createElement('a');
            backupLink.className = 'backup-link';
            backupLink.textContent = 'View filtered data table';
            backupLink.href = 'filter-backup.html';
            backupLink.target = '_blank';
            
            popupContent.appendChild(errorMsg);
            popupContent.appendChild(backupLink);
        }
    }
}

/**
 * Removes existing text elements that match a specific text
 * @param {HTMLElement} container - The container to search in
 * @param {string} text - The text to search for
 */
function removeExistingElement(container, text) {
    // Find all text nodes and elements
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        null,
        false
    );
    
    const nodesToRemove = [];
    let currentNode;
    
    // Collect nodes that contain the text
    while (currentNode = walker.nextNode()) {
        if (currentNode.nodeType === Node.TEXT_NODE && 
            currentNode.textContent.includes(text)) {
            nodesToRemove.push(currentNode);
        } else if (currentNode.nodeType === Node.ELEMENT_NODE && 
                  !currentNode.classList.contains('progress-container') &&
                  !currentNode.classList.contains('countdown-container') &&
                  currentNode.textContent.includes(text) && 
                  !currentNode.querySelector('.progress-container') &&
                  !currentNode.querySelector('.countdown-container')) {
            nodesToRemove.push(currentNode);
        }
    }
    
    // Remove the collected nodes
    nodesToRemove.forEach(node => {
        try {
            node.parentNode.removeChild(node);
        } catch (e) {
            console.error("Error removing node:", e);
        }
    });
}

/**
 * Creates and adds a progress bar to the popup content
 * @param {HTMLElement} container - The container element
 * @param {number} value - The progress value (0-100)
 * @param {string} labelText - The label text for the progress bar (default: 'Progress')
 */
function addProgressBar(container, value, labelText = 'Progress') {
    // Validate progress value
    const progress = parseInt(value);
    if (isNaN(progress) || progress < 0 || progress > 100) {
        throw new Error("Invalid progress value");
    }
    
    console.log(`Adding progress bar for ${labelText} with value:`, progress);
    
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = `${progress}%`;
    
    // Create progress text
    const progressText = document.createElement('span');
    progressText.className = 'progress-text';
    progressText.textContent = `${progress}%`;
    
    // Assemble progress bar
    progressBar.appendChild(progressText);
    progressContainer.appendChild(progressBar);
    
    // Add label
    const label = document.createElement('strong');
    label.textContent = `${labelText}: `;
    
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.appendChild(label);
    wrapper.appendChild(progressContainer);
    
    // Add to container
    container.appendChild(wrapper);
}

/**
 * Creates and adds a countdown timer to the popup content
 * @param {HTMLElement} container - The container element
 * @param {string} expiryDate - The expiry date in format "YYYY-MM-DD"
 */
function addCountdownTimer(container, expiryDate) {
    if (!expiryDate || typeof expiryDate !== 'string') {
        throw new Error("Invalid expiry date");
    }
    
    console.log("Adding countdown timer for date:", expiryDate);
    
    // Create countdown container
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'countdown-container';
    
    // Calculate days remaining
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    
    if (isNaN(expiry.getTime())) {
        throw new Error("Invalid date format");
    }
    
    const timeDiff = expiry.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Set countdown text and style based on days remaining
    if (daysRemaining < 0) {
        countdownContainer.textContent = 'EXPIRED';
        countdownContainer.classList.add('countdown-expired');
    } else {
        countdownContainer.textContent = `${daysRemaining} hari tersisa`;
        
        if (daysRemaining <= 30) {
            countdownContainer.classList.add('countdown-danger');
        } else if (daysRemaining <= 90) {
            countdownContainer.classList.add('countdown-warning');
        } else {
            countdownContainer.classList.add('countdown-active');
        }
    }
    
    // Create wrapper with label
    const wrapper = document.createElement('div');
    const label = document.createElement('strong');
    label.textContent = 'Expiration: ';
    
    wrapper.appendChild(label);
    wrapper.appendChild(countdownContainer);
    
    // Add to container
    container.appendChild(wrapper);
    
    // Set up timer to update countdown every minute
    setInterval(() => {
        updateCountdown(countdownContainer, expiryDate);
    }, 60000); // 60000 ms = 1 minute
}

/**
 * Updates the countdown timer
 * @param {HTMLElement} countdownElement - The countdown container element
 * @param {string} expiryDate - The expiry date in format "YYYY-MM-DD"
 */
function updateCountdown(countdownElement, expiryDate) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const expiry = new Date(expiryDate);
        expiry.setHours(0, 0, 0, 0);
        
        const timeDiff = expiry.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Update countdown text and style
        if (daysRemaining < 0) {
            countdownElement.textContent = 'EXPIRED';
            countdownElement.className = 'countdown-container countdown-expired';
        } else {
            countdownElement.textContent = `${daysRemaining} hari tersisa`;
            
            countdownElement.className = 'countdown-container';
            if (daysRemaining <= 30) {
                countdownElement.classList.add('countdown-danger');
            } else if (daysRemaining <= 90) {
                countdownElement.classList.add('countdown-warning');
            } else {
                countdownElement.classList.add('countdown-active');
            }
        }
    } catch (error) {
        console.error("Error updating countdown:", error);
        countdownHasError = true;
        countdownElement.textContent = 'Error';
        countdownElement.className = 'countdown-container countdown-expired';
    }
}

/**
 * Direct integration with OpenLayers popup mechanism
 */
function setupPopupEnhancement() {
    console.log("Setting up popup enhancement");
    
    // Try to find the popup content element
    const popupContentElement = document.getElementById('popup-content');
    if (!popupContentElement) {
        console.error("Popup content element not found!");
        return;
    }
    
    // Try to access the map object
    if (typeof map === 'undefined') {
        console.error("Map object not found!");
        return;
    }
    
    // Add click event listener to the map
    map.on('singleclick', function(evt) {
        console.log("Map clicked, checking for features");
        const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
            return feature;
        });
        
        if (feature) {
            console.log("Feature found, will enhance popup");
            // Wait a short time for the popup to be populated by the original code
            setTimeout(() => {
                enhancePopupContent(popupContentElement, feature);
            }, 100);
        }
    });
    
    // Alternative approach: Override the createPopupContent function
    if (window.createPopupContent) {
        console.log("Found createPopupContent function, overriding it");
        const originalCreatePopupContent = window.createPopupContent;
        
        window.createPopupContent = function(feature, layer) {
            console.log("Custom createPopupContent called");
            const popupContent = originalCreatePopupContent(feature, layer);
            
            // Clean up any existing progress or expiration elements
            const existingProgress = popupContent.querySelectorAll('.progress-container');
            const existingCountdown = popupContent.querySelectorAll('.countdown-container');
            
            existingProgress.forEach(el => el.parentNode.removeChild(el));
            existingCountdown.forEach(el => el.parentNode.removeChild(el));
            
            enhancePopupContent(popupContent, feature);
            return popupContent;
        };
    }
}

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing enhanced UI");
    
    // Wait a bit to ensure all OpenLayers components are initialized
    setTimeout(setupPopupEnhancement, 1000);
    
    // Check if countdown has errors on page load
    if (countdownHasError) {
        window.open('filter-backup.html', '_blank');
    }
});

// Additional safety: try again after window load
window.addEventListener('load', function() {
    console.log("Window loaded, ensuring enhanced UI is initialized");
    setTimeout(setupPopupEnhancement, 1000);
});