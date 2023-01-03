const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema)