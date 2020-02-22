const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const secret = require('../config/keys').JWT_SECRET;
const User = require('../models/user');

exports.registerUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ 'errors': errors.array() });
    } else {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        user.save()
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
};

exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ 'errors': errors.array() });
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
                    'msg': 'User logged in successfully',
                    'token': jwt.sign({
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
                res.status(err.status).json({ 'msg': 'User email or password is incorrect' });
            }
            res.status(400).json(err);
        });
};

exports.passwordReset = (req, res) => {
    User.findOne({ email: req.body.email })
        .select('+password')
        .exec()
        .then(user => {
            if (!user) {
                res.status(404).json({ 'msg': 'User with that email not found' });
            } else {
                user.password = req.body.password;
                return user.save();
            }
        })
        .then(user => {
            res.status(200).json({ 'msg': 'Password reset successful' });
        })
        .catch(err => {
            res.status(400).json(err);
        });
};
