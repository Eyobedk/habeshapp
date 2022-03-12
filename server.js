const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport');
const cookieParser = require('cookie-parser');
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
app.use(passport.initialize())      // set passport session
app.use(authRoutes)     //Authorization Routes
app.use(G_OAuth)        // Google Authorization Routes


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

app.get('/smoothies', requireAuth, (req, res) => {
        res.render('smoothies', { user: res.locals.user }) })

app.get('/home', (req, res) => { res.send("<h1>HOME PAGE</h1>") })
app.get('/', (req, res) => { res.sendFile('./public/html/google.html', { root: "./" })})
