const User = require('../models/user');

exports.registerUser = (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).json({ 'msg': 'Missing email, password or name' });
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).json({ 'msg': 'That user already exists' });
            } else {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                return user.save();
            }
        })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

exports.getUser = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).send({ 'msg': 'User not found' });
            } else {
                res.status(200).send(user);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

exports.updateUser = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            const { name, email } = req.body;

            user.name = name;
            user.email = email;

            return user.save();
        }).then(user => {
            res.status(200).send(user);
        }).catch(err => {
            res.send(err);
        });
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};
