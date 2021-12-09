const passportJWT = require('passport-jwt');
// const passportGoogle = require("passport-google-oauth")
const User = require('../models/user')

const JwtStrategy = passportJWT.Strategy;
// const GoogleStrategy = passportGoogle.OAuth2Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

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
        const user = await User.getUser(jwtPayload.email);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }));

    return passport;
}

const passportGoogleStrategy = (passport) => {
    passport.use( new GoogleStrategy({
        //Settings
    }), () => {
        //callback
    });

    return passport;
}

const passportStrategies = {
    passportJWTStrategy,
    passportGoogleStrategy
}

module.exports = passportStrategies;