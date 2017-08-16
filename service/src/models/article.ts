/**
 * 文章表
 * Created by jiayi on 2017/6/18.
 */
/**
 * 引入依赖
 */
import * as mongoose from 'mongoose';
import {formatDate, getUserinfo} from '../controllers/utility';
const Schema = mongoose.Schema;

/**
 * 定义接口
 */
export type ArticleModel = mongoose.Document & {
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    corpus: [Object];  // 被收录专题
    title: String;    // 标题
    slug: String;     // 文章标示
    content: String;  // 文章内容
    books: Object;   // 属于那个文集
    author: Object;   // 作者
    published: Boolean;  // 是否发布
    abstract: String; // 简介
    views_count: Number; // 阅读数
    comments_count: Number; // 评论数
    likes_count: Number;  // 喜欢数
    wordage: Number;    // 字数
    isActive: Boolean;  // 软删除
    formatData: () => ArticleModel;
};

const articleSchema = new Schema({
    title: { // 标题
        type: String,
        minlength: 1,   // 最小1个字符
        maxlength: 20,  // 最大20个字符
        // unique: true,  // 不可重复约束
        required: true
    },
    views_count: {   // 阅读量
      type: Number,
      'default': 0
    },
    content: { // 内容
        type: String,
        required: true
    },
    abstract: { // 简介
        type: String
    },
    wordage: {  // 字数
        type: Number
    },
    author: {   // 作者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    books: {
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'Books'                     // 关联文集表
    },
    corpus: [   // 被收录的专题
        {
            corpu: {
                type: Schema.Types.ObjectId,      // 引用类型
                ref: 'Corpus'                     // 关联专题表
            }
        }
    ],
    published: {   // 是否发布
        type: Boolean,
        'default': false
    },
    isActive: {   // 是否删除
        type: Boolean,
        'default': true
    }
}, {timestamps: true});

/**
 *
 */
/*
articleSchema.pre('save', function save(next) {
    const article = this;
    article.slug = article._id;
    return next();
});
*/

/**
 * 格式化数据
 * @method  formatData
 * @param {ArticleModel} data
 * @param callback
 * @returns {ArticleModel}
 */
articleSchema.methods.formatData = function (data: ArticleModel, callback?: any): any {
    return {
        'slug': this._id,
        'updatedAt': formatDate(this.updatedAt),
        'createdAt': formatDate(this.createdAt),
        'author': getUserinfo(this.author),
        'title': this.title,
        'avatar': this.avatar,
        'abstract': this.abstract,
        'content': this.content,
        'meta': {
            'read': this.views_count,
            'collectionTag': this.wordage,
            'comments': 100,
            'like': 100
        }
    };
};

export default mongoose.model('Articles', articleSchema);
