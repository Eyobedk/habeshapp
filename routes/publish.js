const router = require('express').Router();
const verify = require('../middleware/varifyToken');


router.get('/homepage',verify,(req, res)=>{
  res.render('index');
});


module.exports = router;