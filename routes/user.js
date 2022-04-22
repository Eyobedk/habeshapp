
const {Router} = require("express");

const {validateInput,validateLoginInput}= require('../middleware/inputValidator');
const {signup_Get,signup_Post,login_Get,login_Post,logout} = require('../controllers/UsersAuth');
const {forgot_password,validateAndSendLink,setNewPassword} = require('../controllers/User-forgot-password');



const router = Router();

//User
router.get('/signup', signup_Get)
router.post('/signup',validateInput,signup_Post)
router.get('/login', login_Get)
router.post('/login',validateLoginInput,login_Post)//
router.get('/logout', logout)


router.get('/forgot-password',(req, res)=>{res.render('passwords/forgot-password');})
router.post('/forgot-password',forgot_password)
router.get('/reset-password/:id/:token',validateAndSendLink)
router.post('/reset-password',setNewPassword)


module.exports = router;