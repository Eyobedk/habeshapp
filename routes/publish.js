const router = require('express').Router();
const verify = require('../middleware/varifyToken');
const path = require('path');

//verify
router.get('/homepage',(req, res)=>{
  res.render('home')
 // res.sendFile(path.join(__dirname,'../public/index.html'));
});


module.exports = router;