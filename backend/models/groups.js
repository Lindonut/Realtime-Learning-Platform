const mongoose = require('mongoose');
const Schema = mongoose.Schema

const groupSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'users',
        require: true
    }
})

module.exports = mongoose.model('groups', groupSchema)