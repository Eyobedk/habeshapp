var path = require('path')

const {testArrayofTexts} = require('../../helpers/Error_handler')
const Apps = require('../../models/App')
var IconFlag=0;
const re = /^(([^<>(),;:\s@"]))/;

function validateScreenshots(images,res) {
    let theError = 'please Enter valid 3 screenshots';
    let flag;
    if(images.length != 3){
        res.render('developer/publish', {
            Ierror: theError
        })
    }
    for (let i = 0;i <= images.length - 1; i++) {
        var screenExtension = path.extname(images[i].name);
        if (screenExtension == '.png') {
            flag = 1;
        }
        else if (screenExtension == '.webp') {
            flag = 2
        }
        if(flag == 1 ){
            continue;
        }
        if(flag == 2 ){
            continue;
        }
        else{
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
    const screenshots = req.files.screenshots;
    const textinputs =[funcOne,funcTwo,funcThree,funcFour];
    const appExtension = path.extname(theApk.name);
    const IconExtension = path.extname(theIcon.name);

    

    if(testArrayofTexts(textinputs))
    {
        res.render('developer/Auth/developer-register',{prevent:"fill the approprate data"});
        return
    }
    

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
    
    if(IconExtension == '.png')
    {
        IconFlag = 1;
    }
    else if(IconExtension == '.webp')
    {
        IconFlag = 2;
    }
    if(IconFlag == 0)
    {
        let theError = 'please Enter the apk icon correctly(.png or .webp file)';
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

    validateScreenshots(screenshots,res);


    next();
}