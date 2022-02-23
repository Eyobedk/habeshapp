const joi = require('@hapi/joi');
const {validateSchema} = require('../models/validation');

exports.register = (req,res)=>{
    
    const {error} = validateSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //PERFORM CHECK EMAIL_EXISTS,
    //ENCRYPT PASSWORD_WITH-BCRYPT,
    //REGISTERING AND ROUTES
    res.send("registered");
}

exports.login = (req,res)=>{
    const {error} = validateSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //
    res.status(200).send('Login');
}