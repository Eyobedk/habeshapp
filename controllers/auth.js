const User = require("../models/User");
const {
    createToken,
    createRefToken
} = require('../utils/TokenHandler');
const handleErrors = require('../utils/ErrorHandler')


module.exports.signup_Get = (req, res) => {
    res.render('signup');
}

module.exports.signup_Post = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    //"Do not forget to decompose this codes according to their functionality"

    //IN HERE I HAVE TO USE HAPI/JOY TO VALIDATE AND RESPOND WITH EJS
    //I WILL SEND THE ERROR TYPE

    // don't forget to check email

    // don't forget bcrypt!
    try {
        const user = await User.create({
            email,
            password
        });
        if (!user) return res.send('email exists')
        // const token = createToken(user._id);
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     maxAge: 40000
        // }).json({
        //     user: user._id
        // });;
        // res.status(201).json({
        //     user: user._id
        // });
        res.redirect('login');
    } catch (err) {
        res.send('email exists')
        //console.log('good error ', err)
    }
}


module.exports.login_Get = (req, res) => {
    res.render('login');
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

        new Promise((resolve, reject) => {
        User.findByIdAndUpdate({ _id: user._id}, {refreshToken: refToken },
        (err, result) => {reject(err)
        console.log("err:" + err);
        console.log('result:' + result)
        })

        "use strict";
        resolve(res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 40000
        }));
        res.redirect(302, '/smoothies')})
    }
    } catch (err) {
        console.log(err)
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect(302, '/login')
}