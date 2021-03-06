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
        select: false,
        minlength: 6
    },
    registered_since: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        default: 'https://www.gravatar.com/avatar?d=mm&s=140'
    },
    days: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Day'
        }
    ]
});

userSchema.pre('save', function (next) {
    // If the password has been updated, always make sure the
    // new password is hashed before saving to the database
    if (!this.isModified('password')) {
        return next();
    }

    const rounds = 10;
    bcrypt.hash(this.password, rounds)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = mongoose.model('User', userSchema);
