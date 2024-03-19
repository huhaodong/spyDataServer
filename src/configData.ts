export interface ConfigProps{
    databaseHost:string;
    databaseUser:string;
    databasePassword:string;
    databaseName:string;
    liveStatuseTableName:string;
    liveMessageTableName:string;
}

export default class ConfigData {
    private config: ConfigProps={
        databaseHost:'localhost',
        databaseUser:'root',
        databasePassword:'admin=wuxiang.',
        databaseName:'wuxiang_live',
        liveStatuseTableName:'live_status',
        liveMessageTableName:'live_message'
    }

    public getConfig():ConfigProps{
        return this.config;
    }
}