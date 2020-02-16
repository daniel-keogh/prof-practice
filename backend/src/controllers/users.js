const User = require('../models/user');

exports.registerUser = (req, res, next) => {
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
            new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).save((err, user) => {
                if (err) {
                    res.status(400).json({ 'msg': err });
                }
                return res.status(201).json(user);
            });
        }
    });
};

exports.getUser = (req, res, next) => {
    User.findById({ _id: req.params.id }, (err, data) => {
        if (!data) {
            res.status(404).send({});
        } else {
            res.status(200).send(data);
        }
    });
};

exports.updateUser = (req, res, next) => {
    // User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
    //     if (err) {
    //         res.status(404).send(err.message);
    //     } else {
    //         res.status(200).send(data);
    //     }
    // });
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.status(200).send(data);
        }
    });
};
