var main_menu_id = 'togglepassword-main-menu';

chrome.contextMenus.create({
    id: main_menu_id,
    title: 'Toggle Password',
    contexts: ['editable']
});

chrome.contextMenus.create({
    parentId: main_menu_id,
    title: 'View/Hide Password',
    contexts: ['editable'],
    onclick: (info, tab) => {
        chrome.tabs.sendMessage(tab.id, 'toggle-password');
    }
});

chrome.contextMenus.create({
    parentId: main_menu_id,
    title: 'Copy Password',
    contexts: ['editable'],
    onclick: (info, tab) => {
        chrome.tabs.sendMessage(tab.id, 'copy-password');
    }
});