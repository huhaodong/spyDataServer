import express from 'express';
import { createConnection } from 'mysql';
import { json } from 'body-parser';

// 创建连接到MySQL的连接
const connection = createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// 连接到数据库
connection.connect();

const app = express();
app.use(json());

// 接收客户端发送的数据并存储到MySQL
app.post('/computer-info', (req, res) => {
  const { system_time, battery_status } = req.body;
  connection.query('INSERT INTO computer_info (system_time, battery_status) VALUES (?, ?)', [system_time, battery_status], (error, results) => {
    if (error) throw error;
    res.send('Computer info saved successfully!');
  });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
