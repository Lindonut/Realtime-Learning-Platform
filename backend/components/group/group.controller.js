const groups = require('../../models/groups');
const groupmembers = require('../../models/groupmembers');
const groupcoowners = require('../../models/groupcoowners');
const users = require('../../models/users');
const crypto = require("crypto");

exports.getAll = async(req, res) =>  {
    try {
        const currentUser = req.userId;
        //const getGroup = await groupmembers.find({ member: req.userId }).populate({path:'member', select: '_id'}).select({"groupID":1, "_id":0, "member":0});
        // const getGroup = await groupmembers.find({ member: req.userId })
        const getGroup = await groups.aggregate([
            {
                $lookup:
                {
                  from: "groupmembers",
                  localField: "_id",
                  foreignField: "groupID",
                  as: "groups"
                }
           },
           {
                $unwind: "$groups"
            },
           {
                $lookup:
                {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner"
                }
            },
            {
                $unwind: "$owner"
            },
           {
                $project: {
                "_id": 1,
                "name": 1,
                "description": 1,
                "owner": "$owner.name",
                "member": "$groups.member",
                }
            }
        ])
        const get = getGroup.filter(x => x.member == currentUser);
        console.log(get);
        res.status(200).json(get);
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
    const {name, description}= req.body;
    const owner = req.userId;
    const linkCode = crypto.randomBytes(4).toString('hex');
    try {
        const newGroup = new groups({ name, description, owner, linkCode});
        await newGroup.save();
        const newMember = new groupmembers({groupID: newGroup._id,member: owner, role: 'Owner'});
        res.status(200).json(newGroup);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getOne = async(req, res) =>  {
    try {
        const group = await groups.findOne({_id: req.params.id});
        const link = process.env.BASEURL+'/infogroup/invitation/'+group._id +'/'+group.linkCode;
        res.status(200).json({group, link});
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
exports.updateOne = async (req,res) => {
    try {
        const member = await groupmembers.findOneAndUpdate(
            {groupID: req.params.groupid, member: req.params.memberid},
            req.body);
        const saveMember = await member.save();
        res.status(200).json(saveMember);
        // const updateMember = Object.assign(member, res.body);
        // const updateMembersave = await updateMember.save();
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.addOne = async (req, res) => {
    try {
        const newGroupmember = new groupmembers(req.body);
        const saveNewGroumember = await newGroupmember.save();
        res.status(200).json(saveNewGroumember);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.joinByLink = async(req, res) => {
    const groupID = req.params.id;
    const code = req.params.code;
    const userID = req.userId;
    const group = await groups.findOne({_id: groupID});
    if (userID===null) {
        res.status(400).json({message: "You need to login to join."});
    }
    if (group.linkCode != code || group == null) {
        res.status(400).json({message: "The link is not right. Please check again."});
    }
    const checkMem =  await groupmembers.find({ groupID: group._id})
    const check = checkMem.filter(x => x.member == currentUser);
    if (check != null) {
        res.status(200).json({success: true, message: "Already joined this group."});
    }
    try {
        const newMember = new groupmembers({ groupID:groupID,member:userID})
        res.status(200).json({success: true, message: "Now you have joined this group."});
    } catch (error) {
        res.status(500).json(error);
    }
}