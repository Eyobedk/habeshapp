const router = require('express').Router();
const verify = require('../middleware/varifyToken');


router.get('/',verify,(req, res)=>{
  res.send(req.user);
});


module.exports = router;