/**
 * Created by jiayi on 2017/5/29.
 */
export interface IUser {
    created?: Date;
    username?: string;
    password?: string;
    token?: string;
    nickname?: string;
    avatar?: string;
    intro?: string;
    homepage?: string;
    email?: string;
    mobile?: string;
    gender?: number;
    email_auth?: boolean;
    mobile_auth?: boolean;
    country_code?: string;
    locale?: string;
    email_notify?: string;
    chats_notify?: string;
    qrcode?: string;
}