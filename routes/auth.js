const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validateSchema} = require('../models/validation');
const router = require('express').Router();
require('dotenv').config();


var data = {};
var refereshTokens = [];


exports.register = async (req, res) => {

    const {
        error
    } = validateSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //PERFORM CHECK EMAIL_EXISTS,
    if ((Object.keys(data).find(key => data[key] === req.body.email))) return res.status(400).send("email exists")

    //ENCRYPT PASSWORD_WITH-BCRYPT,
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    //REGISTERING AND ROUTES
    data.name = req.body.name;
    data.email = req.body.email;
    data.password = hashed;
    res.json(data);
}

exports.login = async (req, res) => {
    const {
        error
    } = validateSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //PERFORM CHECK EMAIL_EXISTS,
    if (!(Object.keys(data).find(key => data[key] === req.body.email))) return res.status(400).send("email does not exists")

    //DECRYPT PASSWORD_WITH-BCRYPT AND CHECK PASSWORD,
    const compared = await bcrypt.compare(req.body.password, data.password)
    if (!compared) return res.send("invalid password");
    //ELSE LOGIN  BUT NOW WE USE JWT
    const accessToken = jwt.sign({
        name: data.name
    }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '40s'
    });
    
    const refreshToken = jwt.sign({
        name: data.name
    }, process.env.REFRESH_TOKEN_SECRET_KEY);

    refereshTokens.push(refreshToken);

    res.header('access-token-header', accessToken).json({
        accessToken: accessToken,
        refreshToken: refreshToken
    });
   // res.render('index');
}


exports.tokenize = (req, res) => {
    const refereshToken = req.body.token;
    console.log("refToken"+refereshToken);

    if (refereshToken == null) return res.status(401).send();
    if (!(refereshTokens.includes(refereshToken))) return res.status(403).send();

    jwt.verify(refereshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send();

        const accessToken = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET_KEY);
        res.json({accessToken:accessToken})
    });
}

exports.deleter = (req, res)=>{
    refereshTokens = refereshTokens.filter(token =>token !== req.body.token);
    res.sendStatus(200);
}