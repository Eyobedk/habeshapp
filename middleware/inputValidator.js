const {check, validationResult} = require('express-validator')

exports.validateInput = (req, res, next)=>{
    [check('email',"Enter a valid Email Address").isEmail().normalizeEmail(),
    check('name',"Enter the required field").notEmpty() ];

    const {password1,password2,} = req.body;
    var result = password1.localeCompare(password2);
    console.log(result)

    const errors = validationResult(req);
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

exports.validateLoginInput = (req, res, next)=>{
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
        //check('email',"Enter a valid Email Address").isEmail().normalizeEmail(),
   // check('name',"Enter the required field").notEmpty(),
   // check('phone',"Enter a valid phone number").isNumeric(),
    check('password',"Enter a password upto 8 character").isLength({ min: 8 }) ];

    const errors = validationResult(req);
    console.log("the errors:" + JSON.stringify(errors))
    if(!errors.isEmpty()) {
        const alert = errors.array();
        return res.render('login&signup/developer-register',{alert});
    }
    next();
}