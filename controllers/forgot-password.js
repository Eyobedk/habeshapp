const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const mon = require('mongoose');
const { default: mongoose } = require('mongoose');
//const user={};
async function finder(email) {
    const user = await User.findOne({
        email
    });
    return user
}
async function findbyId(id) {
    const user = await User.findById(id);
    return user
}

module.exports.forgot_password = async (req, res, next) => {
    const {
        email
    } = req.body;
    const user = await finder(email)
        
    if (user) {
        const secret = process.env.ACCESS_TOKEN_SECRET_KEY + user.password;
        let id = user._id;
        const token = jwt.sign({
            id
        }, secret, {
            expiresIn: '15m'
        });
        const link = `http://localhost:3000/reset-password/${user._id}/${token}`
        console.log(link)
        res.send('password reset link sent to email')
    } else {
        res.send("user does not exist")
        next();
    }
}

module.exports.validateLink = async (req, res, next) => {
    const {
        id,
        token
    } = req.params;

    const secret = process.env.ACCESS_TOKEN_SECRET_KEY +
    console.log('id and token'+id, token);
    const user = await findbyId(id)
    // CHECK WETHER THE ID FROM THE URL MATCHES WITH THE DATABASE ID USING SQUEEZLIE
    console.log('zi user'+ typeof(user._id) + 'id from url' + typeof((id).toString()))

    if (id !== user._id) {
        "use strict";
        res.send('incorrect id')
    }else{
    jwt.verify(token, secret, (err, verified) => {
        if (err) {
            res.send('incorrect token')
        }
        res.render('reset-password');
    })
}}