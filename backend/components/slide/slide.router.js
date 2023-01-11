const express = require('express');

const router = express.Router();

const slideController = require("./slide.controller");


router.get('/:idpp', slideController.getAllSlideOfPresentation)
router.post('/:idpp/add', slideController.addSlideOfPresentation)

router.delete('/:idpp/:idslide/delete', slideController.deleteSlideOfPresentation)
router.patch('/:idpp/:idslide/update', slideController.updateSlideOfPresentation)
module.exports = router;