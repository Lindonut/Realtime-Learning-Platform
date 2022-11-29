const groups = require('../../models/groups');
const users = require('../../models/users');

exports.getAll = async(req, res) =>  {
    const allGroup = groups.find({});
    res.json({ success: true, allGroup })
};
