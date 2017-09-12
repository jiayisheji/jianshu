"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by jiayi on 2017/5/24.
 */
/**
 * 引入依赖
 */
const mongoose_1 = require("mongoose");
/**
 * 定义Schema
 * @type {"mongoose".Schema}
 */
exports.ArticleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User' // 关联用户表
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category' // 关联文集表
    },
    abstract: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        'default': false
    },
    created: {
        type: Date,
        'default': Date.now
    },
    updated: {
        type: Date,
        'default': Date.now
    },
    views_count: {
        type: Number,
        'default': 0
    },
    comments_count: {
        type: Number,
        'default': 0
    },
    likes_count: {
        type: Number,
        'default': 0
    }
});
/**
 * 导出Model
 * @type {Model<IArticleModel>}
 */
exports.Article = mongoose_1.model("Article", exports.ArticleSchema);
//# sourceMappingURL=article.js.map