const passport = require('passport');
const Router = require('express').Router();
const User = require("../../models/User");
const {Strategy} = require('passport-google-oauth20');


var useremail;
var user_id;
async function verifyCallBack(accToken, refoken, profile, done) {
    
    
    await User.saveFromGoogle(profile._json.email).then(async result =>{
        await User.findEmail(profile._json.email).then(userInfo=>{
        user_id = userInfo[0].user_id;
        })
    });
    done(null, profile)
}

const setwhenDone = {
    failureRedirect: '/failure',
    // successRedirect: '/home',
    session: true
}

passport.use(new Strategy({
    callbackURL: '/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, verifyCallBack))


passport.serializeUser((user,done)=>{
    done(null,user_id);});

passport.deserializeUser((user,done)=>{ done(null,user) });


Router.get("/auth/google", passport.authenticate('google',{scope:['email']}),function(req, res){whatTheheck = res})
Router.get('/google/callback', passport.authenticate('google', setwhenDone), 
    function(req, res) {
    res.redirect(`/home`);
    });

Router.get('/failure', (req, res) => { res.send("failed to login") })
Router.get('/auth/logout', (req, res) => { req.logOut();res.redirect(302,'/') })


module.exports = Router;