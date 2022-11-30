const groups = require('../../models/groups');
const groupmembers = require('../../models/groupmembers');
const groupcoowners = require('../../models/groupcoowners');
const users = require('../../models/users');

exports.getAll = async(req, res) =>  {
    try {
        const allGroup = await groups.find();
        res.status(200).json(allGroup);
    } catch (error) {
        res.status(500).json(error);
    }
};
exports.getGroupMember = async(req, res) =>  {
    try {
        const listMember = await groupmembers.find({groupID: req.params.id});
        res.status(200).json(listMember);
    } catch (error) {
        res.status(500).json(error);
    }
};
exports.addGroup = async(req, res) => {
    try {
        const newGroup = new groups(req.body);
        const saveNewGroup = await newGroup.save();
        res.status(200).json(saveNewGroup);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getOne = async(req, res) =>  {
    try {
        const group = await groups.findOne({_id: req.params.id});
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteOne = async(req, res) =>  {
    try {
        const member = await groupmembers.findOneAndDelete({groupID: req.params.groupid, member: req.params.memberid})
        res.status(200).json(member);


    } catch (error) {
        res.status(500).json(error);
    }
};
