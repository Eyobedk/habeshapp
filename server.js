const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const {
    register,
    login,
    tokenize,
    deleter
} = require('./routes/auth');
const publishRoute = require('./routes/publish');
require('dotenv').config();
app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))


const dbURI = 'mongodb+srv://eyobed:eyobed%40403@cluster0.2zibg.mongodb.net/test';
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       // useCreateIndex: true
    })
    .then((result) => {
        app.listen(3000);
        console.log('listening on port 3000...')
    })
    .catch((err) => console.log(err));



app.post('/register', register);
app.post('/login', login);
app.get('/homepage', publishRoute);
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.post('/token', tokenize)
app.delete('/logout', deleter)
app.get('/forgot-password', )