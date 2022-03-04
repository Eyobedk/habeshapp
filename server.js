const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const dbURI = 'mongodb+srv://eyobed:eyobed%40403@cluster0.2zibg.mongodb.net/habeshapp';
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const {
    requireAuth
} = require('./middleware/auth');
const {
    checkUser
} = require('./middleware/checkUser');

app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())

async function main() {
    await mongoose.connect(dbURI, {
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
    app.use(authRoutes)
}
main();