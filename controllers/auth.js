const User = require("../models/User");
const { createToken,createRefToken } = require('../utils/TokenHandler');


module.exports.signup_Get = (req, res) => {
    res.render('login&signup/signup');
}

module.exports.signup_Post = async (req, res) => {
    // don't forget to check email
    const {name, email, password1} = req.body;
    console.log(name, password1,email);

    const user = new User(name, password1,email);

    const savedUser = await user.save()
    console.log(savedUser)
    // don't forget bcrypt!
    
        // const token = createToken(user._id);
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     maxAge: 40000
        // }).json({
        //     user: user._id
        // });;
        
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