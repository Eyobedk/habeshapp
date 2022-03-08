const express = require('express');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config();

const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/auth');
const {checkUser} = require('./middleware/checkUser');

app = express();
app.set('view engine', 'ejs')
app.set('view engine','handlebars')
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())

async function main() {
    await mongoose.connect(process.env.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((result) => {
            app.listen(3000);
            console.log('listening on port 3000...');
        })
        .catch((err) => console.log(err));


    app.use('*', checkUser)
    app.get('/smoothies', requireAuth, (req, res) => {
        res.render('smoothies', {
            user: res.locals.user
        })
    })
    app.get('/home',requireAuth,(req,res)=>{res.send("<h1>HOME PAGE</h1>")})
    app.use(authRoutes)
}
main();