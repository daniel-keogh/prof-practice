const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret;
const User = require('../models/user');

exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'Missing email or password' });
    }

    User.findOne({ email: req.body.email })
        .select('+password')
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
                                    email: user.email,
                                    name: user.name
                                }, secret)
                            });
                        } else {
                            res.status(400).json({ 'msg': 'User email or password is incorrect' });
                        }
                    });
            }
        });
};
