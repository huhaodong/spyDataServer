"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const sqlCommend_1 = __importDefault(require("./sqlCommend"));
class MySQLHandler {
    constructor(host, port, user, password, database, liveMessageTableName, liveStatusTableName, anchorInfoTableName) {
        this.connection = mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: password,
            charsets: 'utf8mb4'
        });
        this.sqlCmd = new sqlCommend_1.default(database, liveMessageTableName, liveStatusTableName, anchorInfoTableName);
        this.connection.connect((err) => {
            if (err) {
                return console.error('错误: ' + err.message);
            }
            console.log('连接成功。');
        });
        // 检查数据库是否存在
        this.connection.query(this.sqlCmd.createDatabase(), (err, result) => {
            if (err)
                throw err;
            console.log('数据库已创建或已存在。');
        });
        // 使用数据库
        this.connection.query(this.sqlCmd.useDatabase(), (err, result) => {
            if (err)
                throw err;
        });
        // 检查状态表是否存在
        this.connection.query(this.sqlCmd.createLiveStatusTable(), (err, result) => {
            if (err)
                throw err;
        });
        // 检查弹幕表是否存在
        this.connection.query(this.sqlCmd.createLiveMessageTable(), (err, result) => {
            if (err)
                throw err;
        });
        // 检查主播信息表是否存在
        this.connection.query(this.sqlCmd.createAnchorInfo(), (err, result) => {
            if (err)
                throw err;
        });
    }
    insertAnchorInfo(anchorInfo) {
        return new Promise((resolve, reject) => {
            this.connection.query(this.sqlCmd.insertAnchorInfo(anchorInfo), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    insertLiveMessage(liveMessage) {
        return new Promise((resolve, reject) => {
            this.connection.query(this.sqlCmd.insertLiveMessage(liveMessage), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    insertLiveStatus(liveStatus) {
        return new Promise((resolve, reject) => {
            this.connection.query(this.sqlCmd.insertLiveStatus(liveStatus), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = MySQLHandler;
//# sourceMappingURL=mysqlHandle.js.map