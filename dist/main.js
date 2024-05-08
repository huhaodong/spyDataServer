"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mysqlHandle_1 = __importDefault(require("./mysqlHandle"));
const configData_1 = __importDefault(require("./configData"));
const dataFormat_1 = require("./dataFormat");
const config = new configData_1.default();
const configData = config.getConfig();
let sqlH = new mysqlHandle_1.default(configData);
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
// 接收客户端发送的直播间状态数据并存储到MySQL
app.post('/livestatus', (req, res) => {
    const re = {};
    (0, dataFormat_1.formatFromeStatusBody)(req.body)
        .then((liveStatusData) => {
        let retstatus = 0;
        let retmessage = "";
        sqlH.insertLiveStatus(liveStatusData)
            .then(() => {
            retstatus = retstatus + 0;
            retmessage = retmessage + "live status data saved successfully!";
        })
            .catch((error) => {
            console.error(error);
            retstatus = -1 + retstatus;
            retmessage = "live status data saved error!";
        });
        // 根据热度插入流水表
        sqlH.insertDailyReward(liveStatusData)
            .then(() => {
            retstatus = retstatus + 0;
            retmessage = retmessage + "live daily reward data saved successfully!";
        })
            .catch((error) => {
            console.error(error);
            retstatus = -1 + retstatus;
            retmessage = retmessage + "live daily reward data saved error!";
        });
        re.status = retstatus;
        re.message = retmessage;
        res.send(re);
    })
        .catch((error) => {
        console.error(`get some error on post /livestatus : ${error}`);
    });
});
// 接收客户端发送的直播间弹幕数据并存储到MySQL
app.post('/livemessage', (req, res) => {
    const re = {};
    (0, dataFormat_1.formatFromMessageBody)(req.body)
        .then((liveMessageData) => {
        sqlH.insertLiveMessage(liveMessageData)
            .then(() => {
            re.status = 0;
            re.message = "live message data saved successfully!";
            res.send(re);
        })
            .catch((error) => {
            console.error(error);
            re.status = -1;
            re.message = "live message data saved error!";
            res.send(re);
        });
    })
        .catch((error) => {
        console.error(`get some error on post /livemessage : ${error}`);
    });
});
// 接受视频号mcn账号抓取的直播间数据并存储到MySQL
app.post('/wxdailyreward', (req, res) => {
    const re = {};
    (0, dataFormat_1.formatFromeWXDailyData)(req.body)
        .then((data) => {
        sqlH.insertWXDailyReward(data)
            .then(() => {
            re.status = 0;
            re.message = "weixin daily data saved successfully!";
            res.send(re);
        })
            .catch((error) => {
            console.error(error);
            re.status = -1;
            re.message = `weixin daily data saved error=>${error}`;
            res.send(re);
        });
    })
        .catch((error) => {
        console.error(`get some error on post /livemessage : ${error}`);
    });
});
// 接受抖音mcn账号抓取的直播间数据并存储到MySQL
app.post('/dydailyreward', (req, res) => {
    const re = {};
    (0, dataFormat_1.formatFromeDYDailyData)(req.body)
        .then((data) => {
        sqlH.insertDYDailyReward(data)
            .then(() => {
            re.status = 0;
            re.message = "douyin daily data saved successfully!";
            res.send(re);
        })
            .catch((error) => {
            console.error(error);
            re.status = -1;
            re.message = `douyin daily data saved error=>${error}`;
            res.send(re);
        });
    })
        .catch((error) => {
        console.error(`get some error on post /livemessage : ${error}`);
    });
});
// 接收客户端发送的主播属性数据并存储到MySQL
app.post('/anchorinfo', (req, res) => {
    const re = {};
    (0, dataFormat_1.formatFromAnchorInfo)(req.body)
        .then((anchorInfo) => {
        sqlH.insertAnchorInfo(anchorInfo)
            .then(() => {
            re.status = 0;
            re.message = "anchor info data saved successfully!";
            res.send(re);
        })
            .catch((error) => {
            console.error(error);
            re.status = -1;
            re.message = "anchor info data saved error!";
            res.send(re);
        });
    })
        .catch((error) => {
        console.error(`get some error on post /anchorinfo : ${error}`);
    });
});
// 测试联通性
app.get('/ping', (req, res) => {
    const re = {};
    re.status = 0;
    re.message = "pong";
    res.send(re);
});
// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=main.js.map