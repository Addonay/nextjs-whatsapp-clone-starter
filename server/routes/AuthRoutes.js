const express = require("express");
const router = express.Router()
const { checkUser, onBoardUser, getAllUsers, generateToken } = require("../controllers/AuthController");


router.post("/check-user", checkUser)
router.post("/onboard-user", onBoardUser)
router.get("/get-contacts", getAllUsers)
router.get("/generate-token/:userId",generateToken)

module.exports = router;