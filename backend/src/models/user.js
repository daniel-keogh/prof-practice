const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    registered_since: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified
    if (!user.isModified('password')) {
        return next();
    }

    const rounds = 10;
    bcrypt.hash(user.password, rounds)
        .then(hashedPwd => {
            user.password = hashedPwd;
            next();
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = mongoose.model('User', userSchema);
