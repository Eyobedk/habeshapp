const db = require('../db/database')

class User {
  constructor(username, password,email)
  {
    this.username = username;
    this.password = password;    
    this.email = email;    
  }

  async save()
  {
    const d = new Date();
    const year = d.getFullYear();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const date = `${year}-${month}-${day}`;
    console.log(this.username,this.password,this.email,date)

    let sql = `INSERT INTO user(name,password,email,currentdate) OUTPUT INSERTED.user_id
    VALUES ('${this.username}','${this.password}','${this.email}','${date}');`;
    const [result,_] = await db.execute(sql)
    console.log("output"+result);
    return result;
  }
  static async findEmail(email){
    const sql = `SELECT * FROM user WHERE email='${email}';`;
    const [result, _] = await db.execute(sql);
    console.log(result);
    return result;
  }
}


module.exports = User;