const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret;
const User = require('../models/user');

exports.register = (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).json({ 'msg': 'Missing email, password or name' });
    }

    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            res.status(400).json({ 'msg': err });
        }

        if (user) {
            res.status(400).json({ 'msg': 'That user already exists' });
        } else {
            // Hash the user's password & save to DB
            bcrypt.hash(req.body.password, 10)
                .then(hashedPwd => {
                    new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPwd
                    }).save((err, user) => {
                        if (err) {
                            res.status(400).json({ 'msg': err });
                        }
                        return res.status(201).json(user);
                    });
                });
        }
    });
};

exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'Missing email or password' });
    }

    User.findOne({ email: req.body.email })
        .select(['id', 'email', 'password'])
        .exec((err, user) => {
            if (err) {
                res.status(400).json({ 'msg': err });
            }

            if (!user) {
                res.status(400).json({ 'msg': 'User email or password is incorrect' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            res.status(200).json({
                                'msg': 'User logged in successfully',
                                'token': jwt.sign({
                                    id: user.id,
                                    email: user.email
                                }, secret)
                            });
                        } else {
                            res.status(400).json({ 'msg': 'User email or password is incorrect' });
                        }
                    });
            }
        });
};
