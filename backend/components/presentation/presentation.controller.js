const presentations = require('../../models/presentations')

exports.getAllPresentation = async (req, res) => {
    try {
        const listPresentation = await presentations.find();
        res.status(200).json(listPresentation);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.addPresentation = async (req, res) => {
    try {
        const link = "123";
        const code = "123";
        const type = "Public";
        const group = [];
        const slide = [];
        const colab = null;
        const { name, owner } = req.body;

        const newpre = await presentations.create({name, owner, link, code, type, group, slide, colab});
        const newSave = await newpre.save();
        res.status(200).json(newpre);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
}
exports.delatePresentation = async (req, res) => {
    try {
        const deleteOne = await presentations.findOneAndDelete({ _id: req.params.idpp })
        res.status(200).json(deleteOne);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getOnePresentation = async (req, res) => {
    try {
        const listPresentation = await presentations.find({ _id: req.params.idpp });
        res.status(200).json(listPresentation);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.updatePresentation = async (req, res) => {
    try {
        const presentation = await presentations.findOneAndUpdate(
            { _id: req.params.idpp },
            req.body);
        const savePresentation = await presentation.save();
        res.status(200).json(savePresentation);
    } catch (error) {
        res.status(500).json(error);
    }
}