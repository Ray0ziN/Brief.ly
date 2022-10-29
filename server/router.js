const express = require("express");
const { uploadAudio, getAudioById } = require("./controller");
const Router = express.Router();


Router.route("/").post(uploadAudio)
Router.route("/audio/:id").get(getAudioById)

module.exports = Router