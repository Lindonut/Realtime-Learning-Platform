const express = require('express');
const verifyToken = require('../../middlewares/auth');

const router = express.Router();

const presentationController = require("./presentation.controller");

router.get('/',verifyToken, presentationController.getAllPresentation)

router.post('/add', presentationController.addPresentation)
router.post('/:idpp/sendcollabmail', presentationController.sendMailCollab)
router.post('/:idpp/joincollab/:token', presentationController.joinCollab)
router.get('/:idpp', presentationController.getOnePresentation)
router.post('/:idpp/deletecollab', presentationController.deleteCollab)
router.delete('/:idpp/delete', presentationController.deletePresentation)

router.patch('/:idpp/update', presentationController.updatePresentation)
module.exports = router;
