const express = require('express');
const passport = require('passport');

const {LoadApps} = require('./controllers/users/AppHomepage');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();
const bodyparser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/users/user');
const adminRoutes = require('./routes/admin/admin');
const G_OAuth = require('./routes/users/G_OAuth');
const {requireAuth} = require('./middleware/auth');
const {checkUser} = require('./middleware/checkStatus');
const urlencodedParser = bodyparser.urlencoded({extended: false})

app = express();

app.set('view engine', 'ejs')
app.set("views", "./views")

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/updates',express.static(path.join(__dirname,'updates')))

app.use(cookieParser());

app.use('*', checkUser);
app.use(cookieSession({name:'session',
    keys:[process.env.SESSION_SECRET_KEY_ONE,process.env.SESSION_SECRET_KEY_TWO ],
    maxAge:24 * 60 * 60 * 1000}));
app.use(passport.initialize())
app.use(passport.session());
app.use(urlencodedParser);

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(authRoutes)// + user
app.use(adminRoutes)
app.use(G_OAuth)



app.get('/home',requireAuth,LoadApps)

app.listen(3000,()=>console.log("at 3000"));