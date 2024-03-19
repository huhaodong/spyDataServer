export interface LiveStatus{
    wechatUin:string;
    liveID:string;
    likeCount:number;
    onlineCount:number;
    rewardTotalAmountInWecoin:number;
    startTimestamp:number;
    startDateStr:string;
    startTimeStr:string;
    currentTimeStamp:number;
    currentDateStr:string;
    currentTimeStr:string;
    liveTimestamp:number;
    liveTimeStr:string;
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

export interface responseData{
    status:number;//0正常，-1error
    message:string;//回复信息
}

export default class DataFormater{
    public formatFromeStatusBody(body): Promise<LiveStatus>{
        return new Promise((resolve,reject)=>{
            try {
                const ret = {} as LiveStatus;
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
            } catch (error) {
                reject(error);
            }
        });
    }

    public formatFromMessageBody(body): Promise<LiveMessage>{
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
}