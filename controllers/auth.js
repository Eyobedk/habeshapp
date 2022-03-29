const User = require("../models/User");
const { createToken,createRefToken } = require('../utils/TokenHandler');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let pass = "This account is already registered";

module.exports.signup_Get = (req, res) => {
    res.render('login&signup/signup');
}

module.exports.signup_Post = async (req, res) => {
    const {name, email, password1} = req.body;
    const checkExists = await User.findEmail(email);
    if(!(checkExists.length == 0)) return res.render('login&signup/signup',{pass});

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password1, salt);
    const user = new User(name, hash,email);

    await user.save().then(async ()=>{
        const getID = await User.findEmail(email);
        const token = createToken(JSON.stringify(getID[0]["user_id"]));
        res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 40000
        });
    });
    res.send("<h1> HOME PAGE </h1>")
}


module.exports.login_Get = (req, res) => {
    res.render('login&signup/Login');
}

module.exports.login_Post = async (req, res, next) => {
    const {name,password} = req.body;
    const userID = await User.login(name, password);
    if (!userID) {
        res.status(403).send('enter the correct password and email');
    }
    const token = createToken(userID);
    //console.log(refToken)
    "use strict";

    res.cookie('jwt', token, {httpOnly: true,maxAge: 40000});
    res.redirect(302, '/smoothies');
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect(302, '/Login')
}