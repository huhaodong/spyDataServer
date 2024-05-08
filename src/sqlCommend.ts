import { PassThrough } from "stream";
import { AnchorInfo, LiveMessage, LiveStatus, DYDailyRewardData, WXDailyRewardData} from "./dataFormat";
import { ConfigProps } from "./configData";

class SqlCmd {

    private databaseName:string = '';
    private liveStatuseTableName:string = '';
    private liveMessageTableName:string = '';
    private anchorInfoTableName:string = '';
    private staffInfoTableName:string = '';
    private dailyRewardTableName:string = '';
    private OperationsTeamInfoTableName:string = '';
    private dyDailyRewardTableName:string = '';
    private wxDailyRewardTableName:string = '';

    constructor(config: ConfigProps){
        this.databaseName = config.databaseName;
        this.liveStatuseTableName = config.liveStatuseTableName;
        this.liveMessageTableName = config.liveMessageTableName;
        this.anchorInfoTableName = config.anchorInfoTableName;
        this.staffInfoTableName = config.staffInfoTableName;
        this.dailyRewardTableName = config.dailyRewardTableName;
        this.OperationsTeamInfoTableName = config.operationsTeamInfoTableName;
        this.dyDailyRewardTableName = config.dyDailyRewardTableName;
        this.wxDailyRewardTableName = config.wxDailyRewardTableName;
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
        // 原来的编码方式：utf8mb4_0900_ai_ci
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.liveStatuseTableName} (
          WechatUin varchar(35) DEFAULT NULL,
          LiveID varchar(35) DEFAULT NULL,
          LikeCount int DEFAULT NULL,
          OnlineCount int DEFAULT NULL,
          RewardTotalAmountInWecoin int DEFAULT NULL,
          StartTimestamp bigint DEFAULT NULL,
          StartDateStr varchar(35) DEFAULT NULL,
          StartTimeStr varchar(35) DEFAULT NULL,
          CurrentTimestamp bigint DEFAULT NULL,
          CurrentDateStr varchar(35) DEFAULT NULL,
          CurrentTimeStr varchar(35) DEFAULT NULL,
          LiveTimestamp bigint DEFAULT NULL,
          LiveTimestr varchar(25) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='保存所有微信视频号上的直播状态数据，条目众多，是实时数据';`
        return cmd;
    }
    public createLiveMessageTable(){
        
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.liveMessageTableName} (
          LiveID varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          UserSeq int DEFAULT NULL,
          UserOpenID varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          UserNickname varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          MessageTimestamp bigint DEFAULT NULL,
          MessageDateStr varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          MessageTimeStr varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          MessageType varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          MessageContent text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='保存所有从微信视频号来的弹幕信息';`
        return cmd;
    }
    public createAnchorInfo(){
        
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.anchorInfoTableName} (
          WechatUin varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
          Nickname varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
          Sex varchar(15) DEFAULT NULL,
          Age int DEFAULT NULL,
          SpervisorID int DEFAULT NULL,
          Dividends float DEFAULT '0',
          Name varchar(255) DEFAULT NULL,
          Status varchar(50) DEFAULT NULL,
          WorkTime varchar(100) DEFAULT NULL,
          GuaranteedSalary float DEFAULT '0',
          GuaranteedTime varchar(100) DEFAULT NULL,
          AnchorBelongs varchar(255) DEFAULT NULL,
          OperationsTeam varchar(255) DEFAULT NULL,
          OperationsTeamID int DEFAULT NULL,
          SpervisorName varchar(255) DEFAULT NULL,
          LivePlatform varchar(255) DEFAULT NULL,
          LiveFormat varchar(255) DEFAULT NULL,
          WXHyperlinks varchar(255) DEFAULT NULL,
          DYHyperlinks varchar(255) DEFAULT NULL,
          ContractDuration int DEFAULT NULL,
          ContractStartTime varchar(100) DEFAULT NULL,
          ContractEndTime varchar(100) DEFAULT NULL,
          DouyinUin varchar(255) DEFAULT NULL,
          PRIMARY KEY (Nickname),
          UNIQUE KEY anchor_info_unique (WechatUin),
          UNIQUE KEY anchor_info_unique_1 (DouyinUin)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='主播信息表';`
        return cmd;
    }
    public createStaffInfo(){
        
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.staffInfoTableName} (
          ID int NOT NULL AUTO_INCREMENT,
          Name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          Sex varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          Age int DEFAULT NULL,
          Department varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          TEL varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          OpreationsTeam varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          OperationsTeamID int DEFAULT NULL,
          PRIMARY KEY (ID)
        ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='员工信息，管理员信息';`
        return cmd;
    }

