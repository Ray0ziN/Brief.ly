console.log("this is a script with can change inner content of page");

function getURL() {
  let url = document.URL;

  let urlObj = {
    url,
  };

  if (url.length > 0) {
    chrome.runtime.sendMessage(urlObj);
  }
}
getURL();
