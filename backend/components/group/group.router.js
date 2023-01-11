const express = require('express');
const verifyToken = require('../../middlewares/auth');

const router = express.Router();

const groupController = require("./group.controller");

router.get("/", verifyToken, groupController.getAll);
router.get("/:id", groupController.getOne);
router.post("/:id/updateDescription", groupController.updateDescription);
router.post("/invitation/:id/:code",verifyToken, groupController.joinByLink);
router.get("/:id/member", groupController.getGroupMember);
router.post("/add",verifyToken, groupController.addGroup);
router.post("/addmember", groupController.addOne);
router.post("/:groupid/sendinvitationmail", groupController.sendInvitation);
router.post("/:groupid/joingroup/:token", groupController.joinGroup);
router.delete("/:groupid/member/delete/:memberid", groupController.deleteMember);
router.post("/:groupid/member/update/:memberid", groupController.updateMember);
router.post("/:groupid/:memberid", groupController.getMember);
router.post("/addmember", groupController.addOne);
router.delete("/:groupid", groupController.deleteGroup);
module.exports = router;