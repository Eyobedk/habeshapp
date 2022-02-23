const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
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

exports.login = (req,res)=>{
    const {error} = validateSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //PERFORM CHECK EMAIL_EXISTS,
    if(!(Object.keys(data).find(key => data[key] === req.body.email))) return res.status(400).send("email does not exists")

    //DECRYPT PASSWORD_WITH-BCRYPT,
    const compared = bcrypt.compare(req.body.password, data.password)
    if(!compared) return res.send(400).send("invalid password");
    //bcrypt.compare(REQUEST.BODY.PASSWORD,USER.PASSWORD) SNED "INVALID PASSWORD"
    //ELSE LOGIN
    res.status(200).send('Login');
}