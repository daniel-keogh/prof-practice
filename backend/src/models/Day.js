const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const daySchema = new Schema({
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
        type: [new Schema({
            systolic: {
                type: Number,
                default: 0,
                required: true
            },
            diastolic: {
                type: Number,
                default: 0,
                required: true
            },
            time: {
                type: Date,
                required: true
            }
        }, { _id: false })],
        default: []
    }
});

module.exports = mongoose.model('Day', daySchema);
