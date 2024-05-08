"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFromeDYDailyData = exports.formatFromeWXDailyData = exports.formatFromMessageBody = exports.formatFromeStatusBody = exports.formatFromAnchorInfo = void 0;
const configData_1 = __importDefault(require("./configData"));
const config = new configData_1.default();
const configData = config.getConfig();
function formatFromAnchorInfo(body) {
    return new Promise((resolve, reject) => {
        try {
            const ret = {};
            ret.wechatUin = body.wechatUin;
            ret.nickname = body.nickname;
            resolve(ret);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.formatFromAnchorInfo = formatFromAnchorInfo;
function formatFromeStatusBody(body) {
    return new Promise((resolve, reject) => {
        try {
            const ret = {};
            ret.wechatUin = body.wechatUin;
            ret.liveID = body.liveID;
            ret.likeCount = body.likeCount;
            ret.onlineCount = body.onlineCount;
            ret.rewardTotalAmountInWecoin = body.rewardTotalAmountInWecoin;
            // 将微信热度换算成人民币流水
            ret.rewardRMB = ret.rewardTotalAmountInWecoin * configData.wxRewardDividends;
            ret.startTimestamp = body.startTimestamp;
            ret.startDateStr = body.startDateStr;
            // 将横线分割的日期改成斜线分割的日期
            ret.startDateSlashStr = ret.startDateStr.replace(/-/g, "/");
            // 将横线分割的日期中的年和月切分出来
            ret.startMounthStr = ret.startDateStr.split("-")[0] + "-" + ret.startDateStr.split("-")[1];
            ret.startTimeStr = body.startTimeStr;
            ret.currentTimeStamp = body.currentTimeStamp;
            ret.currentDateStr = body.currentDateStr;
            ret.currentTimeStr = body.currentTimeStr;
            ret.liveTimestamp = body.liveTimestamp;
            // 将秒换算成时
            ret.liveTimeHour = ret.liveTimestamp / 3600;
            ret.liveTimeStr = body.liveTimeStr;
            // 视频号平台来的标记为视频号。
            ret.thePlatform = configData.wxPlatform;
            resolve(ret);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.formatFromeStatusBody = formatFromeStatusBody;
function formatFromMessageBody(body) {
    return new Promise((resolve, reject) => {
        try {
            const ret = {};
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
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.formatFromMessageBody = formatFromMessageBody;
// 转换微信每日数据
function formatFromeWXDailyData(body) {
    return new Promise((resolve, reject) => {
        try {
            const ret = {};
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
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.formatFromeWXDailyData = formatFromeWXDailyData;
// 转换抖音每日数据
function formatFromeDYDailyData(body) {
    return new Promise((resolve, reject) => {
        try {
            const ret = {};
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
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.formatFromeDYDailyData = formatFromeDYDailyData;
//# sourceMappingURL=dataFormat.js.map