const { validationResult } = require('express-validator');
const Day = require('../models/Day');
const User = require('../models/User');

exports.addDay = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    Day.findOne({
        user_id: req.body.user_id,
        date: req.body.date
    }).then(day => {
        if (day) {
            res.json(day)
        } else {
            User.findById(req.body.user_id)
                .then(user => {
                    if (user) {
                        const day = new Day({
                            user_id: req.body.user_id,
                            date: req.body.date
                        });

                        user.days.push(day._id);
                        user.save();

                        day.save()
                            .then(day => {
                                res.json(day)
                            })
                    } else {
                        res.status(404).json({ err: "User with id user_id not found" })
                    }
                });
        }
    });
};

exports.updateDay = (req, res) => {
    Day.findById(req.params.id)
        .then(day => {
            if (day) {
                const { water } = req.body;

                day.water = water;

                day.save()
                    .then(day => {
                        res.json(day);
                    });
            }
        });
};

exports.getUsersDays = (req, res) => {
    Day.find({ user_id: req.params.userId })
        .then(days => {
            if (days) {
                const startDate = new Date(req.query.start_at);
                const endDate = new Date(req.query.end_at);

                // Return only the days between `start_at` and `end_at`
                const filteredDays = days.filter(day => {
                    if (day.date >= startDate && day.date <= endDate) {
                        return day;
                    }
                })
                res.json(filteredDays);
            }
        })
        .catch(err => {
            console.log(err);
        })
}