"use strict";
const fs = require('fs');
const Apps = require('../models/App')
const { HandleError} = require('../helpers/handleUploadExceptions')



const saver = (files, name) => {
  let HomePath = `uploads/${name}`;
  let apkPath = HomePath + `/${files[0]['apkFile'].name}`;
  let IconPath = HomePath + `/${files[0]['iconFile'].name}`;
  let backIpath = HomePath + `/${files[0]['backImage'].name}`;
  let screenShootsPath = [];

  for (const file in files[0]) {
    if (file == 'apkFile') {
      fs.mkdir(HomePath, (err) => {
        HandleError();
      });
      files[0][file].mv(HomePath + `/${files[0][file].name}`, (err) => {
        HandleError();
      })
    }
    if (file == 'iconFile') {

      fs.mkdir(HomePath + `/Icon`, (err) => {
        HandleError();
      });
      files[0][file].mv(HomePath + `/Icon` + `/${files[0][file].name}`, (err) => {
        HandleError();
      })
    }
    if (file == 'backImage') {

      fs.mkdir(HomePath + `/backImage`, (err) => {
        HandleError();;
      });
      files[0][file].mv(HomePath + `/backImage` + `/${files[0][file].name}`, (err) => {
        HandleError();
      })
    }
    if (file == 'screenshot') {

      fs.mkdir(HomePath + `/screenshot`, (err) => {
        HandleError();;
      });
      for (let index = 0; index < files[0][file].length; index++) {
        files[0][file][index].mv(HomePath + `/screenshot` + `/${files[0][file][index].name}`, (err) => {
          HandleError();
        })
        screenShootsPath.push(HomePath + `/screenshot/${files[0][file][index].name}`)
      }
    }
   }

  const filesPath = {HomePath,apkPath,IconPath, backIpath,screenShootsPath}
  return filesPath
}


exports.fileUploader = async (req, res) => {
  let {name,choosen,desc} = req.body;
  let apkFile = req.files.apk;
  let iconFile = req.files.icon;
  let backImage = req.files.backImage;
  let screenshot = req.files.screenshots;
  

  const filesaver = [{apkFile,iconFile,backImage,screenshot}]
  const paths = saver(filesaver, name);
  const theApps = new Apps(name, choosen, desc, paths.apkPath, paths.IconPath, paths.screenShootsPath, paths.backIpath, res.locals.dev.id);
  await theApps.save().then(() => {
    res.send("FILE SAVED");
  }).catch((err) => {
    console.log(err)
  });
  
}