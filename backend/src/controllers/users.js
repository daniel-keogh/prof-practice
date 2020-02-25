const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ 'msg': 'User not found' });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.updateUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 'errors': errors.array() });
    }

    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ 'msg': 'User not found' });
            } else {
                const { name, email } = req.body;

                user.name = name;
                user.email = email;

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
    User.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};
