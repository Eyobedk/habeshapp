function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
exports.validDevInput = (req, res,next) => {
    const {name,phone,domain,email,password} = req.body;

    if (name.length < 3) {
        let inputError = "please enter a valid name";
        res.render('developer/Auth/developer-register', {
            Ierror: inputError
        })
        return
    }
    if (password.length < 8) {
        let inputError = "please use a password that have more than 8 characters";
        res.render('developer/Auth/developer-register', {
            Ierror: inputError
        })
        return
    }
    if (typeof phone == 'number') {
        let inputError = "please enter a valid phone";
        res.render('developer/Auth/developer-register', {
            Ierror: inputError
        })
        return
    }

    // ValidURL(domain)

    if (!validateEmail(email)) {
        let inputError = "please enter a valid Email Address";
        res.render('developer/Auth/developer-register', {
            Ierror: inputError
        })
        return
    }
    next()
}