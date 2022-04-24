const fs = require('fs');
const {
  createDirectories,
  MoveApk,
  deleteImages
} = require('../helpers/fileUpdater')
const Apps = require('../models/App')





exports.updateApps = async (req, res) => {

  const Paths = await Promise.resolve(Apps.getAppsPath(req.params.id, res.locals.dev.id));
  date = new Date(Paths[0].publishedDate);
  year = date.getFullYear();
  month = date.getMonth()+1;
  dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  const theDate = year+'-' + month + '-'+dt;


  const directory = `uploads/${Paths[0].appName}/`;
  try {
    console.log("nigit")
    console.log(Paths[0].publishedDate)
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
    }).finally(async ()=>{await Apps.updateApp(Paths[0].appid, theDate,ReturnedFolders[1])}
    ).then(DbResult => {
      console.log(DbResult)
    }).catch(err => {
      console.log(err)
    })


  } catch (err) {
    console.log("from here" + err)
  }
  res.send("done")
}








//res.send("done")
// // Try it
// const filePath = "uploads/feres/icon/garbage_trash_bin_delete_icon_219499.ico";  
// deleteFile(filePath);