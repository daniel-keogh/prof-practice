const { validationResult } = require('express-validator');
const User = require('../models/User');
const Day = require('../models/Day');

exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ msg: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.updateUser = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ msg: 'User not found' });
            } else {
                const { name, email, profileImage } = req.body;

                // Update the name & email
                user.name = name;
                user.email = email;
                user.profileImage = profileImage;

                return user.save();
            }
        })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.deleteUser = (req, res) => {
    // Delete the user by their ID
    User.deleteOne({ _id: req.params.id })
        .then(data => {
            // Also delete all of the days logged by this user
            Day.deleteMany({ user_id: req.params.id })
                .then(() => {
                    res.status(200).json(data);
                })
        })
        .catch(err => {
            res.status(400).json(err);
        });
};
