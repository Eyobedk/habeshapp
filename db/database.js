// get the client
const mysql = require('mysql2');
require('dotenv').config();
// create the connection to database
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: 'eyobed@moodOf404',
//   port: process.env.PORT,
//   database: process.env.DATABASE
// });

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});