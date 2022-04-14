const {check, validationResult} = require('express-validator')
const {validateEmail} = require('./validateApps')
const User = require('../models/User');
const bcrypt =require('bcrypt');

exports.validateInput = (req, res, next)=>{
    const {name,email,password1,password2} = req.body;
    var result = password1.localeCompare(password2);
    const errors = validationResult(req);

    if(name.length < 3)
    {
        let theError = 'please Enter a valid name';
        res.render('login&signup/signup', {
            pass: theError
        })
        return
    }
    if(!validateEmail(email))
    {
        let theError = 'please Enter a valid email address';
        res.render('login&signup/signup', {
            pass: theError
        })
        return
    }

    if(result == 0)
    {
        if(password1.length < 8)
        {
            let theError = 'password length must be greater than 7';
            res.render('login&signup/signup', {
            pass: theError
        })
        return
        }
    }

    if(!errors.isEmpty()) {
        const alert = errors.array();
        return res.render('login&signup/signup',{alert});
    }
    else if(result == 1 || result == -1)
    {
        const pass ="please Enter the same passwords";
        return res.render('login&signup/signup',{pass});
    }
    next();
}

exports.validateLoginInput = async (req, res, next)=>{
    const {email,password} = req.body;
    const user = await User.findEmail(email);
    console.log("the password"+user[0].password)
    if(!user)
    {
        let Ierrors = 'enter the correct password and email';
        res.render("login&signup/Login", {Ierrors});
        return
    }
    await bcrypt.compare(password, user[0].password).then(function(result) {
        // result == true
        console.log("the result"+result)
        if(!result)
        {
            const Ierror = "Enter the correct email and password";
            return res.render('login&signup/Login',{Ierror});
        }
    });
        
   
    [check('email',"Enter a proper info").isEmail().normalizeEmail()];
    const listOferrors = validationResult(req);
    let errors = JSON.stringify(listOferrors["errors"]);
    console.log("err"+errors.length == 0)
    if(errors.length ==0) {
        const Ierror = "Enter a proper email";
        console.log(Ierror);
        return res.render('login&signup/Login',{Ierror});
    }
    next();
}

exports.ValidateDeveloperRegister = (req, res, next)=>{
    [
    check('password',"Enter a password upto 8 character").isLength({ min: 8 }) ];

    const errors = validationResult(req);
    console.log("the errors:" + JSON.stringify(errors))
    if(!errors.isEmpty()) {
        const alert = errors.array();
        return res.render('login&signup/developer-register',{alert});
    }
    next();
}