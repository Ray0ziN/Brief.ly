
fetch
// const audioController = document.getElementById("my-audio");
// // const change = "E3AU4Lu7rQwRl2fwBGSZp"
// const change = "GINUCw_YxA5H0M258bxca"
// audioController.setAttribute("src", `http://localhost:3000/audio/${change}`);

async function getData(url = "http://localhost:3000/audio/${change}") {
  // Default options are marked with *
  const result = await fetch(url, {
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
  console.log(result)
}

getData()
