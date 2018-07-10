const mongoose = require('mongoose');

const db = 'mongodb://admin:admin1234@ds121341.mlab.com:21341/the_major_pool';

module.exports = (callback) => {
    mongoose.connect(db)
    .then(() => {
        console.log('MongoDB connected...');
        callback();
    })
    .catch(err => console.log(err));
}
