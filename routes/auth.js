const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validateSchema} = require('../models/validation');

var data = {};

exports.register = async (req,res)=>{
    
    const {error} = validateSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //PERFORM CHECK EMAIL_EXISTS,
    if((Object.keys(data).find(key => data[key] === req.body.email))) return res.status(400).send("email exists")

    //ENCRYPT PASSWORD_WITH-BCRYPT,
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    //REGISTERING AND ROUTES
    data.name = req.body.name;
    data.email = req.body.email;
    data.password = hashed;
    res.json(data);
}

exports.login = async (req,res)=>{
    const {error} = validateSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //PERFORM CHECK EMAIL_EXISTS,
    if(!(Object.keys(data).find(key => data[key] === req.body.email))) return res.status(400).send("email does not exists")

    //DECRYPT PASSWORD_WITH-BCRYPT AND CHECK PASSWORD,
    const compared = await bcrypt.compare(req.body.password, data.password)
    if(!compared) return res.send("invalid password");
    //ELSE LOGIN  BUT NOW WE USE JWT
    const token = jwt.sign({name:data.name}, process.env.ACCESS_TOKEN_SECRET_KEY);
    res.header('access-token-header',token).send(token)
    //res.send('Login');
}