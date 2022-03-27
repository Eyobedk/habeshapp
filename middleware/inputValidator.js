const {check, validationResult} = require('express-validator')

exports.validateInput = (req, res)=>{
    [check('email',"Enter a valid Email Address").isEmail().normalizeEmail(),
    check('name',"Enter the required field").notEmpty() ];

    const {password1,password2,} = req.body;
    var result = password1.localeCompare(password2);
    console.log(result)

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const alert = errors.array();
        return res.render('signup',{alert});
    }
    else if(result == 1 || result == -1)
    {
        const pass ="please Enter the same passwords";
        return res.render('signup',{pass});
    }
}