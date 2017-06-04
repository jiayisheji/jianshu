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
import {IComments} from "./interfaces/comments";

/**
 * 给Model添加注解
 */
export interface ICommentsModel extends IComments, Document {
}
/**
 * 定义Schema
 * @type {"mongoose".Schema}
 */
export const CommentsSchema: Schema = new Schema({
    article_id: {    // 文章id
        type: String
    },
    user_id: {    // 用户id
        type: String
    },
    floor: {
        type: Number,   // 盖楼
        'default': 1
    },
    user: {   // 评论者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    liked: {   // 是否点赞
        type: Boolean,
        'default': false
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
    children_count: {    // 回复计数
        type: Number,
        'default': 0
    },
    children: [
        {
            user: {   // 回复者
                type: Schema.Types.ObjectId,    // 引用类型
                ref: 'User'                     // 关联用户表
            },
            compiled_content: {   // 回复内容
                type: String,
                required: true
            },
            content: String,
            sort: Number,
            parent_id: {   // 评论id
                type: String,
                required: true
            },
            created: {     // 回复时间
                type: Date,
                'default': Date.now
            },
        }
    ],
    compiled_content: {   // 评论内容
        type: String,
        required: true
    },
    created: {     // 发布时间
        type: Date,
        'default': Date.now
    },
    updated: {     // 更新时间
        type: Date,
        'default': Date.now
    },
    is_author: {    // 是否作者
        type: Boolean,
        'default': false
    }
});

// 添加评论时候去检查该评论是不是作者本人
CommentsSchema.pre('save', function (next) {
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
 * @type {Model<ICommentsModel>}
 */
export const Comments: Model<ICommentsModel> = model<ICommentsModel>("Comments", CommentsSchema);