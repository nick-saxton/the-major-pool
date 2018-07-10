const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Masters: [{
        type: Schema.Types.ObjectId,
        ref: 'Golfer'
    }],
    USOpen: [{
        type: Schema.Types.ObjectId,
        ref: 'Golfer'
    }],
    OpenChampionship: [{
        type: Schema.Types.ObjectId,
        ref: 'Golfer'
    }],
    PGAChampionship: [{
        type: Schema.Types.ObjectId,
        ref: 'Golfer'
    }]
});

module.exports = mongoose.model('Entrant', entrantSchema);