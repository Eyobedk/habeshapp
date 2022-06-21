const {check, validationResult} = require('express-validator')
const User = require('../../models/User');
const bcrypt =require('bcrypt');


function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
exports.validateSignupInput = (req, res, next)=>{
    const {name,email,password1,password2} = req.body;
    var result = password1.localeCompare(password2);
    const errors = validationResult(req);

    if(name.length < 3)
    {
        let theError = 'please Enter a valid name';
        res.render('login&signup/signup', {
            pass: theError
        });
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
    [check('email',"Enter a proper info").isEmail().normalizeEmail()];
    const listOferrors = validationResult(req);
    let errors = JSON.stringify(listOferrors["errors"]);
    if(errors.length ==0) {
        const Ierror = "Enter a proper email";
        return res.render('login&signup/Login',{Ierror});
    }
    next();
}
