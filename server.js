const express = require('express');
const jwt = require('jsonwebtoken');
const {register, login} = require('./routes/auth');
require('dotenv').config();

app = express();
app.use(express.json());


app.post('/register', register);
app.post('/login', login);
app.listen(3000, () => {
    console.log('listening on port 3000')
});