const fs = require('fs');
const { HandleError} = require('../../helpers/handleUploadExceptions')
const {
  createDirectories,
  MoveApk,
  deleteImages
} = require('../../helpers/fileUpdater')
const Apps = require('../../models/App')


const newFileSaver = async(files, name) => {
  let HomePath = `uploads/${name}`;
  let newApkPath = HomePath + `/${files[0]['newApkFILE'].name}`;
  let newBackIpath = HomePath + `/${files[0]['newBackImage'].name}`;
  let screenShootsPath = [];

  for (const file in files[0]) {
    if (file == 'newApkFILE') {
      files[0][file].mv(HomePath + `/${files[0][file].name}`, (err) => {
        HandleError();
      })
    }
    if (file == 'newBackImage') {
      files[0][file].mv(HomePath + `/backImage` + `/${files[0][file].name}`, (err) => {
        HandleError();
      })
    }
    if (file == 'newScreenshots') {

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
    newApkPath,
    newBackIpath,
    screenShootsPath
  }
  return filesPath
}


exports.updateApps = async (req, res) => {
  const {funcOne,funcTwo,funcThree,funcFour} = req.body;
  const description = req.body.desc;
  const newApkFILE = req.files.apk;
  const newBackImage = req.files.backImage;
  const newScreenshots = req.files.screenshots;
  const newFilesArray = [{
    newApkFILE,
    newBackImage,
    newScreenshots,
  }]
  let newupdatedAppPath;
  let newscreenShootsPath;
  let newBackgroundImagesPath;


  const Paths = await Promise.resolve(Apps.getAppsPath(req.params.id, res.locals.dev.id));
  console.log("aha")
  console.log(Paths)
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
  console.log(theDate)


  const directory = `uploads/${Paths[0].appName}/`;
  try {
    console.log("nigit")
    console.log(Paths[0].publishedDate)
    const ReturnedFolders = createDirectories(Paths);
    console.log(ReturnedFolders[0])
    console.log(ReturnedFolders[1])

     // NEW PROCESS

      Promise.allSettled([
        await Promise.resolve(MoveApk(ReturnedFolders[0], ReturnedFolders[1]).catch((err) => { console.log(err)} )),
        await Promise.resolve(deleteImages(directory)).catch((err) => { console.log(err) }),
        await Promise.resolve(Apps.updateApp(Paths[0].appid, theDate, ReturnedFolders[1]).catch(err =>{console.log(err)})),
        await Promise.resolve(newFileSaver(newFilesArray, Paths[0].appName)).then(newFilesPath =>{
            newupdatedAppPath = newFilesPath.newApkPath;
            newscreenShootsPath = newFilesPath.screenShootsPath;
            newBackgroundImagesPath = newFilesPath.newBackIpath }),
        await Apps.UpdateTheAppTable(newupdatedAppPath, description,newscreenShootsPath,newBackgroundImagesPath, Paths[0].appid,funcOne,funcTwo,funcThree,funcFour).catch(err => {
            console.log(err)
          })

      ]).then(async result =>{
        res.render('developer/update',{done:"done"})
        for(let funct = 0; funct< result.length; funct++)
        {
          if(result[funct].status == 'fulfilled')
          {
            console.log('fullfiled   value:=' + result[funct].value)
          }
          else if(result[funct].status == 'rejected')
          {
            console.log('Rejected  value:=' + result[funct].reason)
          }
        }
      })

  } catch (err) {
    if (err) {
      console.log("from here" + err)
      return
    }

  } 
  //res.send("done")
}