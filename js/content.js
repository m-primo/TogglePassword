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

function GeneratePassword() {
    let minLength = 4;
    let defaultLength = 8;
    let maxLength = 255;
    let lenInput = prompt(`TogglePassword Extension: Enter the password length (${minLength}-${maxLength}). 0 for a random length:`, '0');
    let length = Number(lenInput);

    if (isNaN(length)) {
        alert(`TogglePassword Extension: Invalid length. Using default length of ${defaultLength}.`);
        length = defaultLength;
    } else if (length === 0) {
        length = minLength + Math.floor(Math.random() * (maxLength - minLength + 1));
    } else if (length < minLength || length > maxLength) {
        alert(`TogglePassword Extension: Length out of range. Using default length of ${defaultLength}.`);
        length = defaultLength;
    }

    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*_-+=";
    const charsetLength = charset.length;

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let password = "";
    for (let i = 0; i < length; i++) {
        const index = randomValues[i] % charsetLength;
        password += charset.charAt(index);
    }

    if(password) {
        const element = document.activeElement;
        if (element && (element.type === 'text' || element.type === 'password')) {
            element.value = password;
            alert("Password generated and inserted!");
            CopyTextToClipboard(password);
        } else {
            alert("TogglePassword Extension: No valid input element found to insert the password.");
        }
    } else {
        alert("TogglePassword Extension: Error: No password generated!");
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    var element = document.activeElement;
    if(element.type === 'text' || element.type === 'password') {
        if(message === 'toggle-password') {
            if(!element.hasAttribute(check_attr)) {
                element.setAttribute(check_attr, element.type);
            }
            if(element.hasAttribute(check_attr) && element.getAttribute(check_attr) === 'password') {
                TogglePassword(element);
            }
        } else if(message === 'copy-password') {
            CopyTextToClipboard(element.value, (success, text) => {
                if(success) {
                    alert('TogglePassword Extension: Password Copied Successfully');
                }
            });
        } else if(message === 'generate-password') {
            GeneratePassword();
        }
    }
});
