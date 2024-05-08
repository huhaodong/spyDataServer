export interface ConfigProps{
    databaseHost:string;
    databasePort:number;
    databaseUser:string;
    databasePassword:string;
    databaseName:string;
    liveStatuseTableName:string;
    liveMessageTableName:string;
    anchorInfoTableName:string;
    staffInfoTableName:string;
    operationsTeamInfoTableName:string;
    dailyRewardTableName:string;
    dyDailyRewardTableName:string;
    wxDailyRewardTableName:string;
    wxRewardDividends:number;
    wxPlatform:string;
    dyPlatform:string;
}

export default class ConfigData {
    private config: ConfigProps={
        databaseHost: '192.168.1.106',
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
        dyPlatform: "抖音",
        dyDailyRewardTableName: "dy_daily_reward",
        wxDailyRewardTableName: "wx_daily_reward"
    }

    public getConfig():ConfigProps{
        return this.config;
    }
}