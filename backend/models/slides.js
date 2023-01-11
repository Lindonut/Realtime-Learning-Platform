const mongoose = require('mongoose');
const Schema = mongoose.Schema

const slideSchema = new Schema ({
    presentation: {
        type: Schema.Types.ObjectId,
    },
    type: {
        type: String,
        enum: ['Multiple Choice', 'Heading', 'Paragraph'],
    },
    heading: {
        type: String,
    },
    paragraph: {
        type: String,
    },
    choices: {
        type: Map,
        of: Int32Array
    },
    layout: {
        type: String,
        enum: ['Bars', 'Donut', 'Pie','Dots'],
    },
    image: {
        type: String,
    }
})

module.exports = mongoose.model('slides',slideSchema);