const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../models/User');
const keys = require('../config/keys');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT_SECRET
};

/*
 * `jwt_payload` is an object literal containing the decoded JWT payload.
 * `done` is a passport error first callback accepting arguments done(error, user, info)
 * 
 * Ref: http://www.passportjs.org/packages/passport-jwt/
 */
module.exports = new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload._id, (err, user) => {
        if (err) {
            return done(err, false);
        }
        return done(null, user || false);
    });
});
