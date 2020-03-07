const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    },
    water: {
        type: Number,
        default: 0
    },
    sleep: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Day', daySchema);
