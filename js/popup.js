function getId(id) {
    return document.getElementById(id);
}

const MANIFEST = chrome.runtime.getManifest();
getId('html-title').innerHTML = MANIFEST.name;
getId('app-icon').src = chrome.extension.getURL(MANIFEST.browser_action.icons[0]);
getId('app-name').innerHTML = MANIFEST.name;
getId('app-version').innerHTML = 'V'+MANIFEST.version;

getId('inject-btn').onclick = (e) => {
    // chrome.tabs.executeScript({
    //     file: '/js/jquery.min.js'
    // });
    chrome.tabs.executeScript({
        file: '/js/background.js'
    });
};