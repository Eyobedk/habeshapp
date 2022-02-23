//const { verify } = require('jsonwebtoken');

const router = require('express').Router();
const verify = require('../middleware/varifyToken');


router.get('/',verify,(req, res)=>{
  res.send(req.user)
   // res.json({posts:{title:"wibit",description:"a fiction story of young girl"}});
});


module.exports = router;