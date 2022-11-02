const express = require("express");
const { uploadAudio, getAudioById,uploadAudioCache } = require("./controller");
const Router = express.Router();


Router.route("/").post(uploadAudio)
Router.route("/test").post(uploadAudioCache)

Router.route("/audio/:id").get(getAudioById)

module.exports = Router