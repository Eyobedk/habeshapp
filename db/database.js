const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'habeshapp',
  password: 'eyobed@403',
});

// pool= util.promisify(pool)
 module.exports = pool.promise();
