const express = require('express');

const router = express.Router();

const groupController = require("./group.controller");

router.get("/", groupController.getAll);
router.get("/:id", groupController.getOne);
router.get("/:id/member", groupController.getGroupMember);
router.post("/add", groupController.addGroup);

router.delete("/:groupid/member/delete/:memberid", groupController.deleteOne);

module.exports = router;