const mongoose = require('mongoose');
const Schema = mongoose.Schema

const groupMemberSchema = new Schema ({
    groupID: {
        type: Schema.Types.ObjectId,
        require: true
    },
    member: {
        type: Schema.Types.ObjectId,
        unique: true,
    },
    role: {
        type: String,
        enum: ['Owner', 'Co-owner', 'Member'],
        default: 'Member'
    }
})

module.exports = mongoose.model('groupmembers', groupMemberSchema)