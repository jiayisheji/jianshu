/**
 * 文章评论表
 * Created by jiayi on 2017/7/20.
 */
/**
 * 引入依赖
 */
import * as mongoose from 'mongoose';
import {formatDate, getUserinfo} from '../controllers/utility';
import * as _ from 'Lodash';

const Schema = mongoose.Schema;

/**
 * 定义接口
 */
export type commentsChildrenModel = mongoose.Document & {
    _id: String;
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    user: String;      // 回复者
    user_slug: String;     // 回复者id
    compiled_content: String; // 回复内容
    parent_slug: String;  // 评论id
};

/**
 * 定义接口
 */
export type commentsModel = mongoose.Document & {
    slug: String;
    _id: String;
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    user: String;      // 评论者
    article_slug: String;    // 评论文章id
    article: String;    // 评论文章
    compiled_content: String; // 评论内容
    is_author: Boolean;    // 是否作者
    floor: Number;        // 盖楼
    user_slug: String;     // 评论者id
    likes: [any];         // 点赞列表
    children: commentsChildrenModel[]   // 回复列表
    likes_count: Number;     // 点赞次数
    children_count: Number;   // 回复数
};


const commentsChildrenSchema = new mongoose.Schema({
    user: {    // 登陆账号
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    compiled_content: {
        type: String,
        require: true // 不可为空约束
    },
    parent_slug: {
        type: String,
        require: true // 不可为空约束
    }
}, { timestamps: true });

const commentsSchema = new mongoose.Schema({
    article: {
        type: Schema.Types.ObjectId,        // 引用类型
        ref: 'Articles'                     // 关联文章表
    },
    user: {
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    compiled_content: {    // 登陆账号
        type: String,
        require: true // 不可为空约束
    },
    floor: {
      type: Number,
      'default': 1
    },
    children: [commentsChildrenSchema],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,    // 引用类型
                ref: 'User'                     // 关联用户表
            }
        }
    ]
}, { timestamps: true });



/**
 * 格式化数据
 * @method  formatData
 * @returns {commentsModel}
 */
commentsSchema.methods.formatData = function (): any {
    return {
        'slug': this._id,
        'updatedAt': formatDate(this.updatedAt),
        'createdAt': formatDate(this.createdAt),
        'user': getUserinfo(this.user),
        'user_slug': getUserinfo(this.user).slug,
        'compiled_content': this.compiled_content,
        'floor': this.floor,
        'description': this.description,
        'verify': this.verify,
        'push': this.push,
        'likes_count': this.links.length,
        'children_count': this.children.length,
        'children': _.map(this.children, function (item: any): Object {
            return {
                'slug': item._id,
                'createdAt': formatDate(item.createdAt),
                'user': getUserinfo(item.user),
                'user_slug': getUserinfo(item.user).slug,
                'compiled_content': item.compiled_content,
                'parent_slug': item.parent_slug
            };
        }),
        'article_slug': this.article._id
    };
};

export default mongoose.model('Comments', commentsSchema);
