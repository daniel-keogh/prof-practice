const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').JWT_SECRET;
const User = require('../models/user');

exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'Missing email or password' });
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
