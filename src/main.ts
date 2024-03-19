import express from 'express';
import { json } from 'body-parser';
import MySQLHandler from './mysqlHandle';
import ConfigData from './configData';
import { LiveMessage, LiveStatus, responseData, DataFormater } from './dataFormat';

const config = new ConfigData();
const configData = config.getConfig();
let sqlH = new MySQLHandler(configData.databaseHost, configData.databaseUser, configData.databasePassword, configData.databaseName, configData.liveMessageTableName, configData.liveStatuseTableName);

const app = express();
app.use(json());

const dataformater = new DataFormater();

// 接收客户端发送的直播间状态数据并存储到MySQL
app.post('/livestatus', (req, res) => {
  const re = {} as responseData;

  dataformater.formatLiveStatus(req.body)
  .then((liveStatusData) => {
    sqlH.insertLiveStatus(liveStatusData)
    .then(() => {
      re.status = 0;
      re.message = "live status data saved successfully!";
      res.send(re);
    })
    .catch((error) => {
      re.status = -1;
      re.message = "live status data saved error!";
      res.send(re);
    }); 
  })
  .catch((error) => {
    console.error(`get some error on post /livestatus : ${error}`)
  });
});

// 接收客户端发送的直播间弹幕数据并存储到MySQL
app.post('/livemessage', (req, res) => {
  const re = {} as responseData;

  dataformater.formatFromMessageBody(req.body)
  .then((liveMessageData) => {
    sqlH.insertLiveMessage(liveMessageData)
    .then(() => {
      re.status = 0;
      re.message = "live message data saved successfully!";
      res.send(re);
    })
    .catch((error) => {
      re.status = -1;
      re.message = "live message data saved error!";
      res.send(re);
    }); 
  })
  .catch((error) => {
    console.error(`get some error on post /livemessage : ${error}`)
  });
});

// 测试联通性
app.get('/ping', (req, res) => {
  const re = {} as responseData;
  re.status = 0;
  re.message = "pong";
  res.send(re);
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
