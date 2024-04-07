"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigData {
    constructor() {
        this.config = {
            databaseHost: 'localhost',
            databasePort: 3307,
            databaseUser: 'root',
            databasePassword: 'admin!wuxiang',
            databaseName: 'wuxiang_live',
            liveStatuseTableName: 'live_status_wx',
            liveMessageTableName: 'live_message_wx',
            anchorInfoTableName: 'anchor_info',
            staffInfoTableName: 'staff_info',
            operationsTeamInfoTableName: 'operations_team_info',
            dailyRewardTableName: 'daily_reward',
            wxRewardDividends: 0.1,
            wxPlatform: "视频号",
            dyPlatform: "抖音"
        };
    }
    getConfig() {
        return this.config;
    }
}
exports.default = ConfigData;
//# sourceMappingURL=configData.js.map