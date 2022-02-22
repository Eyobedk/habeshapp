const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app = express();
app.use(express.json());


const content = {
    "name": "ethiopiawi app",
    "title": "about ethiopia"
}

app.get('/posts', (req, res) => {
    res.json(content);
});

app.post('/login', (req, res) => {
    //Auth
    var username = req.body.username;

    res.json({
        accessToken: Tokenize(username)
    })
});


function Tokenize(user){
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY);
    return accessToken;
}

app.listen(3000, () => {
    console.log('listening on port 3000')
});