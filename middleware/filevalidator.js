const Apps = require('../models/App')
const path = require('path')
const fs = require('fs');


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


exports.validatestatus = async (req, res)=>{
    const theApk = req.files.apk;
    const BackgImage = req.files.backImage;
    const screenshots = req.files.screenshots;

    const appExtension = path.extname(theApk.name);
    const backIExtension = path.extname(BackgImage.name);

    const Paths = await Promise.resolve(Apps.getAppsPath(req.params.id, res.locals.dev.id));
    date = new Date(Paths[0].publishedDate);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();
  
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    const theDate = year + '-' + month + '-' + dt;

    if(fs.existsSync(`updates/${Paths[0].appName}/${theDate}`))
    {
        let theError = 'You already have made an update today please try updating your app on another day';
        res.render('developer/update', {
            Ierror: theError
        })
    }

    if (appExtension != '.apk') {
        let theError = 'please Enter the apk file correctly';
        res.render('developer/update', {
            Ierror: theError
        })
        return
    }

    if (backIExtension != '.png' && backIExtension != '.jpg' && backIExtension != '.jpeg') {
        let theError = "please Enter the background image file";
        res.render('developer/update', {
            Ierror: theError
        })
        return
    }

    validateScreenshots(screenshots,res);
}