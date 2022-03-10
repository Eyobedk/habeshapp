const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();

const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/auth');
const {checkUser} = require('./middleware/checkUser');

app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())

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


app.use('*', checkUser)
app.get('/smoothies', requireAuth, (req, res) => {
    res.render('smoothies', {
    user: res.locals.user
        })
    })
app.get('/gooAc',(req,res)=>{
    console.log('from google params: '+req.params)
    console.log('from google body: '+req.body)
    res.send("recived")
})
app.get('/home',requireAuth,(req,res)=>{res.send("<h1>HOME PAGE</h1>")})
app.get('/',(req,res)=>{
    res.sendFile('./public/html/google.html',{root:"./"})})
app.use(authRoutes)
}
main();