    public createOperationsTeamInfo(){
        
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.OperationsTeamInfoTableName} (
          ID int NOT NULL AUTO_INCREMENT,
          OperationsTeam varchar(100) NOT NULL,
          Dividends float NOT NULL,
          PRIMARY KEY (ID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='运营团队信息';`
        return cmd;
    }

    public createDailyReward(){
        
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.dailyRewardTableName} (
          LiveID varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
          AnchorNickname varchar(255) DEFAULT "UNKNOW",
          ThePlatform varchar(100) DEFAULT NULL,
          Reward double DEFAULT '0',
          LiveTime double DEFAULT '0',
          NumberOfViewers int DEFAULT '0',
          Hyperlinks varchar(255) DEFAULT NULL,
          StartLiveTimestamp bigint DEFAULT NULL,
          DateStr varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
          MonthStr varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
          EndLiveTimestamp bigint DEFAULT NULL,
          PRIMARY KEY (LiveID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='这个表用来记录每日的流水信息，每场直播只会保留一条信息';`
        return cmd;
    }

    public createDYDailyReward(){
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.dyDailyRewardTableName} (
          dyRewardID int NOT NULL AUTO_INCREMENT COMMENT '抖音日记录ID',
          nickName varchar(255) DEFAULT NULL COMMENT '主播别名',
          anchorID varchar(255) DEFAULT NULL COMMENT '主播抖音ID',
          liveDate varchar(100) DEFAULT NULL COMMENT '直播日期',
          liveDayNum int DEFAULT '0' COMMENT '有效直播天数',
          liveTime float DEFAULT '0' COMMENT '直播时长',
          liveEffectiveTime float DEFAULT '0' COMMENT '有效直播时长',
          maxWatchNum int DEFAULT '0' COMMENT '最大观看人数',
          dayAvgACU float DEFAULT '0' COMMENT '日场均ACU',
          liveRoomFlow float DEFAULT '0' COMMENT '直播间流水',
          anchorGiftIncome float DEFAULT '0' COMMENT '主播礼物收入',
          anchorTotalIncome float DEFAULT '0' COMMENT '主播总收入',
          platform varchar(100) DEFAULT NULL COMMENT '平台',
          liveMounth varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '直播月份',
          PRIMARY KEY (dyRewardID)
        ) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;`
        return cmd;
    }

    public createWXDailyReward(){
        const cmd = `CREATE TABLE IF NOT EXISTS ${this.wxDailyRewardTableName} (
          wxRewardID int NOT NULL AUTO_INCREMENT COMMENT 'ID标识',
          nickName varchar(255) NOT NULL COMMENT '主播姓名',
          wxAnchorID varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '主播wxID',
          liveDate varchar(100) DEFAULT NULL COMMENT '直播日期',
          adminName varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'UNKNOW' COMMENT '管理者姓名',
          liveDayNum int DEFAULT '0' COMMENT '有效直播天数',
          liveTime float DEFAULT '0' COMMENT '直播时长，包括无效时长',
          liveEffectiveTime float DEFAULT '0' COMMENT '有效直播时长',
          watchNum int DEFAULT '0' COMMENT '观看人数',
          dayAvgACU float DEFAULT '0' COMMENT '日场均ACU',
          giftPersonNum int DEFAULT '0' COMMENT '送礼人数',
          liveRoomFlow float DEFAULT '0' COMMENT '直播间流水',
          anchorGiftIncome float DEFAULT '0' COMMENT '主播礼物收入',
          anchorMicIncome float DEFAULT '0' COMMENT '上麦观众分成收入',
          anchorRoomIncome float DEFAULT '0' COMMENT '公会同房间上麦收入',
          anchorTotalIncome float DEFAULT '0' COMMENT '主播总收入',
          ordersNum int DEFAULT '0' COMMENT '带货成交订单数',
          ordersAmount float DEFAULT '0' COMMENT '带货成交金额',
          orderRetNum int DEFAULT '0' COMMENT '带货退款订单数',
          orderRetAmount float DEFAULT '0' COMMENT '带货退款金额',
          platform varchar(100) DEFAULT NULL COMMENT '平台',
          liveMounth varchar(100) DEFAULT NULL COMMENT '直播月份',
          PRIMARY KEY (wxRewardID)
        ) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;`
        return cmd;
    }

    public createDailyRewardView(){
        const cmd = `create or replace
        algorithm = UNDEFINED view daily_reward_view as
        select
            wdr.liveDate as liveDate,
            wdr.liveMounth as liveMounth,
            wdr.nickName as nickName,
            wdr.platform as platform,
            wdr.liveRoomFlow as liveRoomFlow,
            ai.Dividends as Dividends,
            ai.OperationsTeam as OperationsTeam,
            oti.Dividends as OperationsTeamDividends,
            (oti.Dividends * wdr.liveRoomFlow) as OperationsTeamReward,
            (ai.Dividends * wdr.liveRoomFlow) as anchorReward,
            wdr.liveEffectiveTime as liveEffectiveTime,
            wdr.watchNum as watchNum
        from
            ((wx_daily_reward wdr
        left join anchor_info ai on
            ((wdr.nickName = ai.Nickname)))
        left join operations_team_info oti on
            ((ai.OperationsTeam = oti.OperationsTeam)))
        union all
        select
            ddr.liveDate as liveDate,
            ddr.liveMounth as liveMounth,
            ddr.nickName as nickName,
            ddr.platform as platform,
            ddr.liveRoomFlow as liveRoomFlow,
            ai.Dividends as Dividends,
            ai.OperationsTeam as OperationsTeam,
            oti.Dividends as OperationsTeamDividends,
            (oti.Dividends * ddr.liveRoomFlow) as OperationsTeamReward,
            (ai.Dividends * ddr.liveRoomFlow) as anchorReward,
            ddr.liveEffectiveTime as liveEffectiveTime,
            ddr.maxWatchNum as watchNum
        from
            ((dy_daily_reward ddr
        left join anchor_info ai on
            ((ddr.nickName = ai.Nickname)))
        left join operations_team_info oti on
            ((ai.OperationsTeam = oti.OperationsTeam)));`

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
        const cmd = `INSERT INTO ${this.anchorInfoTableName} 
        (WechatUin, Nickname) 
        VALUES ("${anchorInfo.wechatUin}", "${anchorInfo.nickname}") as new 
        ON DUPLICATE KEY UPDATE Nickname = new.Nickname`;
        return cmd;
    }
    public insertDailyReward(liveStatus: LiveStatus){
        const cmd = `insert into ${this.dailyRewardTableName} 
        (AnchorNickname,ThePlatform,Reward,LiveTime,StartLiveTimestamp,DateStr,MonthStr,LiveID,EndLiveTimestamp) 
        values ((select ifnull(a.Nickname,"${liveStatus.wechatUin}") from anchor_info as a where a.WechatUin = "${liveStatus.wechatUin}" limit 1),"${liveStatus.thePlatform}",${liveStatus.rewardRMB},${liveStatus.liveTimeHour},${liveStatus.startTimestamp},"${liveStatus.startDateStr}","${liveStatus.startMounthStr}","${liveStatus.liveID}",${liveStatus.currentTimeStamp}) 
        as new 
        ON DUPLICATE KEY UPDATE AnchorNickname=new.AnchorNickname,Reward=new.Reward,LiveTime=new.LiveTime,EndLiveTimestamp=new.EndLiveTimestamp;`;
        return cmd;
    }

    public insertDYDailyReward(dyDailyReward: DYDailyRewardData){
        const cmd = `INSERT INTO ${this.dyDailyRewardTableName}
        (nickName, anchorID, liveDate, liveDayNum, liveTime, liveEffectiveTime, maxWatchNum, dayAvgACU, liveRoomFlow, anchorGiftIncome, anchorTotalIncome, platform, liveMounth)
        VALUES('${dyDailyReward.nickName}', '${dyDailyReward.anchorID}', '${dyDailyReward.liveDate}', ${dyDailyReward.liveDayNum}, ${dyDailyReward.liveTime}, ${dyDailyReward.liveEffectiveTime}, ${dyDailyReward.maxWatchNum}, ${dyDailyReward.dayAvgACU}, ${dyDailyReward.liveRoomFlow}, ${dyDailyReward.anchorGiftIncome}, ${dyDailyReward.anchorTotalIncome}, '${dyDailyReward.platform}', '${dyDailyReward.liveMounth}');`

        return cmd;
    }

    public insertWXDailyReward(data: WXDailyRewardData){
        const cmd = `INSERT INTO ${this.wxDailyRewardTableName}
        (nickName, wxAnchorID, liveDate, adminName, liveDayNum, liveTime, liveEffectiveTime, watchNum, dayAvgACU, giftPersonNum, liveRoomFlow, anchorGiftIncome, anchorMicIncome, anchorRoomIncome, anchorTotalIncome, ordersNum, ordersAmount, orderRetNum, orderRetAmount, platform, liveMounth)
        VALUES
        ('${data.nickName}', '${data.wxAnchorID}', '${data.liveDate}', '${data.adminName}', ${data.liveDayNum}, ${data.liveTime}, ${data.liveEffectiveTime}, ${data.watchNum}, ${data.dayAvgACU}, ${data.giftPersonNum}, ${data.liveRoomFlow}, ${data.anchorGiftIncome}, ${data.anchorMicIncome}, ${data.anchorRoomIncome}, ${data.anchorTotalIncome}, ${data.ordersNum}, ${data.ordersAmount}, ${data.orderRetNum}, ${data.orderRetAmount}, '${data.platform}', '${data.liveMounth}');`
        return cmd;
    }
};
export default SqlCmd;