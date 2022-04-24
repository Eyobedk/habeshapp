const {
    rejects
} = require('assert');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

exports.MoveApk = (ApkInfo) => {
    const che = ApkInfo[0].publishedDate;
    var month = che.getUTCMonth() + 1;
    var day = che.getUTCDate();
    var year = che.getUTCFullYear();
    const newdate = day + '_' + month + '_' + year;
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
    
    fsPromises.rename(ApkInfo[0].appLocation, movedApkPath, function (err) {
        if (err) throw err
        console.log("moved")
        //return movedApkPath
     })

    return movedApkPath
}

exports.deleteImages = (folder)=>{

  fs.readdir(folder, (err, files) => {
    let flag = true;
    if (err) throw err;
    console.log(files)
    console.log("readdir")
    for (const insideApp of files) {
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
          flag = false;
        }
        if (flag) {
          fs.unlink(path.join(`${folder}/${insideApp}/`, String(Insidefiles)), err => {
            console.log("unlinking")
            if (err) throw err;
          });
        }
      })
    }
  });
}