const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const dbURI = 'mongodb+srv://eyobed:eyobed%40403@cluster0.2zibg.mongodb.net/test';
const authRoutes = require('./routes/auth');

app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());



mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        app.listen(3000);
        console.log('listening on port 3000...')
    })
    .catch((err) => console.log(err));




app.get('/', (req, res)=>{res.render('home')});
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)