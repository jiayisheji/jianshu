export interface ILikes {
    article_id?: string;
    user_id?: string;
    likes?: Array<object>;
    likes_count?: number;
    created?: object;
    is_author?: boolean;
}