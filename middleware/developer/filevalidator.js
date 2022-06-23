const {Apps} = require('../../models/App')
const path = require('path')
const fs = require('fs');
const {testArrayofTexts} = require('../../helpers/Error_handler')

// function validateScreenshots(images,res) {
//     let theError = 'please Enter 3 screenshots file with a .png or .webp extention';
//     let flag=0;
//     if(images.length != 3){
//         res.render('developer/update', {
//             Ierror: theError
//         })
//     }
//     for (let i = 0;i <= images.length - 1; i++) {
//         var screenExtension = path.extname(images[i].name);
//         if (screenExtension == '.png') {
//             flag = 1;
//         }
//         else if (screenExtension == '.webp') {
//             flag = 2
//         }
//         if(flag == 1 ){
//             continue;
//         }
//         if(flag == 2 ){
//             continue;
//         }
//         if(flag == 0){
//             res.render('developer/publish', {
//                 Ierror: theError
//             })
//         }
//     }
// }


exports.validatestatus = async (req, res,next)=>{
    const {funcOne,funcTwo,funcThree,funcFour} = req.body;
    const theApk = req.files.apk;
    const screenshots = req.files.screenshots;
    const textinputs =[funcOne,funcTwo,funcThree,funcFour];


    // if(testArrayofTexts(textinputs))
    // {
    //     res.render('developer/update',{Ierror:"fill the approprate data"});
    //     return
    // }
    const appExtension = path.extname(theApk.name);
    let theScreenError = 'please Enter 3 screenshots file with a .png or .webp extention';
    let flag=0;

    const Paths = await Promise.resolve(Apps.getAppsPath(req.params.id, res.locals.dev.id));
    console.log(Paths[0])
    date = new Date(Paths[0].publishedDate);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();
  
    if (dt < 10) {
      dt = '0' + dt;
    }
    const dateforFolders = dt - 1;
    const theDate = dateforFolders + '-' + month + '-' + year;
    
    if(fs.existsSync(`updates/${Paths[0].appName}/${theDate}`))
    {
        let theError = 'You already have made an update today please try updating your app on another day';
        res.render('developer/update', {
            Ierror: theError
        })
        return
    }

    if (appExtension != '.apk') {
        let theError = 'please Enter the apk file correctly';
        res.render('developer/update', {
            Ierror: theError
        })
        return
    }

    
    if(funcOne.length == 0 || funcTwo.length == 0 || funcThree.length == 0 || funcFour.length == 0)
    {
        let theError = 'Enter a text for features list';
        res.render('developer/update', {
                    Ierror: theError
                })
        return
    }
    
    if(screenshots.length != 3){
        res.render('developer/update', {
            Ierror: theScreenError
        })
        return;
    }
    for (let i = 0;i <= screenshots.length - 1; i++) {
        var screenExtension = path.extname(screenshots[i].name);
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
        if(flag == 0){
            res.render('developer/publish', {
                Ierror: theScreenError
            })
            return
        }
    }
    // validateScreenshots(screenshots,res);
    next();
}