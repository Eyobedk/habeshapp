const route = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next){
    const token = req.header('access-token-header');
    if(!token) return res.status(403).send('access denied');

    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        req.user = verified;
        next()
    }catch(e){res.status(400).send("invalid token")}
}

