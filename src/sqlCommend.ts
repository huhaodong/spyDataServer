import { PassThrough } from "stream";
import { AnchorInfo, LiveMessage, LiveStatus } from "./dataFormat";

class SqlCmd {

    private databaseName:string = '';
    private liveStatuseTableName:string = '';
    private liveMessageTableName:string = '';
    private anchorInfoTableName:string = '';

    constructor(databaseNmae:string, 
        liveMessageTableName:string, 
        liveStatuseTableName:string,
        anchorInfoTableName:string){
        this.databaseName = databaseNmae;
        this.liveStatuseTableName = liveStatuseTableName;
        this.liveMessageTableName = liveMessageTableName;
        this.anchorInfoTableName = anchorInfoTableName;
    }

    public createDatabase(){
        const cmd = `CREATE DATABASE IF NOT EXISTS ${this.databaseName}`;
        return cmd;
    }

    public useDatabase(){
        const cmd = `USE ${this.databaseName}`;
        return cmd;
    }
    public createLiveStatusTable(){
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.liveStatuseTableName} (
            WechatUin VARCHAR(35),
            LiveID VARCHAR(35),
            LikeCount INT,
            OnlineCount INT,
            RewardTotalAmountInWecoin INT,
            StartTimestamp BIGINT,
            StartDateStr VARCHAR(35),
            StartTimeStr VARCHAR(35),
            CurrentTimestamp BIGINT,
            CurrentDateStr VARCHAR(35),
            CurrentTimeStr VARCHAR(35),
            LiveTimestamp BIGINT,
            LiveTimestr VARCHAR(25)
        )`
        return cmd;
    }
    public createLiveMessageTable(){
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.liveMessageTableName} (
            LiveID VARCHAR(35),
            UserSeq INT,
            UserOpenID VARCHAR(35),
            UserNickname VARCHAR(35),
            MessageTimestamp BIGINT,
            MessageDateStr VARCHAR(35),
            MessageTimeStr VARCHAR(35),
            MessageType VARCHAR(25),
            MessageContent TEXT
        )`
        return cmd;
    }
    public createAnchorInfo(){
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.anchorInfoTableName} (
            WechatUin VARCHAR(35) NOT NULL,
            Nickname VARCHAR(35),
            UNIQUE (WechatUin)
        )`
        return cmd;
    }

    public insertLiveStatus(liveStatus: LiveStatus){
        const cmd = `INSERT INTO ${this.liveStatuseTableName} (WechatUin, LiveID, LikeCount, OnlineCount, RewardTotalAmountInWecoin, StartTimestamp, StartDateStr, StartTimeStr, CurrentTimestamp, CurrentDateStr, CurrentTimeStr, LiveTimestamp, LiveTimestr) VALUES ("${liveStatus.wechatUin}", "${liveStatus.liveID}", ${liveStatus.likeCount}, ${liveStatus.onlineCount}, ${liveStatus.rewardTotalAmountInWecoin}, ${liveStatus.startTimestamp}, "${liveStatus.startDateStr}", "${liveStatus.startTimeStr}", ${liveStatus.currentTimeStamp}, "${liveStatus.currentDateStr}", "${liveStatus.currentTimeStr}", ${liveStatus.liveTimestamp}, "${liveStatus.liveTimeStr}")`;
        return cmd;
    }
    public insertLiveMessage(liveMessage: LiveMessage){
        const cmd = `INSERT INTO ${this.liveMessageTableName} (LiveID, UserSeq, UserOpenID, UserNickName, MessageTimestamp, MessageDateStr, MessageTimeStr, MessageType, MessageContent) VALUES ("${liveMessage.liveID}", ${liveMessage.userSeq}, "${liveMessage.userOpenID}", "${liveMessage.userNickName}", ${liveMessage.messageTimestamp}, "${liveMessage.messageDateStr}", "${liveMessage.messageTimeStr}", "${liveMessage.messageType}", "${liveMessage.messageContent}")`;
        return cmd;
    }
    public insertAnchorInfo(anchorInfo: AnchorInfo){
        const cmd = `INSERT INTO ${this.anchorInfoTableName} (WechatUin, Nickname) VALUES ("${anchorInfo.wechatUin}", "${anchorInfo.nickname}") ON DUPLICATE KEY UPDATE Nickname = VALUES(Nickname)`;
        return cmd;
    }
};
export default SqlCmd;