var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');

//var configAuth = require('./auth');

module.exports = function (passport) {

    // passport session setup
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // local registration
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, userName, password, done) {
            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({'userName': userName}, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'This email is already taken'));
                        } else {
                            var newUser = new User();
                            newUser.userName = userName;
                            newUser.userName = newUser.generateHash(password);

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    var user = req.user;

                    user.userName = userName;
                    user.userName = user.generateHash(password);

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
            });
        }));

    // local login
    passport.use('local-login', new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.findOne({'userName': userName}, function (err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                return done(null, user);
            });
        }));

    // facebook
    // passport.use(new FacebookStrategy({
    //         clientID: configAuth.facebookAuth.clientID,
    //         clientSecret: configAuth.facebookAuth.clientSecret,
    //         callbackURL: configAuth.facebookAuth.callbackURL,
    //         passReqToCallback: true,
    //         profileFields: ['id', 'emails', 'name']
    //     },
    //     function (req, token, refreshToken, profile, done) {
    //         process.nextTick(function () {
    //
    //             if (!req.user) {
    //                 User.findOne({'facebook.id': profile.id}, function (err, user) {
    //                     if (err)
    //                         return done(err);
    //
    //                     if (user) {
    //                         return done(null, user);
    //                     } else {
    //                         var newUser = new User();
    //                         newUser.facebook.id = profile.id;
    //                         newUser.facebook.token = token;
    //                         newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
    //                         newUser.facebook.email = profile.emails[0].value;
    //
    //                         newUser.save(function (err) {
    //                             if (err)
    //                                 throw err;
    //
    //                             return done(null, newUser);
    //                         });
    //                     }
    //                 });
    //             } else {
    //                 var user = req.user;
    //
    //                 user.facebook.id = profile.id;
    //                 user.facebook.token = token;
    //                 user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
    //                 user.facebook.email = profile.emails[0].value;
    //
    //                 user.save(function (err) {
    //                     if (err)
    //                         throw err;
    //                     return done(null, user);
    //                 });
    //             }
    //         });
    //     }));
};