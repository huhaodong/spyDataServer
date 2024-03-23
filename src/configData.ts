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
}

export default class ConfigData {
    private config: ConfigProps={
        databaseHost:'localhost',
        databasePort:3306,
        databaseUser:'root',
        databasePassword:'admin=wuxiang.',
        databaseName:'wuxiang_live',
        liveStatuseTableName:'live_status',
        liveMessageTableName:'live_message',
        anchorInfoTableName:'anchor_info',
        staffInfoTableName:'staff_info'
    }

    public getConfig():ConfigProps{
        return this.config;
    }
}