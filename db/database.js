const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err,conn)=>{
  if(err)
  {
    if(err.code =='PROTOCOL_CONNECTION_LOST'){
      console.log('database connection was closed');
    }
    if(err.code == 'CON_COUNT_ERROR')
    {
      console.log('database has too many connections')
    }
    if(err.code =='ECONNREFUSED')
    {
      console.error('database connection was refused')
    }

    if(conn)
    {
      conn.release()
      return
    }
  }
})

module.exports = pool