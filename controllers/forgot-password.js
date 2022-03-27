const jwt = require('jsonwebtoken');
const {finder, findById} = require('../db/find')
const {Mailer} = require('../utils/Mail');
require('dotenv').config();

module.exports.forgot_password = async (req, res, next) => {
    const {
        email
    } = req.body;
    console.log(email);
    const user = await finder(email);
        
    if (user) {
        const secret = process.env.ACCESS_TOKEN_SECRET_KEY + user.password;
        let id = user._id;
        const token = jwt.sign({
            id
        }, secret, {
            expiresIn: '15m'
        });
        const link = `http://localhost:3000/reset-password/${user._id}/${token}`
        //console.log(link)
        Mailer(link);
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

    const user = await findById(id)
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY +user.password;
    console.log('id and token'+id, token);
    //const user = await findbyId(id)
    // CHECK WETHER THE ID FROM THE URL MATCHES WITH THE DATABASE ID USING SQUEEZLIE
    //console.log('zi user'+ typeof(user._id) + 'id from url' + typeof((id).toString()))

    // if (id !== user._id) {
    //     "use strict";
    //     res.send('incorrect id')
    // }else{
    jwt.verify(token, secret, (err, verified) => {
        if (err) {
            console.log(err)
            res.send('incorrect token')
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

