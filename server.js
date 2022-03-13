const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const {Strategy} = require('passport-google-oauth20');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const G_OAuth = require('./routes/G_OAuth');
const {requireAuth} = require('./middleware/auth');
const {checkUser} = require('./middleware/checkUser');

app = express();
app.set('view engine', 'ejs')


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cookieParser())
app.use('*', checkUser)
app.use(cookieSession({name:'session',
    keys:[process.env.SESSION_SECRET_KEY_ONE,
    process.env.SESSION_SECRET_KEY_TWO ],
    maxAge:24 * 60 * 60 * 1000}));
app.use(passport.initialize()) 
app.use(passport.session())
app.use(authRoutes) 
app.use(G_OAuth) 


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
function checkGoogleLoggedIn(req,res,next)
{
    console.log("The current user is :"+req.user);
    const authenicatedUser = req.isAuthenticated() && req.user;
    if(!authenicatedUser){
        return res.status(403).json({error:'You must log in!'})
    }
    next()
}
app.get('/smoothies', requireAuth, (req, res) => {
        res.render('smoothies', { user: res.locals.user }) })

app.get('/home', requireAuth && checkGoogleLoggedIn,(req, res) => { res.send("<h1>HOME PAGE</h1>") })
app.get('/',(req, res) => { res.sendFile('./public/html/google.html', { root: "./" })})
