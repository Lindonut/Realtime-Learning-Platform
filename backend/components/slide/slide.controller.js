const slides = require('../../models/slides');


exports.getAllSlideOfPresentation = async(req, res) => {
    try {
        const idpresent = req.params.idpp;
        const listSlide = await slides.find({presentation: idpresent});
        return res.status(200).json(listSlide);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.addSlideOfPresentation = async(req, res) => {
    try {
        const presentation = req.params.idpp;
        const type = "Multiple Choice";
        const heading = "";
        const paragraph = "";
        const datachoice = [7,8,9,10];
        const choices = datachoice;
        const layout = "Bars";
        const image = "";
        const dataresult = [0,0,0,0];
        const result = dataresult;
        
        const newslide = await slides.create(
            {presentation, type, heading, paragraph, choices, layout, image, result}
            );
        const newSave = await newslide.save();
        res.status(200).json(newslide);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
}
exports.deleteSlideOfPresentation = async(req, res) => {
    try {
        const deleteOne = await slides.findOneAndDelete({ _id: req.params.idslide })
        res.status(200).json(deleteOne);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.updateSlideOfPresentation = async(req,res) => {
    try {
        const slide = await slides.findOneAndUpdate(
            { _id: req.params.idslide },
            req.body);
        const saveslide = await slide.save();
        res.status(200).json(slide);
    } catch (error) {
        res.status(500).json(error);
    }
}