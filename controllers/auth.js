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
    let pass = "Email already exists";
    const checkExists = await User.findEmail(email);
    if(!(JSON.stringify(checkExists[0]) === undefined)) { res.render('login&signup/signup',{pass});return}

    //const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password1, 10);
    const user = new User(name, hash,email);

    user.save().then(async ()=>{
        const getID = await User.findEmail(email);
        console.log("THE ID"+getID[0]["user_id"]);
        const token = createToken(JSON.stringify(getID[0]["user_id"]));
        console.log("here"+token)
        res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 40000
        }).redirect(302, '/Login')
    });
}
    // res.send("<h1> HOME PAGE </h1>")
    


module.exports.login_Get = (req, res) => {
    res.render('login&signup/Login');
}

module.exports.login_Post = async (req, res, next) => {
    const {email,password} = req.body;


    const userID = await User.login(email, password);
    
    console.log("here id"+JSON.stringify(userID));
    const token = createToken(JSON.stringify(userID));
    "use strict";
    console.log("token"+ token);
    res.cookie('jwt', token, {httpOnly: true,maxAge: 40000});
    res.redirect(302, '/smoothies');
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect(302, '/Login');
}