const express = require('express');

const router = express.Router();

const userinfoController = require("./userinfo.controller");

router.get("/", userinfoController.getAll)

module.exports = router;