const passport = require('passport');
const Router = require('express').Router();
const User = require("../models/User");
const {Strategy} = require('passport-google-oauth20');


var useremail;
async function verifyCallBack(accToken, refoken, profile, done) {
    await User.saveFromGoogle(profile._json.email);
    done(null, profile)
}

const setwhenDone = {
    failureRedirect: '/failure',
    successRedirect: '/home',
    session: true
}

passport.use(new Strategy({
    callbackURL: '/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, verifyCallBack))


passport.serializeUser((user,done)=>{
    useremail = user._json.email;
    done(null,user._json.email);});

passport.deserializeUser((user,done)=>{ done(null,user) });


Router.get("/auth/google", passport.authenticate('google',{scope:['email']}))
Router.get('/google/callback', passport.authenticate('google', setwhenDone), 
    (req, res) => {
        res.locals.user = {email:useremail}});

Router.get('/failure', (req, res) => { res.send("failed to login") })
Router.get('/auth/logout', (req, res) => { req.logOut();res.redirect(302,'/') })


module.exports = Router,useremail;