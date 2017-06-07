export interface IReport {
   type?: String;
    reporter_id?: String;
    report?: String;
    report_content?: String;
    reporter?: Object;
    defendant_id?: String;
    defendant?: Object;
    article?: Object;
    comments?: Object;
    reply?: Boolean;
    reply_content?: String
    replyer?: Object;
    replyed: Date;
    created?: Date;
}