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
    link: {
        type: String,
        require: true,
        unique: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['Public', 'Group'],
        default: 'Public'
    }
})

module.exports = mongoose.model('presentations', presentationSchema)