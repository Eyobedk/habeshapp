const {Router} = require("express");
const {signup_Get,signup_Post,login_Get,login_Post} = require('../controllers/auth');
const router = Router();


router.get('/signup', signup_Get)
router.post('/signup', signup_Post)
router.get('/login', login_Get)
router.post('/login', login_Post)
router.get('/set-cookie', (req, res) => {
    res.cookie('newUser', true,{maxAge:600000,httpOnly:true});
    res.send('<h1>cookie set</h1>')
})
router.get('/get-cookie', (req, res) => {
    const coookies = (req.cookies);
    console.log(coookies)
    res.send(coookies.newUser)
})
module.exports = router;