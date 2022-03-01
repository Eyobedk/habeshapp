const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports.signup_Get = (req, res) => {
    res.render('signup');
}

module.exports.signup_Post = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    //const salt = await bcrypt.genSalt(10);
    console.log(password)
    try {

        const user = await User.create({
            email,
            password
        });
        res.status(201).json(user);

    } catch (err) {
        console.log(err);
        res.status(400).send('error, user not created');
    }
    //res.send('signup post');
}

module.exports.login_Get = (req, res) => {
    res.render('login');
}

module.exports.login_Post = (req, res) => {
    res.send('login post');
}