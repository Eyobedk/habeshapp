"use strict";
const fs = require('fs');


function saver(files, name) {
  let HomePath = `uploads/${name}`;

  for (const file in files[0]) {
    if (file == 'apkFile') {
      fs.mkdir(HomePath, (err) => {
        console.log(err);
      });
      files[0][file].mv(HomePath + `/${files[0][file].name}`, (err) => {
        console.log(err)
      })
    }
    if (file == 'iconFile') {

      fs.mkdir(HomePath + `/Icon`, (err) => {
        console.log(err);
      });
      files[0][file].mv(HomePath + `/Icon` + `/${files[0][file].name}`, (err, path) => {
        console.log("the path")
        console.log(path)
        console.log(err)
      })
    }
    if (file == 'backImage') {

      fs.mkdir(HomePath + `/backImage`, (err) => {
        console.log(err);
      });
      files[0][file].mv(HomePath + `/backImage` + `/${files[0][file].name}`, (err) => {
        console.log(err)
      })
    }
    if (file == 'screenshot') {

      fs.mkdir(HomePath + `/screenshot`, (err) => {
        console.log(err);
      });
      for (let index = 0; index < files[0][file].length; index++) {
        files[0][file][index].mv(HomePath + `/screenshot` + `/${files[0][file][index].name}`, (err) => {
          console.log(err)
        })
      }
    }
  }
}


exports.fileUploader = async (req, res) => {
  let apkFile = req.files.apk;
  let iconFile = req.files.icon;
  let backImage = req.files.backImage;
  let screenshot = req.files.screenshots;
  let {
    name
  } = req.body;

  const filesaver = [{
    apkFile,
    iconFile,
    backImage,
    screenshot
  }]
  saver(filesaver, name);
  res.send("FILE SAVED");
}