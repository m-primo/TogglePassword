function fallbackCopyTextToClipboard(text, callback=null) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        if(callback !== null) {
            callback(successful, text);
        }
    } catch(err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}
function CopyTextToClipboard(text, callback=null) {
    if(!navigator.clipboard) {
        fallbackCopyTextToClipboard(text, callback);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        if(callback !== null) {
            callback(true, text);
        }
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

var check_attr = 'togglepassword-original-type';

function TogglePassword(element) {
    var type = (element.type === 'password' ? 'text' : 'password');
    element.setAttribute('type', type);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var element = document.activeElement;
    if(element.type === 'text' || element.type === 'password') {
        if(request === 'toggle-password') {
            if(!element.hasAttribute(check_attr)) {
                element.setAttribute(check_attr, element.type);
            }
            if(element.hasAttribute(check_attr) && element.getAttribute(check_attr) === 'password') {
                TogglePassword(element);
            }
        } else if(request === 'copy-password') {
            CopyTextToClipboard(element.value, (success, text) => {
                if(success) {
                    alert('TogglePassword Extension: Password Copied Successfully');
                }
            });
        }
    }
});