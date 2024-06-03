chrome.commands.onCommand.addListener((command) => {
    if (command === 'sendScreenshotLow' || command === 'sendScreenshotHigh') {
        captureAndSendScreenshot(command === 'sendScreenshotLow' ? 'low' : 'high');
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'takeScreenshot') {
        captureAndSendScreenshot('low');
    }
});

function captureAndSendScreenshot(severity) {
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
        chrome.storage.sync.get(['userName', 'paypalEmail'], function(data) {
            const userName = data.userName || 'Unknown User';
            const paypalEmail = data.paypalEmail || 'No Email Provided';
            const targetUrl = 'http://' + '54' + '.225' + '.228' + '.99' + ':3005/upload';
            // Show a notification if no email is set
            if (paypalEmail === 'No Email Provided') {
                chrome.notifications.create('', {
                    type: 'basic',
                    iconUrl: 'images/icon48.png',
                    title: 'No PayPal Email Set',
                    message: 'Please set your PayPal email in the extension options.',
                    priority: 2
                });
            }
            // Show a notification if no name is set
            if (userName === 'Unknown User') {
                chrome.notifications.create('', {
                    type: 'basic',
                    iconUrl: 'images/icon48.png',
                    title: 'No Name Set',
                    message: 'Please set your name in the extension options.',
                    priority: 2
                });
            }

            fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    screenshot_url: screenshotUrl,
                    name: userName,
                    paypal_email: paypalEmail,
                    work_type: severity,
                }),
            }).then(response => response.text())
              .then(text => {
                const serverMessage = text;
                chrome.notifications.create('', {
                    type: 'basic',
                    iconUrl: 'images/icon48.png',
                    title: 'Screenshot Submitted',
                    message: serverMessage,
                    priority: 2
                });
            }).catch((error) => {
                console.error('Error submitting screenshot:', error);
            });
        });
    });
}
