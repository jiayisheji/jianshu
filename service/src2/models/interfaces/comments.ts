/**
 * Created by jiayi on 2017/5/29.
 */
export interface IComments {
    article_id?: string;
    user_id?: string;
    floor?: number;
    liked?: boolean;
    likes?: Array<object>;
    likes_count?: number;
    compiled_content?: string;
    children?: Array<object>;
    children_count?: number;
    user?: object;
    updated?: Date;
    created?: object;
    is_author?: boolean;
}