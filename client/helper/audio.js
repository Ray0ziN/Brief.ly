const { spawn } = require("child_process");

const urlObj = {
  url: "this is new audio",
};

const getAudio = (urlObj) => {
  try {
    const childPython = spawn("python", ["audio.py", JSON.stringify(urlObj)]);

    childPython.stdout.on("data", (data) => {
      console.log(`stdout:${data}`);
    });
    childPython.stderr.on("data", (data) => {
      console.error(`stdout:${data}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAudio };
