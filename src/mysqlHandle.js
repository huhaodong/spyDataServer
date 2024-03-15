import * as mysql from 'mysql';

export default class MySQLHandler {
  private connection: mysql.Connection;

  constructor(host: String, user: String, password: String) {
    this.connection = mysql.createConnection({
      host: host,
      user: user,
      password: password
    })
    this.connection.connect((err) => {
      if (err) {
        return console.error('错误: ' + err.message);
    }
  }
}

  // 检查数据库是否存在
  connection.query('CREATE DATABASE IF NOT EXISTS wuxiang', (err, result) => {
    if (err) throw err;
    console.log('数据库已创建或已存在。');
  });

  // 使用数据库
  connection.query('USE wuxiang', (err, result) => {
    if (err) throw err;
  });

  // 创建表
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      comment TEXT
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('表已创建或已存在。');
  });
});
