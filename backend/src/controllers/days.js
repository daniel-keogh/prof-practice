const { validationResult } = require('express-validator');
const Day = require('../models/Day');
const User = require('../models/User');

exports.addDay = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    const today = new Date().toISOString().split('T')[0];

    Day.findOne({
        user_id: req.user._id,
        date: req.body.date || today
    }).then(day => {
        if (day) {
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
                            sleep: req.body.sleep
                        });

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    Day.findById(req.params.id)
        .then(day => {
            if (day) {
                const { water, weight, sleep } = req.body;

                day.water = water;
                day.weight = weight;
                day.sleep = sleep;

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
    Day.find({ user_id: req.params.userId })
        .then(days => {
            if ('start_at' in req.query && 'end_at' in req.query) {
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
                res.status(200).json(days);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}