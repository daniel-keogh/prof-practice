const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now,
        expires: "366d"
    },
    sleep: {
        type: Number,
        default: 0
    },
    water: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    bloodPressure: {
        type: {
            systolic: {
                type: Number,
                default: 0
            },
            diastolic: {
                type: Number,
                default: 0
            }
        }
    }
});

module.exports = mongoose.model('Day', daySchema);
