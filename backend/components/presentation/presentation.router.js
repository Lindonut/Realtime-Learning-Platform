const express = require('express');

const router = express.Router();

const presentationController = require("./presentation.controller");

router.get('/', presentationController.getAllPresentation)

router.post('/add', presentationController.addPresentation)

router.get('/:idpp', presentationController.getOnePresentation)

router.delete('/:idpp/delete', presentationController.delatePresentation)

router.patch('/:idpp/update', presentationController.updatePresentation)
module.exports = router;
