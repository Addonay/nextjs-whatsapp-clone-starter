const express = require("express");
const { addMessage, getMessages, addImageMessage, addAudioMessage, getInitialContactsWithMessages } = require("../controllers/MessageController");
const multer = require("multer");
const router = express.Router()

const uploadImage = multer({dest:"uploads/images"})
const uploadAudio = multer({dest:"uploads/recordings"})

router.post("/add-message",addMessage)
router.get("/get-messages/:from/:to", getMessages)
router.post("/add-image-message",uploadImage.single("image"),addImageMessage)
router.post("/add-audio-message",uploadAudio.single("audio"),addAudioMessage)
router.get("/get-initial-contacts/:from", getInitialContactsWithMessages)

module.exports = router