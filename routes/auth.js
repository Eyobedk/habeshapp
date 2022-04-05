const bodyparser = require('body-parser');
const {Router} = require("express");

const {validateInput,validateLoginInput}= require('../middleware/inputValidator');
const {signup_Get,signup_Post,login_Get,login_Post,logout} = require('../controllers/auth');
const {forgot_password,validateAndSendLink,setNewPassword} = require('../controllers/forgot-password');
const {registerDeveloper,handleSuccess} = require('../controllers/dev_auth.js')
const urlencodedParser = bodyparser.urlencoded({extended: false})


const router = Router();
router.get('/signup', signup_Get)
router.post('/signup', urlencodedParser,validateInput,signup_Post)
router.get('/login', login_Get)
router.post('/login',validateLoginInput,login_Post)//
router.get('/logout', logout)


router.get('/forgot-password',(req, res)=>{res.render('passwords/forgot-password');})
router.post('/forgot-password',forgot_password)
router.get('/reset-password/:id/:token',validateAndSendLink)
router.post('/reset-password',setNewPassword)


router.get('/developer-register', (req, res)=>{res.render("login&signup/developer-register")})
router.post('/pay', registerDeveloper);
router.get('/success', handleSuccess);
router.get('/cancel', (req, res) => res.send('Cancelled'));


router.get('/developer-login', (req, res)=>{res.render("login&signup/developer-login")})
router.get('/developer-forgot', (req, res)=>{res.render("passwords/developer-forgot")})
router.get('/developer-reset', (req, res)=>{res.render("passwords/developer-reset")})


module.exports = router;