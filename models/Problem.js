const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    div: String,
    id: Number,
    name: String,
    link: String,
    judge: String,
    level: Number
});

module.exports = User = mongoose.model('problem', problemSchema);