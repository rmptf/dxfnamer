const mongoose = require('mongoose');
const path = require("path");

const DfxFileSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'No author selected.'],
    }
});

module.exports = mongoose.model('DfxFile', DfxFileSchema);