const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    type: {
        type: Number,
    },
    input: {
        type: String,
    },
    output: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Logs', logsSchema);