const express = require('express');
const {register, login} = require('./routes/auth');
const publishRoute = require('./routes/publish');
require('dotenv').config();

app = express();
app.use(express.json());


app.post('/register', register);
app.post('/login', login);
app.get('/',publishRoute);

app.listen(3000, () => {
    console.log('listening on port 3000')
});