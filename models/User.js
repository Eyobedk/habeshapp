const db = require('../db/database')

class User {
  constructor(name, password,email)
  {
    this.name = name;
    this.password = password;    
    this.email = email;    
  }

  async save()
  {
    const d = new Date();
    const year = d.getFullYear();
    const day = d.getDay();
    const month = d.getMonth() + 1;
    const date = `${year}-${month}-${day}`;
    console.log(date)
    "use strict";

    let sql = `INSERT INTO user(name,password,email,date) VALUES(${this.name},${this.password},${this.email},${date});`;

    const [register,_] = await db.execute(sql)
    return register;
  }
  static findEmail(){

  }
}


module.exports = User;