var path = require('path')
var count = 0;

function validateScreenshots(images) {
    console.log(images.length)
    for (let i = 0;
        (i <= images.length) - 1; i++) {
        var screenExtension = path.extname(images[i]);
        if (screenExtension != '.png') {
            count++;
            return count
        }
    }
}
exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


exports.validateApp = (req, res, next) => {
    const {
        email,icon,
        apk,
        backImage,
        screenshots
    } = req.body;
     

    if (!validateEmail(email)) {
        let theError = 'please a valid email address';
        res.render('developer/publish', {
            Ierror: theError
        })
    }
    const appExtension = path.extname(apk);
    const backIExtension = path.extname(backImage);
    const IconExtension = path.extname(icon);
    console.log(screenshots)

    //const screenExtension = path.extname(JSON.stringify(screenshots) );

    if(IconExtension != '.ico')
    {
        let theError = 'please Enter the apk icon correctly(.ico file)';
        res.render('developer/publish', {
            Ierror: theError
        })
        return
    }
    if (appExtension != '.apk') {
        let theError = 'please Enter the apk file correctly';
        res.render('developer/publish', {
            Ierror: theError
        })
        return
    }


    if (backIExtension != '.png' && backIExtension != '.jpg' && backIExtension != '.jpeg') {
        let theError = "please Enter the background image file";
        res.render('developer/publish', {
            Ierror: theError
        })
        return
    }


    if (validateScreenshots(screenshots) > 0) {
        let theError = 'please Enter the screenshots file with a png extention';
        res.render('developer/publish', {
            Ierror: theError
        })
        return
    }

    if (!(screenshots.length == 3)) {
        let theError = 'please upload only the specified image amount';
        res.render('developer/publish', {
            Ierror: theError
        })
        return;
    }
    next();
}