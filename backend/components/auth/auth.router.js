const express = require('express');
const verifyToken = require('../../middlewares/auth');



const router = express.Router();

const authController = require("./auth.controller");

// router.get("/", verifyToken, authController.checkLogged)

router.post("/register", authController.register);

router.post("/login", authController.login);


module.exports = router;