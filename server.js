const express = require('express');
const passport = require('passport');
// const fileUpload = require('express-fileupload')

const {LoadApps} = require('./controllers/users/AppHomepage');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();
const bodyparser = require('body-parser');
const path = require('path')

const authRoutes = require('./routes/user');
// const developeRoutes = require('./routes/developer');
const G_OAuth = require('./routes/G_OAuth');
const {requireAuth} = require('./middleware/auth');
const {checkUser,checkDeveloper} = require('./middleware/checkStatus');
const urlencodedParser = bodyparser.urlencoded({extended: false})

app = express();
// devapp = express();

app.set('view engine', 'ejs')
app.set("views", "./views")
// devapp.set('view engine', 'ejs')
// devapp.set("views", "./views")

//here initiate the database

// devapp.use(fileUpload())
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// devapp.use(express.static('public'));
// devapp.use(express.static('uploads'));
// devapp.use(express.json());
// devapp.use(express.urlencoded({extended: false}))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/updates',express.static(path.join(__dirname,'updates')))

// devapp.use('/uploads',express.static(path.join(__dirname,'uploads')))
// devapp.use('/updates',express.static(path.join(__dirname,'updates')))

app.use(cookieParser());
// devapp.use(cookieParser());

app.use('*', checkUser);
// devapp.use('*', checkDeveloper);

app.use(cookieSession({name:'session',
    keys:[process.env.SESSION_SECRET_KEY_ONE,process.env.SESSION_SECRET_KEY_TWO ],
    maxAge:24 * 60 * 60 * 1000}));
app.use(passport.initialize())
app.use(passport.session());
app.use(urlencodedParser);

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(authRoutes)// + user
app.use(G_OAuth)
// devapp.use(developeRoutes)


app.get('/home',requireAuth,LoadApps)

// devapp.listen(4000, console.log("dev at 4000"))
app.listen(3000,()=>console.log("at 3000"));