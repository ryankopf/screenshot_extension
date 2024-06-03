document.getElementById('screenshotButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'takeScreenshot' });
});
