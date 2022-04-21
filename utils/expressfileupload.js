
"use strict";
exports.fileuploader = (req, res)=>{
    const theapk = req.files.screenshots;
    console.log("theapk.name"+theapk[0])
    const uploadPath = `uploads/${theapk}`

    theapk.mv(uploadPath, (err)=>{
        if(err){console.log(err)}
        res.send("sent")
    });
}