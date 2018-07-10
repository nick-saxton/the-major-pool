const express = require('express');

// Models
const Entrant = require('../../models/entrant');
const Golfer = require('../../models/golfer');

const router = express.Router();

// @route GET api/entries
// @desc Get all entries
// @access Public
router.get('/', (req, res) => {
    Entrant.find()
        .populate('Masters')
        .populate('USOpen')
        .populate('OpenChampionship')
        .populate('PGAChampionship')
        .exec()
        .then(entries => {
            res.json(entries);
        })
        .catch(err => console.log(err));
});

module.exports = router;
