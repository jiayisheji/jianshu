/**
 * Created by jiayi on 2017/5/29.
 */
/**
 * 引入依赖
 */
import {Document, Schema, Model, model} from "mongoose";
import {Article} from './article';
import * as _ from 'lodash';
/**
 * 引入注解
 */
import {ILikes} from "./interfaces/likes";

/**
 * 给Model添加注解
 */
export interface ILikesModel extends ILikes, Document {
}
/**
 * 定义Schema
 * @type {"mongoose".Schema}
 */
export const LikesSchema: Schema = new Schema({
    article_id: {    // 文章id
        type: String
    },
    author_id: {    // 用户id
        type: String
    },
    likes: [    // 评论喜欢
        {    
            user: {   // 点赞者
                type: Schema.Types.ObjectId,    // 引用类型
                ref: 'User'                     // 关联用户表
            }
        }
    ],
    likes_count: {   // 点赞次数
        type: Number,
        'default': 0
    },
    created: {     // 发布时间
        type: Date,
        'default': Date.now
    }
});

// 添加评论时候去检查该评论是不是作者本人
LikesSchema.pre('save', function (next) {
    let comment = this;
    if (!_.isUndefined(comment.user_id)) {
        Article.findOne({_id: comment.article_id,'author': comment.user_id}).exec((err, article) => {   
            if (err) {
                return next(err);
            }
            comment.is_author = !_.isNull(article);
            next();
        });
    } else {
        return next();
    }
});

/**
 * 导出Model
 * @type {Model<ILikesModel>}
 */
export const Likes: Model<ILikesModel> = model<ILikesModel>("Likes", LikesSchema);