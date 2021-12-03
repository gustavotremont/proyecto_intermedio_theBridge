const passportJWT = require('passport-jwt');
const User = require('../models/user')

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// usar con cookie-parser
const cookieExtractor = (req) => {
    var token = null;
    if (req && req.cookies) token = req.cookies['access_token'];
    return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;

const passportJWTStrategy = (passport) => {
    passport.use( new JwtStrategy(opts, async (jwtPayload, done) => {
        const user = await User.getUser(jwtPayload.user.user_email);
        console.log(user);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }));

    return passport;
}

module.exports = passportJWTStrategy;