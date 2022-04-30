const express = require('express');
const fileUpload = require('express-fileupload')

const cookieParser = require('cookie-parser');
require('dotenv').config();

const path = require('path')
const developeRoutes = require('./routes/developer');
const {requireAuth} = require('./middleware/auth');
const {checkDeveloper} = require('./middleware/checkStatus');

devapp = express();
devapp.set('view engine', 'ejs')
devapp.set("views", "./views")

devapp.use(fileUpload())

devapp.use(express.static('public'));
devapp.use(express.static('uploads'));
devapp.use(express.json());

devapp.use(cookieParser());
devapp.use('*', checkDeveloper);devapp.use(express.urlencoded({extended: false}))


devapp.use('/uploads',express.static(path.join(__dirname,'uploads')))
devapp.use('/updates',express.static(path.join(__dirname,'updates')))

devapp.use(developeRoutes)

devapp.listen(4000, console.log("dev at 4000"))