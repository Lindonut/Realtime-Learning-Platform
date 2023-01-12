const presentations = require('../../models/presentations')
const users = require('../../models/users');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

exports.getAllPresentation = async (req, res) => {
    try {
        const currentUser = req.userId;
        const listPresentation = await presentations.find({$or: [{owner: currentUser},{collab: currentUser}]});
        console.log("list",listPresentation);
        res.status(200).json(listPresentation);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.addPresentation = async (req, res) => {
    try {
        const code = crypto.randomBytes(4).toString('hex');
        const type = "Public";
        const group = [];
        const slide = [];
        const collab = [];
        const { name, owner } = req.body;

        const newpre = await presentations.create({name, owner, code, type, group, slide, collab});
        await newpre.save();
        res.status(200).json(newpre);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
}
exports.deletePresentation = async (req, res) => {
    try {
        const deleteOne = await presentations.findOneAndDelete({ _id: req.params.idpp })
        res.status(200).json(deleteOne);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getOnePresentation = async (req, res) => {
    try {
        const presentation = await presentations.findOne({ _id: req.params.idpp });
        const name = presentation.name;
        const collab = presentation.collab;
        const url = process.env.BASEURL+"/presentation/"+presentation.owner+"/"+presentation._id+"/slideshow/"+presentation.code
        return res.status(200).json({presentation, name, url,collab});
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

function generateCollabEmailTemplate(owner, ownerMail, ppName, link) {
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
							INVITE TO COLLABORATE 
							</h1>
							<p style="text-align:center;">You have been invited by ${owner} (${ownerMail}) to collaborate on presentation ${ppName}.</p>
                            <p style="text-align:center;">To accept this invitation, please follow the link below.</p>
							<div style="overflow: hidden;display: flex;justify-content: center;align-items: center;">
								<a href=${link} style="background: #0000D1; text-align:center;font-size:16px;margin:auto;padding:15px 30px; color:#ffffff; text-decoration:None;">ACCEPT</a>
							</div>
						</div> 
                    </div>
           </body>`
}

function generateVerifyToken(email) {
	return jwt.sign({email:email}, process.env.VERIFY_TOKEN_SECRET, {expiresIn:"1d"});
}

function sendCollabMail(owner, ownerMail, ppName, idpp, email) {
    try {
        const transporter=nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        let token = generateVerifyToken(email);
        let url = process.env.BASEURL+'/presentation/'+idpp+'/collaboration/'+token;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Invite To Collaborate On Presentation - Realtime Learning Platform',
            html: generateCollabEmailTemplate(owner, ownerMail, ppName, url),
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

exports.sendMailCollab = async (req, res) => {
    const idpp = req.params.idpp;
    const userID = req.body.userID;
    const email = req.body.email;
    const owner = await users.findOne({ _id: userID });
    const pp = await presentations.findOne({ _id: idpp });
    try {
		sendCollabMail(owner.name, owner.email, pp.name, idpp, email);
		res.json({ success: true,  message: "Sent invitation colaborate mail successfully."})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: "Can't send." })
	}
}

exports.joinCollab =  async (req, res) => {
    const idpp = req.params.idpp;
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.VERIFY_TOKEN_SECRET)
    let email = decoded.email
    const mem = await users.findOne({ email: email});
    const presentation = await presentations.find({_id: idpp, collab: mem._id});
    console.log(presentation);
    if(presentation.length > 0)
    {
        return res.json({ success: true,  message: "You already have collaborated in this presentation."})
    }
    else{
        try {
            await presentations.updateOne({ _id: idpp },{ $push: { collab: mem._id } })
            return res.json({ success: true,  message: "Now you have collaborated in this presentation."})
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Can't join." })
        }
    }
}

exports.deleteCollab = async(req, res) => {
    console.log("col")
    const col = req.body.collab;
    console.log(col)
    try {
        const pre = await presentations.updateOne({ _id: req.params.idpp }, { $pull: { collab: { $in: [col] } } });
        return res.status(200).json({success: true, message: "Remove successfully."});
    } catch (error) {
        res.status(500).json({success: true, message: "Remove successfully."});
    }
}