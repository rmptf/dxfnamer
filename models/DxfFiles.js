const mongoose = require('mongoose');

const DfxFileSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, 'No author selected.'],
    }
});

module.exports = mongoose.model('DfxFile', DfxFileSchema);