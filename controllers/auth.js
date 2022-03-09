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
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.login(email, password);
        if (!user) {
            res.send('enter the correct password and email')
        } else {
            // res.render('forgot-password')

            //  }
            const token = createToken(user._id);
            const refToken = createRefToken(user._id);
            console.log(refToken)
            await User.findByIdAndUpdate({_id:user._id}, {refreshToken:refToken}, (err,result)=>{console.log("err:"+err);console.log('result:'+result)}) 

            //THE ABOVE CODE IS MAKING THE PROBLEM
          // console.log("store:    " + JSON.stringify(reftok))
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 40000
            });
            res.redirect(302, '/smoothies').json({
                user: user._id
            });
            console.log('logged');
            next();
        }
        //res.render('smoothies')

    } catch (err) {
        //res.status(400).json({});
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect(302, '/login')
}