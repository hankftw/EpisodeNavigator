var urlElements = document.querySelectorAll('[href]');
var nextChapterElement = Array.from(urlElements).find(element => {
  return element.textContent.toLowerCase().includes('next');
});

if (nextChapterElement) {
  var nextChapterLink = nextChapterElement.href; 
  chrome.runtime.sendMessage({ type: "updateTab", url: nextChapterLink });
}
//background.js
chrome.commands.onCommand.addListener(function(command) {
  if (command == "navigate-forward") {
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