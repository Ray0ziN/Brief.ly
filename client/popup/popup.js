console.log("popupjs");

const button = document.getElementById("sendlink");
const audioController = document.getElementById("my-audio");

const URL = "http://localhost:3000";

let urlObj = {};

// const change = "P2xR6j9MiTh4I7ljPCA_J.mp3";
// const change = "P2xR6j9MiTh4I7ljPCA_J";
// const change = "E3AU4Lu7rQwRl2fwBGSZp"
// const change = "P6fxh4eKWSgK-SyZLrsdG";


chrome.storage.sync.get(["key"], function (result) {
  console.log("Value currently is " + result.key);
  audioController.setAttribute(
    "src",
    `http://localhost:3000/audio/${result.key}`
  );
});

function getTabInfo() {
  console.log("get tab info is called");
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    async function (tabs) {
      var tab = tabs[0];
      var url = tab.url;
      console.log(tab.title, tab.url);
      urlObj.title = await tab.title;
      urlObj.url = await tab.url;
    }
  );
}
getTabInfo();

button.addEventListener("click", async () => {
  postData(URL, { urlObj }).then((data) => {
    // console.log("data received");
    console.log(data); // JSON data parsed by `data.json()` call
    const uid = data.urlObj.id;
    // const key = "id";

    chrome.storage.sync.set({ key:uid},(value,key) => {
      console.log("Value is set to " + value,key);
      location.reload();
    });
  });
  // location.reload();
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

async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "audio/mp3",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json();
}

// getData(`${URL}/audio/${uid}`).then((data) => {
//   console.log(data);
// });
