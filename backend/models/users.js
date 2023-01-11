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
        type: String,
        sparse: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ['Local', 'Google'],
        default: 'Local',
    },
    refreshToken: {
        type: String
    },
    type: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema)