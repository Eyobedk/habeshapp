const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'matt',
    password: 'password',
    database: 'my_database'
});

connection.connect()