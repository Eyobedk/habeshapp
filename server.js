const express = require('express');
const passport = require('passport');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const {Strategy} = require('passport-google-oauth20');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const G_OAuth = require('./routes/G_OAuth');
const {requireAuth} = require('./middleware/auth');
const {checkUser} = require('./middleware/checkUser');
const {registerDeveloper,handleSuccess} = require('./controllers/dev_auth.js')


app = express();
app.set('view engine', 'ejs')


//here initiate the database

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cookieParser());
app.use('*', checkUser);
app.use(cookieSession({name:'session',
    keys:[process.env.SESSION_SECRET_KEY_ONE,process.env.SESSION_SECRET_KEY_TWO ],
    maxAge:24 * 60 * 60 * 1000}));
app.use(passport.initialize())
app.use(passport.session());

app.use(authRoutes) 
app.use(G_OAuth)


app.get('/smoothies', requireAuth, (req, res) => {
        res.render('smoothies', { user: res.locals.user }) })
app.get('/',(req, res) => { res.send("<h1> HOME PAGE </h1>")})

app.listen(3000,()=>console.log("at 3000"));