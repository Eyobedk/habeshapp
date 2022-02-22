const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app = express();
app.use(express.json());


const content = {
    "name": "ethiopiawi app",
    "title": "about ethiopia"
}

app.get('/posts', Tokenize, (req, res) => {
    res.json(content);
});

app.post('/login', (req, res) => {
    //Auth
    var username = req.body.username;
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY);
    res.json({
        accessToken: accessToken
    })
});


function Tokenize(req, res, next){
    const vari = jwt.verify()
}

app.listen(3000, () => {
    console.log('listening on port 3000')
});