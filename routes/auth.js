
const {Router} = require("express");

const {validateInput,validateLoginInput,ValidateDeveloperRegister}= require('../middleware/inputValidator');
const {signup_Get,signup_Post,login_Get,login_Post,logout} = require('../controllers/auth');
const {Login_Dev} = require('../controllers/dev_auth');
const {forgot_password,validateAndSendLink,setNewPassword} = require('../controllers/forgot-password');
const {registerDeveloper,handleSuccess,dev_logout} = require('../controllers/dev_auth.js')



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

//Developer
router.get('/developer-register',(req, res)=>{res.render("login&signup/developer-register")})
router.post('/pay',registerDeveloper);
router.get('/success', handleSuccess);
router.get('/cancel', (req, res) => res.send('Cancelled'));


router.get('/developer-login', (req, res)=>{res.render("login&signup/developer-login")})
router.post('/developer-login', Login_Dev)
router.post('/dev-logout', dev_logout)
router.get('/developer-forgot', (req, res)=>{res.render("passwords/developer-forgot")})
router.get('/developer-reset', (req, res)=>{res.render("passwords/developer-reset")})


module.exports = router;