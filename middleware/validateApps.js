var path = require('path')

function validateScreenshots(images,res) {
    let theError = 'please Enter 3 screenshots file with a png extention';
    if(images.length != 3){
        res.render('developer/publish', {
            Ierror: theError
        })
    }
    for (let i = 0;i <= images.length - 1; i++) {
        var screenExtension = path.extname(images[i].name);
        if (screenExtension != '.png') {
            res.render('developer/publish', {
                Ierror: theError
            })
        }
    }
}
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


exports.validateApp = (req, res, next) => {
    const {email} = req.body;
    const theApk = req.files.apk;
    const theIcon = req.files.icon;
    const BackgImage = req.files.backImage;
    const screenshots = req.files.screenshots;
    
    const appExtension = path.extname(theApk.name);
    const backIExtension = path.extname(BackgImage.name);
    const IconExtension = path.extname(theIcon.name);

    if (!validateEmail(email)) {
        let theError = 'please a valid email address';
        res.render('developer/publish', {
            Ierror: theError
        })
        return
    }
    

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


    validateScreenshots(screenshots,res);


    next();
}