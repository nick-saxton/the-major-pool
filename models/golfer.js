const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const golferSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tournament: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Golfer', golferSchema);
