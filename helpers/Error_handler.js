const re = /^(([^<>(),;:\s@"]))/;

exports.preventSqlInjection = (res, err) => {
    if (err.errno == 1064) {
        res.cookie('session', '', {
            maxAge: 1
        })
        res.cookie('session.sig', '', {
            maxAge: 1
        })
        res.cookie('jwt', '', {
            maxAge: 1
        })
    }
}


exports.testArrayofTexts = (listofInputs) =>{
    let injectionDetected = false;
    for (let i = 0; i < listofInputs.length; i++) {
        if (re.test(String(listofInputs[i]).toLowerCase()) == false) {
            return injectionDetected = true;
        }
        
    }
    return injectionDetected;
}