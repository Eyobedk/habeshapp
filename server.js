const express = require('express');
const cors = require('cors');
const {register,login,tokenize,deleter} = require('./routes/auth');
const publishRoute = require('./routes/publish');
require('dotenv').config();

app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))


app.post('/register', register);
app.post('/login', login);
app.get('/', publishRoute);
app.post('/token', tokenize)
app.delete('/logout', deleter)
app.get('/forgot-password', )

app.listen(3000, () => {
    console.log('listening on port 3000')
});