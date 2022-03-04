const User = require("../models/User");
const {
    createToken
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

        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 20000
        }).json({
            user: user._id
        });;
        res.status(201).json({
            user: user._id
        });
        res.redirect('login');
    } catch (err) {
        const errors = handleErrors.handleErrors(err) //IYREBAM
        res.status(400).json({
            errors
        });
    }
}


module.exports.login_Get = (req, res) => {
    res.render('login');
}

module.exports.login_Post = async (req, res,next) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.login(email, password);
        if(!user){res.send('enter the correct password and email')}
        else{
            res.redirect('smoothies');

        }
       // const token = createToken(user._id);
        //res.cookie('jwt', token, {
            //httpOnly: true,
          //  maxAge: 20000
        //}).json({
          //  user: user._id
        //});
       // res.redirect(302, 'http://localhost:3080');
        console.log('logged');
        next();
        //res.render('smoothies')

    } catch (err) {
        //res.status(400).json({});
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.render('login')
}

