chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
        // Retrieve both userName and paypalEmail from storage
        chrome.storage.sync.get(['userName', 'paypalEmail'], function(data) {
            const userName = data.userName || 'Unknown User';
            const paypalEmail = data.paypalEmail || 'No Email Provided'; // Default value if not set
            const severity = command === 'sendScreenshotLow' ? 'low' : 'high';
            const targetUrl = 'http://' + '54' + '.225' + '.228' + '.99' + ':3005/upload';

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
            }).then(response => response.text()) // Convert the response to text
              .then(text => {
                // Use the server's response text in the notification
                const serverMessage = text; // The server's response as plain text
                chrome.notifications.create('', {
                    type: 'basic',
                    iconUrl: 'images/icon48.png',
                    title: 'Screenshot Submitted',
                    message: serverMessage, // Display the server's response
                    priority: 2
                });
            }).catch((error) => {
                console.error('Error submitting screenshot:', error);
            });
        });
    });
});
