var main_menu_id = 'togglepassword-main-menu';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: main_menu_id,
    title: 'TogglePassword',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    parentId: main_menu_id,
    id: 'toggle-password',
    title: 'View/Hide Password',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    parentId: main_menu_id,
    id: 'copy-password',
    title: 'Copy Password',
    contexts: ['editable']
  });

  chrome.contextMenus.create({
    parentId: main_menu_id,
    id: 'generate-password',
    title: 'Generate Password',
    contexts: ['editable']
  });
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id || !info || !info.menuItemId) return;

  switch(info.menuItemId) {
    case 'toggle-password':
      chrome.tabs.sendMessage(tab.id, 'toggle-password');
      break;
    case 'copy-password':
      chrome.tabs.sendMessage(tab.id, 'copy-password');
      break;
    case 'generate-password':
      chrome.tabs.sendMessage(tab.id, 'generate-password');
      break;
    default:
      break;
  }
});
