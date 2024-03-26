// Save the user's name and PayPal email when the form is submitted
document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const paypalEmail = document.getElementById('paypalEmail').value;
    chrome.storage.sync.set({userName: userName, paypalEmail: paypalEmail}, function() {
        console.log('Settings saved:', userName, paypalEmail);
        // Display a success message to the user
        showMessage('Settings saved successfully.');
    });
});

// Load the saved name and PayPal email when the options page is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['userName', 'paypalEmail'], function(data) {
        document.getElementById('userName').value = data.userName || '';
        document.getElementById('paypalEmail').value = data.paypalEmail || '';
    });
});

// Function to show a message to the user
function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
    // Optionally, style the message or set a timer to hide it after a few seconds
    messageElement.style.backgroundColor = "#f0f0f0";
    messageElement.style.color = "#333";
    messageElement.style.padding = "10px";
    messageElement.style.marginTop = "10px";
    messageElement.style.borderRadius = "5px";
    messageElement.style.border = "1px solid #ccc";
    messageElement.style.textAlign = "center";
    setTimeout(() => {
        messageElement.remove();
    }, 3000); // Remove the message after 3 seconds
}
