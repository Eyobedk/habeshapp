var path = require('path')
const Apps = require('../models/App')

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

function ValidURL(str) {
    var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        let theError = "please enter a proper domain name with https protcol";
        res.render('developer/publish', {
            Ierror: theError
        })
        return
    }
    return
}



exports.validateApp = async (req, res, next) => {
    const {name,domain,choosen,funcOne,funcTwo,funcThree,funcFour} = req.body;
    const theApk = req.files.apk;
    const theIcon = req.files.icon;
    const BackgImage = req.files.backImage;
    const screenshots = req.files.screenshots;
    
    const appExtension = path.extname(theApk.name);
    const backIExtension = path.extname(BackgImage.name);
    const IconExtension = path.extname(theIcon.name);

    if(funcOne.length == 0 || funcTwo.length == 0 || funcThree.length == 0 || funcFour.length == 0)
    {
        let theError = 'Enter a text for features list';
        res.render('developer/publish', {
            Ierror: theError
        })
        return
    }

    const App = await Apps.find(name);
    if(App)
    {
        let theError = 'This App is already published';
        res.render('developer/publish', {
            Ierror: theError
        })
        return
    }

    ValidURL(domain);
    if(choosen =='Choose...'){
        let theError = 'please a the app catagory type';
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