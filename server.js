const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const {Strategy} = require('passport-google-oauth20');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const {requireAuth} = require('./middleware/auth');
const {checkUser} = require('./middleware/checkUser');


function verifyCallBack(accToken, refoken, profile, done) {
    console.log('google profile', profile)
    console.log('access Token', accToken)
    console.log('ref Token', refoken)
    done(null, profile)
}

app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('*', checkUser)
app.use(passport.initialize()) //passport session
passport.use(new Strategy({
    callbackURL: '/google/callback',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, verifyCallBack))
app.use(authRoutes)

async function main() {
    await mongoose.connect(process.env.dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((result) => {
            app.listen(3000);
            console.log('listening on port 3000...');
        })
        .catch((err) => console.log(err));
}
main();

const setwhenDone = {
    failureRedirect: '/failure',
    successRedirect: '/home',
    session: false}

app.get('/smoothies', requireAuth, (req, res) => {
        res.render('smoothies', { user: res.locals.user }) })

app.get("/auth/google", passport.authenticate('google',{scope:['email']}))
app.get('/google/callback', passport.authenticate('google', setwhenDone), 
      (req, res) => { console.log('google called us back');
      res.send("here")});

app.get('/failure', (req, res) => { res.send("failed to login") })
app.get('/home', (req, res) => { res.send("<h1>HOME PAGE</h1>") })
app.get('/', (req, res) => { res.sendFile('./public/html/google.html', { root: "./" })})
