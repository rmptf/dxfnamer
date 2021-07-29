const mongoose = require('mongoose');

const NewDataSchema = new mongoose.Schema({
    newName: {
        type: String,
        required: [true, 'No name entered.'],
    },
    comment: {
        type: String,
        required: [true, 'No comment entered.'],
    }
});

module.exports = mongoose.model('NewData', NewDataSchema);