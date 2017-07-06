/**
 * 文章表
 * Created by jiayi on 2017/6/18.
 */
/**
 * 引入依赖
 */
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * 定义接口
 */
export type ArticleModel = mongoose.Document & {
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    title: String;    // 标题
    slug: String;
    content: String;
    author: Object;
    published: Boolean;
    abstract: String; // 简介
    views_count: Number; // 阅读数
    comments_count: Number; // 评论数
    likes_count: Number;  // 喜欢数
    wordage: Number; // 字数
    formatData: (data: ArticleModel, callback: (err: Error, results: Object) => any) => void
};

const articleSchema = new Schema({
    slug: {
        type: String
    },
    title: { // 标题
        type: String,
        minlength: 1,   // 最小1个字符
        maxlength: 20,  // 最大20个字符
        // unique: true,  // 不可重复约束
        required: true
    },
    views_count: {   // 阅读量
      type: Number,
      "default": 0
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
        ref: "User"                     // 关联用户表
    },
    published: {   // 是否发布
        type: Boolean,
        "default": false
    }
}, {timestamps: true});

/**
 * 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
 */
/*
articleSchema.pre("save", function save(next) {
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
    return data;
};

export default mongoose.model("Article", articleSchema);