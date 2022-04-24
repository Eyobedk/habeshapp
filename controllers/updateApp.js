const fs = require('fs');
const Apps = require('../models/App')
const fsPromises = require("fs/promises");
const {
  createDirectories,
  MoveApk,
  deleteImages
} = require('../helpers/fileUpdater')
const path = require('path');
var events = require('events');
var eventEmitter = new events.EventEmitter();

const updateSaver = (files, name) => {
  let HomePath = `updates/${name}`;
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

  const filesPath = {
    HomePath,
    apkPath,
    IconPath,
    backIpath,
    screenShootsPath
  }
  return filesPath
}








exports.updateApps = async (req, res) => {

  const Paths = await Promise.resolve(Apps.getAppsPath(req.params.id, res.locals.dev.id))
  const directory = `uploads/${Paths[0].appName}/`;
  try {
    console.log("nigit")
    //  const movedAppPatth = MoveApk(Paths)
    const ReturnedFolders = createDirectories(Paths);
    console.log(ReturnedFolders[0])
    console.log(ReturnedFolders[1])


    Promise.allSettled([await Promise.resolve(MoveApk(ReturnedFolders[0], ReturnedFolders[1])).catch((err) => {
      console.log(err)
    })]).then(async Result => {
      if (Result[0].status == 'fulfilled') {
        await Promise.resolve(deleteImages(directory)).catch((err) => {
          console.log(err)
        });
      }
    })
    //  console.log(await Promise.resolve(MoveApk(Paths))) //THIS WORKS FINE
    // console.log("alem")
    //  console.log();
    // if (movedAppPath) {
    //     // const deleteI = deleteImages(directory)
    //   console.log(deleteImages(directory))
    // }
    // then(()=>{
    //       deleteImages(directory);
    //     })
    //const moved = await MoveApk(Paths,,);
    // .then((result)=>{
    //   console.log(result)
    // })
    //  console.log(movedAppPatth);

  } catch (err) {
    console.log("from here" + err)
  }
  res.send("done")
}








//res.send("done")
// // Try it
// const filePath = "uploads/feres/icon/garbage_trash_bin_delete_icon_219499.ico";  
// deleteFile(filePath);