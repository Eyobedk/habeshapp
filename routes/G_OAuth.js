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
    successRedirect: '/smoothies',
    session: true
}

passport.use(new Strategy({
    callbackURL: '/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, verifyCallBack))


passport.serializeUser((user,done)=>{
    console.log("GEDAY"+user._json.email);
    done(null,user._json.email);});

passport.deserializeUser((user,done)=>{ done(null,user) });


Router.get("/auth/google", passport.authenticate('google',{scope:['email']}))
Router.get('/google/callback', passport.authenticate('google', setwhenDone), 
    (req, res) => { console.log('google called us back');
    res.send("here")});

Router.get('/failure', (req, res) => { res.send("failed to login") })
Router.get('/auth/logout', (req, res) => { req.logOut();res.redirect(302,'/') })


module.exports = Router