const express = require("express");
const app = express();
const { spawn } = require("child_process");
const fs = require("fs");

app.use(express.json());

app.post("/", (req, res) => {
  // const { url } = req.body;
  const {
    urlObj: { url, title },
  } = req.body;

  const urlObj = {
    url,
    title,
  };


  try {
    const childPython = spawn("python", ["./audio.py", JSON.stringify(urlObj)]);

    childPython.stdout.on("data", (data) => {
      console.log(`stdout:${data}`);
    });
    childPython.stderr.on("data", (data) => {
      console.error(`stdout:${data}`);
    });

    res.json({urlObj }); // return a uniqe id with nanoid
    // res.sendFile(__dirname + '/welcome.mp3')
  } catch (error) {
    console.log(error);
  }
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  // sample_video.mp4

  // get video stats (about 61MB)
  const videoPath = "audio/sample_video.mp4";
  const videoSize = fs.statSync("audio/sample_video.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});
app.get("/audio", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  // sample_video.mp4

  // get video stats (about 61MB)
  const videoPath = "audio/welcome.mp3";
  const videoSize = fs.statSync("audio/welcome.mp3").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/mp3",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is listening ${PORT}...`);
});
