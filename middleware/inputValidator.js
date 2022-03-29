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
    [check('name',"Enter a proper name").notEmpty().isAlpha() ];
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const Ierror = "Enter a proper name";
        console.log(Ierror)
        return res.render('login&signup/Login',{Ierror});
    }
    next();
}