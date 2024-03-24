// contentScript.js

var urlElements = document.querySelectorAll('[href]');
var nextChapterElement = Array.from(urlElements).find(element => {
  return element.textContent.toLowerCase().includes('next');
});

if (nextChapterElement) {
  var nextChapterLink = nextChapterElement.href;
 
  chrome.runtime.sendMessage({ type: "updateTab", url: nextChapterLink });
} else {
  console.error("Next chapter element not found.");
}
