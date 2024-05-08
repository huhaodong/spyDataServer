import ConfigData from "./configData";

const config = new ConfigData();
const configData = config.getConfig();

export interface LiveStatus{
    wechatUin:string;
    liveID:string;
    likeCount:number;
    onlineCount:number;
    rewardTotalAmountInWecoin:number;
    rewardRMB:number;
    startTimestamp:number;
    startDateStr:string;
    startDateSlashStr:string;
    startMounthStr:string;
    startTimeStr:string;
    currentTimeStamp:number;
    currentDateStr:string;
    currentTimeStr:string;
    liveTimestamp:number;
    liveTimeStr:string;
    liveTimeHour:number;
    thePlatform:string;
}

export interface LiveMessage{
    liveID:string;
    userSeq:number;
    userOpenID:string;
    userNickName:string;
    messageTimestamp:number;
    messageDateStr:string;
    messageTimeStr:string;
    messageType:string;
    messageContent:string;
}

export interface AnchorInfo{
    wechatUin:string;
    nickname:string;
}

export interface ResponseData{
    status:number;//0正常，-1error
    message:string;//回复信息
}

// 抖音每日收益数据
export interface DYDailyRewardData{
    nickName:string;
    anchorID:string;
    liveDate:string;
    liveDayNum:number;
    liveTime:number;
    liveEffectiveTime:number;
    maxWatchNum:number;
    dayAvgACU:number;
    liveRoomFlow:number;
    anchorGiftIncome:number;
    anchorTotalIncome:number;
    platform:string;
    liveMounth:string;
}

// 视频号每日收益数据
export interface WXDailyRewardData{
    nickName:string;
    wxAnchorID:string;
    liveDate:string;
    adminName:string;
    liveDayNum:number;
    liveTime:number;
    liveEffectiveTime:number;
    watchNum:number;
    dayAvgACU:number;
    giftPersonNum:number;
    liveRoomFlow:number;
    anchorGiftIncome:number;
    anchorMicIncome:number;
    anchorRoomIncome:number;
    anchorTotalIncome:number;
    ordersNum:number;
    ordersAmount:number;
    orderRetNum:number;
    orderRetAmount:number;
    platform:string;
    liveMounth:string;
}

export function formatFromAnchorInfo(body): Promise<AnchorInfo>{
    return new Promise((resolve,reject)=>{
        try {
            const ret = {} as AnchorInfo;
            ret.wechatUin = body.wechatUin;
            ret.nickname = body.nickname;
            resolve(ret);
        } catch (error) {
            reject(error);
        }
    });
}

export function formatFromeStatusBody(body): Promise<LiveStatus>{
    return new Promise((resolve,reject)=>{
        try {
            const ret = {} as LiveStatus;
            ret.wechatUin = body.wechatUin;
            ret.liveID = body.liveID;
            ret.likeCount = body.likeCount;
            ret.onlineCount = body.onlineCount;
            ret.rewardTotalAmountInWecoin = body.rewardTotalAmountInWecoin;
            // 将微信热度换算成人民币流水
            ret.rewardRMB = ret.rewardTotalAmountInWecoin*configData.wxRewardDividends;
            ret.startTimestamp = body.startTimestamp;
            ret.startDateStr = body.startDateStr;
            // 将横线分割的日期改成斜线分割的日期
            ret.startDateSlashStr = ret.startDateStr.replace(/-/g, "/");
            // 将横线分割的日期中的年和月切分出来
            ret.startMounthStr = ret.startDateStr.split("-")[0]+"-"+ret.startDateStr.split("-")[1];
            ret.startTimeStr = body.startTimeStr;
            ret.currentTimeStamp = body.currentTimeStamp;
            ret.currentDateStr = body.currentDateStr;
            ret.currentTimeStr = body.currentTimeStr;
            ret.liveTimestamp = body.liveTimestamp;
            // 将秒换算成时
            ret.liveTimeHour = ret.liveTimestamp/3600;
            ret.liveTimeStr = body.liveTimeStr;
            // 视频号平台来的标记为视频号。
            ret.thePlatform = configData.wxPlatform;
            resolve(ret);
        } catch (error) {
            reject(error);
        }
    });
}

export function formatFromMessageBody(body): Promise<LiveMessage>{
    return new Promise((resolve, reject) => {
        try {
            const ret = {} as LiveMessage;
            ret.liveID = body.liveID;
            ret.userSeq = body.userSeq;
            ret.userOpenID = body.userOpenID;
            ret.userNickName = body.userNickName;
            ret.messageTimestamp = body.messageTimestamp;
            ret.messageDateStr = body.messageDateStr;
            ret.messageTimeStr = body.messageTimeStr;
            ret.messageType = body.messageType;
            ret.messageContent = body.messageContent;
            resolve(ret);
        } catch (error) {
            reject(error);
        }
    });  
}

// 转换微信每日数据
export function formatFromeWXDailyData(body): Promise<WXDailyRewardData>{
    return new Promise((resolve,reject)=>{
        try {
            const ret = {} as WXDailyRewardData;
            ret.nickName = body.nickName;
            ret.wxAnchorID = body.wxAnchorID;
            ret.liveDate = body.liveDate;
            ret.adminName = body.adminName;
            ret.liveDayNum = body.liveDayNum;
            ret.liveTime = body.liveTime;
            ret.liveEffectiveTime = body.liveEffectiveTime;
            ret.watchNum = body.watchNum;
            ret.dayAvgACU = body.dayAvgACU;
            ret.giftPersonNum = body.giftPersonNum;
            ret.liveRoomFlow = body.liveRoomFlow;
            ret.anchorGiftIncome = body.anchorGiftIncome;
            ret.anchorMicIncome = body.anchorMicIncome;
            ret.anchorRoomIncome = body.anchorRoomIncome;
            ret.anchorTotalIncome = body.anchorTotalIncome;
            ret.ordersNum = body.ordersNum;
            ret.ordersAmount = body.ordersAmount;
            ret.orderRetNum = body.orderRetNum;
            ret.orderRetAmount = body.orderRetAmount;
            ret.platform = body.platform;
            ret.liveMounth = body.liveMounth;
            resolve(ret);
        } catch (error) {
            reject(error);
        }
    });
}

// 转换抖音每日数据
export function formatFromeDYDailyData(body): Promise<DYDailyRewardData>{
    return new Promise((resolve,reject)=>{
        try {
            const ret = {} as DYDailyRewardData;
            ret.nickName = body.nickName;
            ret.anchorID = body.anchorID;
            ret.liveDate = body.liveDate;
            ret.liveDayNum = body.liveDayNum;
            ret.liveTime = body.liveTime;
            ret.liveEffectiveTime = body.liveEffectiveTime;
            ret.maxWatchNum = body.maxWatchNum;
            ret.dayAvgACU = body.dayAvgACU;
            ret.liveRoomFlow = body.liveRoomFlow;
            ret.anchorGiftIncome = body.anchorGiftIncome;
            ret.anchorTotalIncome = body.anchorTotalIncome;
            ret.platform = body.platform;
            ret.liveMounth = body.liveMounth;
            resolve(ret);
        } catch (error) {
            reject(error);
        }
    });
}