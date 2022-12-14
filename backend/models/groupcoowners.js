const mongoose = require('mongoose');
const Schema = mongoose.Schema

const groupCoownerSchema = new Schema ({
    groupID: {
        type: Schema.Types.ObjectId,
        require: true
    },
    coowner: {
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('groupcoowners', groupCoownerSchema)