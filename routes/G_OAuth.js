const passport = require('passport');
const Router = require('express').Router();
const {Strategy} = require('passport-google-oauth20');

function verifyCallBack(accToken, refoken, profile, done) {
    console.log('google profile', profile)
    console.log('access Token', accToken)
    console.log('ref Token', refoken)
    done(null, profile)
}

const setwhenDone = {
    failureRedirect: '/failure',
    successRedirect: '/home',
    session: false
}

passport.use(new Strategy({
    callbackURL: '/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, verifyCallBack))

Router.get("/auth/google", passport.authenticate('google',{scope:['email']}))
Router.get('/google/callback', passport.authenticate('google', setwhenDone), 
    (req, res) => { console.log('google called us back');
    res.send("here")});

Router.get('/failure', (req, res) => { res.send("failed to login") })


module.exports = Router