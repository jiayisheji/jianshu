/**
 * Created by jiayi on 2017/5/24.
 */
/**
 * 引入依赖
 */
import {Document, Schema, Model, model} from "mongoose";
/**
 * 引入注解
 */
import {IArticle} from "./interfaces/article";

/**
 * 给Model添加注解
 */
export interface IArticleModel extends IArticle, Document {
}
/**
 * 定义Schema
 * @type {"mongoose".Schema}
 */
export const ArticleSchema: Schema = new Schema({
    title: {    // 标题必填
        type: String,
        required: true
    },
    content: {    // 正文必填
        type: String,
        required: true
    },
    author: {   // 作者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    category: {   // 文集
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'Category'                // 关联文集表
    },
    abstract: {    // 简介
        type: String,
        required: true
    },
    published: {   // 是否发布
        type: Boolean,
        'default': false
    },
    created: {     // 发布时间
        type: Date,
        'default': Date.now
    },
    updated: {     // 更新时间
        type: Date,
        'default': Date.now
    },
    meta: {
        type: Schema.Types.Mixed   //混合类型
    },
    comments_count: {     // 评论
        type: Number,
        'default': 0
    }
});

/**
 * 导出Model
 * @type {Model<IArticleModel>}
 */
export const Article: Model<IArticleModel> = model<IArticleModel>("Article", ArticleSchema);