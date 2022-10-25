console.log("popupjs");

// let url = window.document.URL;
// console.log(url)
const button = document.getElementById("sendlink");
const audioController = document.getElementById("my-audio");

const URL = "http://localhost:3000/";

let urlObj = {};

const change = "audio";
audioController.setAttribute("src", `http://localhost:3000/${change}`);

function getTabInfo() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      var tab = tabs[0];
      var url = tab.url;
      //   console.log(tab);
      urlObj.title = tab.title;
      urlObj.url = tab.url;
    }
  );
}

button.addEventListener("click", async () => {
  getTabInfo();
  console.log(urlObj);
  postData(URL, { urlObj }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
});

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
