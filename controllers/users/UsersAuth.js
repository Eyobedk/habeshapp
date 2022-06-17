const User = require("../../models/User");
const { createToken,createRefToken } = require('../../utils/TokenHandler');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let pass = "This account is already registered";

module.exports.signup_Get = (req, res) => {
    res.render('users/signup');
}

module.exports.signup_Post = async (req, res) => {
    const {name, email, password1} = req.body;
    let pass = "Email already exists";
    const checkExists = await User.findEmail(email);
    if(!(JSON.stringify(checkExists[0]) === undefined)) { res.render('users/signup',{pass});return}

    const hash = bcrypt.hashSync(password1, 10);
    const user = new User(name, hash,email);

    user.save().then(async ()=>{
        const getID = await User.findEmail(email);
        const token = createToken(JSON.stringify(getID[0]["user_id"]));
        res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 400000
        }).redirect(302, '/Login')
    });
}
    


module.exports.login_Get = (req, res) => {
    res.render('users/Login');
}

module.exports.login_Post = async (req, res, next) => {
    const {email,password} = req.body;
    const user = await User.findEmail(email);
    console.log(password);

    let passwordResult;
    if(user.length == 0)
    {
        let Ierrors = 'Enter the correct password and email';
        res.render("users/Login", {Ierrors});
        return
    }
    await bcrypt.compare(password, user[0].password).then(function(result) {
        passwordResult = result;
        console.log("result")
        console.log(result)
        
    }).then(()=>{
    if(!passwordResult)
    {
        const Ierror = "Enter the correct email and password";
        return res.render('users/Login',{Ierror});
    }else{

    const token = createToken(JSON.stringify(user[0].user_id));
    "use strict";
    res.cookie('jwt', token, {httpOnly: true,maxAge: 6000000});
    res.redirect(302, '/home');
    }
})
}

exports.logout = (req, res) => {
    res.locals.userId = null;
    res.cookie('session','', {
        maxAge: 1
    })
    res.cookie('session.sig','', {
        maxAge: 1
    })
    res.cookie('jwt','', {
        maxAge: 1
    })
    res.redirect(302, '/Login');
}