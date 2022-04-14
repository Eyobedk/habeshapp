const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {Mailer} = require('../utils/Mail');
require('dotenv').config();

module.exports.forgot_password = async (req, res, next) => {
    const {
        email
    } = req.body;
    console.log(email);
    const user = await User.findEmail(email);
    console.log(user)
    console.log("the domain id "+ user[0].user_id)
    if(!(user[0].password))
    {
        let message = "You have to be registered using the platform signup feature inorder to recive forgot password email"
        res.render('passwords/forgot-password',{notfound:message});
        return
    }

    if (user) {
        const secret = process.env.ACCESS_TOKEN_SECRET_KEY + user.password;
        let id = user[0].user_id;
        const token = jwt.sign({
            id
        }, secret, {
            expiresIn: '15m'
        });
        const link = `http://localhost:3000/reset-password/${id}/${token}`
        //console.log(link)
        Mailer(email, link);
        res.send('password reset link sent to email')
    } else {
        res.send("user does not exist")
        next();
    }
}

module.exports.validateAndSendLink = async (req, res, next) => {
    const {
        id,
        token
    } = req.params;

    const user = await User.findByID(id);
    console.log("the user"+user.password)
    
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY +user.password;
    console.log('id and token'+id, token);
    jwt.verify(token, secret, (err, verified) => {
        if (err) {
            console.log(err)
            res.render('incorrect token')
        }
        res.render('passwords/reset-password');
    })
}

module.exports.setNewPassword =(req,res)=>{
    const {password1, password2} = req.body;
    var result = password1.localeCompare(password2);
    console.log(result)
    if(result == 1 || result == -1)
    {
        const pass ="please Enter the same passwords";
        return res.render('passwords/reset-password',{pass});
    }
    res.redirect(302, 'Login');
}

