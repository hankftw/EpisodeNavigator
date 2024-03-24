// background.js

chrome.commands.onCommand.addListener(function(command) {
  if (command == "navigate-forward" || command == "navigate-backward") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (!tabs || tabs.length === 0) {       
        return;
      }

      var tabId = tabs[0].id;

      chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['contentScript.js']
      });
    });
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "updateTab") {
    chrome.tabs.update(sender.tab.id, {url: message.url});
  }
});
