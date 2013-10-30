chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'getPref') {
        var result = localStorage.getItem(message.key);
        sendResponse(result);
    }
});