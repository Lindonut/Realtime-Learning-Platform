const groups = require('../../models/groups');
const groupmembers = require('../../models/groupmembers');
const users = require('../../models/users');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

exports.getAll = async(req, res) =>  {
    try {
        const currentUser = req.userId;
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
        res.status(200).json(get);
    } catch (error) {
        res.status(500).json(error);
    }
};
exports.getGroupMember = async(req, res) =>  {
    try {
        const group = req.params.id;
        const listMember = await groupmembers.aggregate([
            {
                $lookup:
                {
                  from: "users",
                  localField: "member",
                  foreignField: "_id",
                  as: "members"
                }
           },
           {
                $unwind: "$members",
            },
           {
                $project: {
                "_id": 0,
                "member": 1,
                "groupID": 1,
                "role": 1,
                "name": "$members.name",
                "email": "$members.email",
                }
            }
        ])
        const list = listMember.filter(x => x.groupID == group);
        res.status(200).json(list);
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
        await newMember.save();
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

exports.getMember = async(req, res) =>  {
    const groupID = req.params.groupid;
    const currentUser = req.params.memberid;
    try {
        const member = await groupmembers.findOne({groupID: groupID, member: currentUser});
        const role = member.role;
        return res.status(200).json({success: true, member, role});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteMember = async(req, res) =>  {
    try {
        const mem = await groupmembers.findOneAndDelete({groupID: req.params.groupid, member: req.params.memberid})
        res.status(200).json(mem);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateMember = async (req,res) => {
    const role = req.body.role;
    const list = await groupmembers.find({groupID: req.params.groupid, role: "Co-owner"});
    let newRole;
    if(role == "Co-owner")
    {
        newRole = "Member";
    }
    else if (role == "Member")
    { 
        if(list.length < 3)
        {
            newRole = "Co-owner";
        }
        else
        {
            return res.json({success: false, message:"Can not promote. Has reached the limit of co-owner."})
        }
    }
    try {
        const member = await groupmembers.findOneAndUpdate(
            {groupID: req.params.groupid, member: req.params.memberid},{role: newRole});
        await member.save();
        return res.json({success:true, message: "Change role successfully"});
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

exports.deleteGroup = async (req, res) => {
    const groupID = req.params.groupid;
    try
    {
        await groups.findOneAndDelete({_id: groupID});
        await groupmembers.deleteMany({groupID:groupID});
        return res.json({success: true, message: "Delete group successfully."});
    } catch {
        res.json({success: false, message: "Can not delete group right now. Please try again later."});
    }
    

}

exports.joinByLink = async(req, res) => {
    const groupID = req.params.id;
    const code = req.params.code;
    const userID = req.userId;
    const group = await groups.findOne({_id: groupID});
    if (userID===null) {
        return res.status(403).json({success: false, message: "You need to login to join."});
    }
    if (code != group.linkCode || !group) {
        return res.status(400).json({success: false, message: "The link is not right. Please check again."});
    }
    const checkMem =  await groupmembers.find({ groupID: group._id})
    const check = checkMem.filter(x => x.member == userID);
    if (check.length > 0){
        return res.json({success: true, message: "Already joined this group."});
    }
    else {
        try {
            const newMember = new groupmembers({ groupID:groupID,member:userID})
            await newMember.save();
            return res.json({success: true, message: "Now you have joined this group."});
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

exports.updateDescription = async(req, res) => {
    const groupID = req.params.id;
    const description = req.body.description;
    try {
        await groups.findOneAndUpdate(
            { _id: groupID },{ $set: {description: description }}
        )
        return res.json({ success: true, message: "Update group's description successfully." })
    } catch (error) {
        return res.status(400).json({ success: false, message: "Can not update group's description." })
    }
    
}

function generateInvitationEmailTemplate(owner, ownerMail, group, link) {
	return `
	    <!DOCTYPE html>
        <html>
            <head>
			    <meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<style>
					h1{
						font-size: 20px;
						padding: 5px;
					}
				</style>
			</head>
			<body>
					<div>
						<div style="max-width: 620px; margin:0 auto; font-family:sans-serif;color:#272727;background: #f6f6f6">
							<h1 style="padding:10px;text-align:center;color:#272727;">
							JOIN MY GROUP
							</h1>
							<p style="text-align:center;">You have been invited by ${owner} (${ownerMail}) to join the group "${group}" in the Realtime Learning Platform.</p>
                            <p style="text-align:center;">To accept this invitation, please follow the link below.</p>
							<div style="overflow: hidden;display: flex;justify-content: center;align-items: center;">
								<a href=${link} style="background: #0000D1; text-align:center;font-size:16px;margin:auto;padding:15px 30px; color:#ffffff; text-decoration:None;">JOIN</a>
							</div>
						</div> 
                    </div>
           </body>`
}

function generateVerifyToken(email) {
	return jwt.sign({email:email}, process.env.VERIFY_TOKEN_SECRET, {expiresIn:"1d"});
}

function sendInvitationMail(owner, ownerMail, group, groupID, email) {
    try {
        const transporter=nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        let token = generateVerifyToken(email);
        let url = process.env.BASEURL+'/'+groupID+'/invitation/'+token;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Invite Member To Join Group On Realtime Learning Platform',
            html: generateInvitationEmailTemplate(owner, ownerMail, group, url),
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else{
                console.log("Email sent successfully. Info: " + info.response);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.sendInvitation = async(req, res) => {
    const groupID = req.params.groupid;
    const userID = req.body.userID;
    const email = req.body.email;
    const owner = await users.findOne({ _id: userID });
    const group = await groups.findOne({ _id: groupID });
    try {
		sendInvitationMail(owner.name, owner.email, group.name, groupID, email);
		res.json({ success: true,  message: "Sent invitation mail successfully."})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: "Can't send." })
	}
}

exports.joinGroup = async(req, res) => {
    const groupID = req.params.groupid;
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.VERIFY_TOKEN_SECRET)
	let email = decoded.email
    const mem = await users.findOne({ email: email});
    const list = await groupmembers.find({groupID: groupID, member: mem._id});
    if(list.length > 0)
    {
        return res.json({ success: true,  message: "You already join this group."})
    }
    else{
        try {
            const newMem = new groupmembers({groupID: groupID,member: mem._id, role: 'Member'})
            await newMem.save();
            return res.json({ success: true,  message: "Now you have joined this group."})
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Can't join." })
        }
    }

}
