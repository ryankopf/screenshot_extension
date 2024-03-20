// Save the user's name when the form is submitted
document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    chrome.storage.sync.set({userName: userName}, function() {
        console.log('Name saved:', userName);
    });
});

// Load the saved name when the options page is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('userName', function(data) {
        document.getElementById('userName').value = data.userName || '';
    });
});
