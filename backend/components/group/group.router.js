const express = require('express');
const verifyToken = require('../../middlewares/auth');

const router = express.Router();

const groupController = require("./group.controller");

router.get("/", verifyToken, groupController.getAll);
router.get("/:id", groupController.getOne);
//router.get("/invitation/:id/:code",verifyToken, groupController.confirmJoin);
router.post("/confirmedjoin/:id/:code",verifyToken, groupController.joinByLink);
router.get("/:id/member", groupController.getGroupMember);
router.post("/add",verifyToken, groupController.addGroup);
router.post("/addmember", groupController.addOne);

router.delete("/:groupid/member/delete/:memberid", groupController.deleteOne);
router.patch("/:groupid/member/update/:memberid", groupController.updateOne);
router.post("/addmember", groupController.addOne);
module.exports = router;