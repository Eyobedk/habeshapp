
const {Router} = require("express");

const {validateSignupInput,validateLoginInput}= require('../middleware/inputValidator');
const {signup_Get,signup_Post,login_Get,login_Post,logout} = require('../controllers/UsersAuth');
const {AppInfo} = require('../controllers/users/AppInfo')
const {forgot_password,validateAndSendLink,setNewPassword} = require('../controllers/User-forgot-password');
const {requireAuth} = require('../middleware/auth');



const router = Router();

//User Login and Signup
router.get('/signup', signup_Get)
router.post('/signup',validateSignupInput,signup_Post)
router.get('/login', login_Get)
router.post('/login',validateLoginInput,login_Post)//
router.get('/logout', logout)

//Passwords
router.get('/forgot-password',(req, res)=>{res.render('passwords/forgot-password');})
router.post('/forgot-password',forgot_password)
router.get('/reset-password/:id/:token',validateAndSendLink)
router.post('/reset-password',setNewPassword)


router.get('/info', requireAuth,AppInfo)


module.exports = router;