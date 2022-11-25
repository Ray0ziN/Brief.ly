const { arrayBuffer } = require("stream/consumers");

function loadAudio(url, loop, done) {
  fetch(url, { mode: "no-cors" })
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      console.log("audio " + url + " loaded");
      var sourceNode = context.createBufferSource();
      sourceNode.buffer = audioBuffer;
      done(null, sourceNode);
      sourceNode.start();
      sourceNode.loop = loop;
    });
}

