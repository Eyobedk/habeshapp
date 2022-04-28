"use strict";
const fs = require('fs');
const Apps = require('../models/App')
const { HandleError} = require('../helpers/handleUploadExceptions')
const path = require('path')



const saver = (files, name) => {
  let HomePath = `uploads/${name}`;
  const appExtension = path.extname(files[0]['apkFile'].name);
  const backIExtension = path.extname(files[0]['backImage'].name);
  const IconExtension = path.extname(files[0]['iconFile'].name);

  const apkMD5 = files[0]['apkFile'].md5 + appExtension;
  const iconMD5 = files[0]['iconFile'].md5 +IconExtension ;
  const backIMD5 = files[0]['backImage'].md5 + backIExtension;

  let apkPath = HomePath + `/${apkMD5}`;
  let IconPath = HomePath + `/Icon/${iconMD5}`;
  let backIpath = HomePath + `/${backIMD5}`;


  let screenShootsPath = [];

  for (const file in files[0]) {
    if (file == 'apkFile') {
      fs.mkdir(HomePath, (err) => {
        HandleError();
      });
      
      files[0][file].mv(HomePath + `/${apkMD5}`, (err) => {
        HandleError();
      })
    }
    if (file == 'iconFile') {

      fs.mkdir(HomePath + `/Icon`, (err) => {
        HandleError();
      });
      
      files[0][file].mv(HomePath + `/Icon` + `/${iconMD5}`, (err) => {
        HandleError();
      })
    }
    if (file == 'backImage') {

      fs.mkdir(HomePath + `/backImage`, (err) => {
        HandleError();;
      });
      
      files[0][file].mv(HomePath + `/backImage` + `/${backIMD5}`, (err) => {
        HandleError();
      })
    }
    if (file == 'screenshot') {

      fs.mkdir(HomePath + `/screenshot`, (err) => {
        HandleError();;
      });
      for (let index = 0; index < files[0][file].length; index++) {
        const screenshExt = path.extname(files[0][file][index].name);
        const x = files[0][file][index].md5 + screenshExt;
        files[0][file][index].mv(HomePath + `/screenshot` + `/${x}`, (err) => {
          HandleError();
        })
        screenShootsPath.push(HomePath + `/screenshot/${x}`)
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
    res.render('developer/publish',{done:"done"})
  }).catch((err) => {
    console.log(err)
  });
  
}

exports.ListPublishedApp = async(req,res)=>{
  console.log(res.locals.dev.id)
  const ListofApps = await Apps.ListApps(res.locals.dev.id).catch((err)=>{console.log(err)});
  if(ListofApps)
  {
    console.log("list of apps")
    console.log(ListofApps);
  }
  let ToSend = [];
  ListofApps.forEach((file)=>{
    ToSend.push([file.appName, file.icon,file.appid])
  })
  console.log("air"+ToSend)
  
  res.render("developer/appls/appsUpdate", {ToSend})
}


exports.ListPublishedAppTobeDeleted = async(req,res)=>{
  console.log(res.locals.dev.id)
  const ListofApps = await Apps.ListApps(res.locals.dev.id).catch((err)=>{console.log(err)});
  if(ListofApps)
  {
    console.log("list of apps")
    console.log(ListofApps);
  }
  let ToSend = [];
  ListofApps.forEach((file)=>{
    ToSend.push([file.appName, '/' +file.icon,file.appid])
  })
  console.log("air"+ToSend)
  
  res.render("developer/appls/deleteApps", {ToSend})
}