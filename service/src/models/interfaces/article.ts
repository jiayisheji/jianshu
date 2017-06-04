/**
 * Created by jiayi on 2017/5/29.
 */
export interface IArticle {
    title?: string;
    content?: string;
    author?: object;
    category?: object;
    abstract?: string;
    published?: boolean;
    created?: Date;
    updated?: Date;
    meta?: object;
    comments?: Array<object>
}