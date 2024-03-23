"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigData {
    constructor() {
        this.config = {
            databaseHost: 'localhost',
            databasePort: 3306,
            databaseUser: 'root',
            databasePassword: 'admin=wuxiang.',
            databaseName: 'wuxiang_live',
            liveStatuseTableName: 'live_status',
            liveMessageTableName: 'live_message',
            anchorInfoTableName: 'anchor_info',
            staffInfoTableName: 'staff_info'
        };
    }
    getConfig() {
        return this.config;
    }
}
exports.default = ConfigData;
//# sourceMappingURL=configData.js.map