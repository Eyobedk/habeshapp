const {
    validateEmail
} = require('./validateApps')

exports.validateDev = (req, res) => {
    const {name,phone,domain,email,password} = req.body;

    function ValidURL(str) {
        var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!regex.test(str)) {
            let inputError = "please enter a proper domain name with https protcol";
            res.render('login&signup/developer-register', {
                Ierror: inputError
            })
            return
        }
        return
    }

    if (name.length < 3) {
        let inputError = "please enter a valid name";
        res.render('login&signup/developer-register', {
            Ierror: inputError
        })
        return
    }
    if (password.length < 8) {
        let inputError = "please use a password that have more than 8 characters";
        res.render('login&signup/developer-register', {
            Ierror: inputError
        })
        return
    }
    if (typeof phone == 'number') {
        let inputError = "please enter a valid phone";
        res.render('login&signup/developer-register', {
            Ierror: inputError
        })
        return
    }

    ValidURL(domain)

    if (!validateEmail(email)) {
        let inputError = "please enter a valid Email Address";
        res.render('login&signup/developer-register', {
            Ierror: inputError
        })
        return
    }
    next()
}