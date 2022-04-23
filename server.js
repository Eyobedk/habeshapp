const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload')

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();
const bodyparser = require('body-parser');
const path = require('path')

const authRoutes = require('./routes/user');
const developeRoutes = require('./routes/developer');
const G_OAuth = require('./routes/G_OAuth');
const {requireAuth} = require('./middleware/auth');
const {checkUser} = require('./middleware/checkStatus');
const urlencodedParser = bodyparser.urlencoded({extended: false})

app = express();
app.set('view engine', 'ejs')
app.set("views", "./views")

//here initiate the database

app.use(fileUpload())
app.use(express.static('public'));
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

app.use(authRoutes)// + user
app.use(G_OAuth)
app.use(developeRoutes)



app.get('/smoothies', requireAuth, (req, res) => {
        res.render('smoothies', { user: res.locals.user }) })


app.get('/',(req, res) => { res.send("<h1> HOME PAGE </h1>")})

app.listen(3000,()=>console.log("at 3000"));