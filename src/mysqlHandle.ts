import * as mysql from 'mysql';
import SqlCmd from './sqlCommend';
import { LiveMessage, LiveStatus, AnchorInfo,DYDailyRewardData, WXDailyRewardData } from './dataFormat';
import { ConfigProps } from './configData';

export default class MySQLHandler {
  private connection: mysql.Connection;
  private sqlCmd: SqlCmd;

  constructor(conifg: ConfigProps) {
    this.connection = mysql.createConnection({
      host: conifg.databaseHost,
      port: conifg.databasePort,
      user: conifg.databaseUser,
      password: conifg.databasePassword,
      charsets: 'utf8mb4'
    });
    this.sqlCmd = new SqlCmd(conifg);
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
    // 检查雇员信息表是否存在
    this.connection.query(this.sqlCmd.createStaffInfo(), (err, result) => {
      if (err) throw err;
    });
    // 检查日流水表是否存在
    this.connection.query(this.sqlCmd.createDailyReward(), (err, result) => {
      if (err) throw err;
    });
    // 检查运运营团队信息表是否存在
    this.connection.query(this.sqlCmd.createOperationsTeamInfo(), (err, result) => {
      if (err) throw err;
    });
    // 检查抖音日记录表是否存在
    this.connection.query(this.sqlCmd.createDYDailyReward(), (err, result) => {
      if (err) throw err;
    });
    // 检查视频号日记录表是否存在
    this.connection.query(this.sqlCmd.createWXDailyReward(), (err, result) => {
      if (err) throw err;
    });
    // 创建日收益视图
    this.connection.query(this.sqlCmd.createDailyRewardView(), (err, result) => {
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

  // 插入抖音每日数据
  public insertDYDailyReward(data: DYDailyRewardData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(this.sqlCmd.insertDYDailyReward(data), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }

  // 插入视频号每日数据
  public insertWXDailyReward(data: WXDailyRewardData): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(this.sqlCmd.insertWXDailyReward(data), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }

  public insertDailyReward(liveStatus: LiveStatus): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(this.sqlCmd.insertDailyReward(liveStatus), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }
}