const {
    rejects
} = require('assert');
const fs = require('fs');
const fsPromises = require('fs/promises');
const {
    resolve
} = require('path');

exports.MoveApk = (ApkInfo) => {
    const che = ApkInfo[0].publishedDate;
    var month = che.getUTCMonth() + 1;
    var day = che.getUTCDate();
    var year = che.getUTCFullYear();
  //  console.log(ApkInfo[0])
    const newdate = day + '_' + month + '_' + year;
    let updatedPath = `updates/${ApkInfo[0].appName}`;
    let updatedAppPath = updatedPath + `/${newdate}`;
    let movedApkPath = updatedAppPath + `/${ApkInfo[0].appName}` + `.apk`;

    if (fs.existsSync(updatedPath)) {
        //req.send("file already exists")
        console.log("exists")
        //return
    }

    fsPromises.mkdir(updatedPath, (err) => {
        if (err) {
            console.log("updatedPath err")
            console.log(err.code + '  ' + err.path);
            return
        }
    });
    fsPromises.mkdir(updatedAppPath, (err) => {
        if (err) {
            console.log("updatedAppPath error")
            console.log(err.code + '  ' + err.path);
            return
        }
    })
    
    console.log(ApkInfo[0].appLocation)
    console.log(movedApkPath)
    fsPromises.rename(ApkInfo[0].appLocation, movedApkPath, function (err) {
        if (err) throw err
      //  console.log('Successfully renamed - AKA moved!')
 console.log(movedApkPath+"moved")
            // return movedApkPath
        // return movedApkPath
    })
        
    return movedApkPath
}