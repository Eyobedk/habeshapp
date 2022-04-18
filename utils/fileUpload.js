const multer = require('multer');
const fs = require('fs');
"use strict";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file.originalname+"is the name")
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      console.log(JSON.stringify(req.files['apk'])+"is the files")

      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname+ '-' + uniqueSuffix + ext)
    }
  })

  const storageforIcon = multer.diskStorage({
    destination: function (req, file, cb) {
        if((fs.existsSync('uploads/Icon/'))) {
            cb(null, 'uploads/Icon')
        }else{console.log("app already ex")}
      
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname+ '-' + uniqueSuffix + ext)
    }
  })




  const upload = multer({ storage: storage })
  const uploadIcon = multer({ storage: storageforIcon })

  module.exports ={upload,uploadIcon};