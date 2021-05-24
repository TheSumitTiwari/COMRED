const mongoose = require('mongoose');

const loginLogsSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    ip: {
        type: String,
    },
    device: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('LoginLogs', loginLogsSchema);