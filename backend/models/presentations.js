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
        type: [Schema.Types.ObjectId]
    },
    slide: 
    {
        type: [String]
    },
    colab:
    {
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('presentations', presentationSchema)