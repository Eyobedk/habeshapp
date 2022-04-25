const {
    rejects
} = require('assert');
const fs = require('fs');
const fsPromises = require('fs/promises');
const { resolve } = require('path');
const path = require('path');

exports.createDirectories = (ApkInfo) => {
    const che = ApkInfo[0].publishedDate;
    var month = che.getUTCMonth() + 1;
    var day = che.getUTCDate();
    var year = che.getUTCFullYear();
    const newdate = `${day}-${month}-${year}`;
    console.log(newdate)
    let updatedPath = `updates/${ApkInfo[0].appName}`;
    let updatedAppPath = updatedPath + `/${newdate}`;
    let movedApkPath = updatedAppPath + `/${ApkInfo[0].appName}` + `.apk`;

    if (fs.existsSync(updatedPath)) {
        console.log("exists")
    }

    fs.mkdir(updatedPath, (err) => {
        if (err) {
            console.log("updatedPath err")
            console.log(err.code + '  ' + err.path);
            return
        }
    });
    fs.mkdir(updatedAppPath, (err) => {
        if (err) {
            console.log("updatedAppPath error")
            console.log(err.code + '  ' + err.path);
            return
        }
    })

    return [ApkInfo[0].appLocation, movedApkPath]
}


exports.MoveApk = (currentLocation, newApkPath)=>
{
  console.log("move apk")
  return Promise.resolve(fsPromises.rename(currentLocation, newApkPath, function (err) {
    if (err) throw err
    //return movedApkPath
    }))
}


exports.deleteImages = (folder)=>{

  fs.readdir(folder, (err, files) => {
    // let flag = true;
    // let IconFlag = true;
    if (err) throw err;
    console.log(files)
    console.log("readdir")
    
    for (const insideApp of files) {
      console.log("for loop 1")
      fs.readdir(folder + insideApp, (err, Insidefiles) => {

        if (err) {
          console.log(err)
        };
        console.log(`inside feres/${insideApp}/` + Insidefiles);
        if (String(insideApp) == 'screenshot') {
          for (let iterate = 0; iterate < Insidefiles.length; iterate++) {
            console.log("what" + Insidefiles[iterate])
            fsPromises.unlink(path.join(`${folder}/${insideApp}/`, String(Insidefiles[iterate])), err => {
              if (err) throw err;
            });
          }
          // flag = false;
        }
        // if(String(insideApp) == 'Icon')
        // {
        //     IconFlag = false;
        // }
        if ((String(insideApp) == 'backImage')) {
          fs.unlink(path.join(`${folder}/${insideApp}/`, String(Insidefiles)), err => {
            console.log("unlinking")
            if (err) throw err;
          });
        }
      })
    }
  });
}