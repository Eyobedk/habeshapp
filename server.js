const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app = express();
app.use(express.json());


const content = [{
        name: "ethiopiawi app",
        title: "about ethiopia",
    },
    {
        name: "auropawi app",
        title: "about europe"
    }

]

app.get('/posts', AuthenticateToken, (req, res) => {
    res.json(content.filter(cont => cont.name === req.body.name));
});

app.post('/login', (req, res) => {
    //Auth
    var username = req.body.username;
    const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET_KEY);
    res.json({
        accessToken: accessToken
    })
});


function AuthenticateToken(req, res, next) {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (token == null) return res.status(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.listen(3000, () => {
    console.log('listening on port 3000')
});