const mongoose = require('mongoose');
const Schema = mongoose.Schema

const presentationSchema = new Schema ({
    name: {
        type: String,
        require: true,
        unique: true
    },
    owner: {
        type: Schema.Types.ObjectId,
    },
    code: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Public', 'Group'],
        default: 'Public'
    },
    group: {
        type: [Schema.Types.ObjectId],
        sparse: true
    },
    slide: 
    {
        type: [String]
    },
    collab:
    {
        type: [Schema.Types.ObjectId],
        sparse: true
    }
})

module.exports = mongoose.model('presentations', presentationSchema)