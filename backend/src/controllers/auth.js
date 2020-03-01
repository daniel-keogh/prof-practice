const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const secret = require('../config/keys').JWT_SECRET;
const User = require('../models/user');

exports.registerUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(user => {
            const { _id, name, email, registered_since } = user;
            res.status(201).json({
                _id,
                name,
                email,
                registered_since
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });

};

exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    let foundUser;
    User.findOne({ email: req.body.email })
        .select('+password')
        .exec()
        .then(user => {
            if (!user) {
                const error = new Error();
                error.status = 401;
                throw error;
            } else {
                foundUser = user;
                return bcrypt.compare(req.body.password, foundUser.password);
            }
        })
        .then(isMatch => {
            if (isMatch) {
                res.status(200).json({
                    msg: 'User logged in successfully',
                    _id: foundUser._id,
                    token: jwt.sign({
                        _id: foundUser._id,
                        email: foundUser.email,
                        name: foundUser.name,
                        registered_since: foundUser.registered_since
                    }, secret)
                });
            } else {
                const error = new Error();
                error.status = 401;
                throw error;
            }
        })
        .catch(err => {
            if (err.status === 401) {
                res.status(401).json({ msg: 'User email or password is incorrect' });
            } else {
                res.status(400).json(err);
            }
        });
};

exports.passwordReset = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array()[0].msg });
    }

    User.findOne({ email: req.body.email })
        .select('+password')
        .exec()
        .then(user => {
            if (!user) {
                res.status(404).json({ msg: 'User with that email address not found' })
            }

            // Check if the old_password matches
            bcrypt.compare(req.body.old_password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        user.password = req.body.password;
                        user.save()
                            .then(user => {
                                res.status(200).json({ msg: 'Password reset successfully' });
                            });
                    } else {
                        res.status(401).json({ msg: 'Old Password is incorrect' });
                    }
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
};
