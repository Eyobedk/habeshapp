const User = require("../models/User");
const {createToken}= require('../utils/TokenHandler');
const {validateSchema} = require('../models/validate');
const handleErrors = require('../utils/ErrorHandler')

module.exports.signup_Get = (req, res) => {
    res.render('signup');
}

module.exports.signup_Post = async (req, res) => {   
    const {
        email,
        password
    } = req.body;
    
    console.log(password)
    try {
        const user = await User.create({
            email,
            password
        });

        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 2.592e+8
        }).json({user:user._id});;
        res.status(201).json({user:user._id});
    }
     catch (err) {
        const errors = handleErrors.handleErrors(err)
        res.status(400).json({errors});
    }
}


module.exports.login_Get = (req, res) => {
    res.render('login');
}

module.exports.login_Post = (req, res) => {
    res.send('login post');
}