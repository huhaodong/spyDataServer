import * as mysql from 'mysql';
import SqlCmd from './sqlCommend';
import { LiveMessage, LiveStatus, AnchorInfo } from './dataFormat';

export default class MySQLHandler {
  private connection: mysql.Connection;
  private sqlCmd: SqlCmd;

  constructor(host: string, port: number, user: string, password: string, database: string, liveMessageTableName:string, liveStatusTableName:string, anchorInfoTableName:string) {
    this.connection = mysql.createConnection({
      host: host,
      port: port,
      user: user,
      password: password,
      charsets: 'utf8mb4'
    });
    this.sqlCmd = new SqlCmd(database, liveMessageTableName, liveStatusTableName, anchorInfoTableName);
    this.connection.connect((err) => {
      if (err) {
        return console.error('错误: ' + err.message);
      }
      console.log('连接成功。');
    });
    // 检查数据库是否存在
    this.connection.query(this.sqlCmd.createDatabase(), (err, result) => {
      if (err) throw err;
      console.log('数据库已创建或已存在。');
    });
    // 使用数据库
    this.connection.query(this.sqlCmd.useDatabase(), (err, result) => {
      if (err) throw err;
    });
    // 检查状态表是否存在
    this.connection.query(this.sqlCmd.createLiveStatusTable(), (err, result) => {
      if (err) throw err;
    });
    // 检查弹幕表是否存在
    this.connection.query(this.sqlCmd.createLiveMessageTable(), (err, result) => {
      if (err) throw err;
    });
    // 检查主播信息表是否存在
    this.connection.query(this.sqlCmd.createAnchorInfo(), (err, result) => {
      if (err) throw err;
    });
  }

  public insertAnchorInfo(anchorInfo: AnchorInfo): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(this.sqlCmd.insertAnchorInfo(anchorInfo), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
  }

  public insertLiveMessage(liveMessage: LiveMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(this.sqlCmd.insertLiveMessage(liveMessage), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
  }

  public insertLiveStatus(liveStatus: LiveStatus): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(this.sqlCmd.insertLiveStatus(liveStatus), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }
}