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
  const {email,password} = req.body;
  try {
    const user = await User.login(email, password);
    if (!user) {
        res.status(403).send('enter the correct password and email')
    } else {
        const token = createToken(user._id);
        const refToken = createRefToken(user._id);
        console.log(refToken)
        "use strict";

        const userResult = new Promise((resolve, reject) => {
        User.findByIdAndUpdate({ _id: user._id}, {refreshToken: refToken },
            (err, result) => {resolve(result);
            //console.log("err:" + err);
            //console.log('result:' + result)
            reject(err)
            })
        })
        "use strict";
        userResult.then(()=>{res.cookie('jwt', token, {httpOnly: true,maxAge: 40000});
        res.redirect(302, '/smoothies')}).catch((err)=>{console.log(err)})
    }
    } catch (err) {
        console.log(err)
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect(302, '/Login')
}