const { validationResult } = require('express-validator');
const Day = require('../models/Day');
const User = require('../models/User');

exports.addDay = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    // Check if a Day with the given date already exists.
    // If a date wasn't specified in `req.body`, create a new Day with today's date instead
    const today = new Date().toISOString().split('T')[0];

    Day.findOne({
        user_id: req.user._id,
        date: req.body.date || today
    }).then(day => {
        if (day) {
            // Day with given date already exists
            res.status(202).json(day)
        } else {
            User.findById(req.user._id)
                .then(user => {
                    if (user) {
                        const day = new Day({
                            user_id: req.user._id,
                            date: req.body.date || today,
                            water: req.body.water,
                            weight: req.body.weight,
                            sleep: req.body.sleep,
                            bloodPressure: req.body.bloodPressure
                        });

                        // Add the new Day to the user's `days` array
                        user.days.push(day._id);
                        user.save();

                        return day.save();
                    } else {
                        res.status(404).json({ msg: "User with `user_id` not found" })
                    }
                })
                .then(day => {
                    res.status(201).json(day);
                });
        }
    }).catch(err => {
        res.status(500).json(err);
    });
};

exports.updateDay = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    // Find the Day by its ID
    Day.findById(req.params.id)
        .then(day => {
            if (day) {
                const { water, weight, sleep, bloodPressure } = req.body;

                // Update the values
                day.water = water;
                day.weight = weight;
                day.sleep = sleep;
                day.bloodPressure = bloodPressure;

                return day.save();
            } else {
                res.status(404).json({ msg: 'Day not found' });
            }
        }).then(day => {
            res.status(200).json(day);
        }).catch(err => {
            res.status(500).json(err);
        });
};

exports.getUsersDays = (req, res) => {
    // Get all the Days associated with the given user
    Day.find({ user_id: req.params.userId })
        .then(days => {
            if ('start_at' in req.query && 'end_at' in req.query) {
                // Filter the days
                const startDate = new Date(req.query.start_at);
                const endDate = new Date(req.query.end_at);

                // Return only the days between `start_at` and `end_at`
                const filteredDays = days.filter(day => {
                    if (day.date >= startDate && day.date <= endDate) {
                        return day;
                    }
                })
                res.status(200).json(filteredDays);
            } else {
                // Send all of the days
                res.status(200).json(days);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}