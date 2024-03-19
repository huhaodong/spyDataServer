"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFromMessageBody = exports.formatFromeStatusBody = void 0;
function formatFromeStatusBody(body) {
    return new Promise((resolve, reject) => {
        try {
            const ret = {};
            ret.wechatUin = body.wechatUin;
            ret.liveID = body.liveID;
            ret.likeCount = body.likeCount;
            ret.onlineCount = body.onlineCount;
            ret.rewardTotalAmountInWecoin = body.rewardTotalAmountInWecoin;
            ret.startTimestamp = body.startTimestamp;
            ret.startDateStr = body.startDateStr;
            ret.startTimeStr = body.startTimeStr;
            ret.currentTimeStamp = body.currentTimeStamp;
            ret.currentDateStr = body.currentDateStr;
            ret.currentTimeStr = body.currentTimeStr;
            ret.liveTimestamp = body.liveTimestamp;
            ret.liveTimeStr = body.liveTimeStr;
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
//# sourceMappingURL=dataFormat.js.map