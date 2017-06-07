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
import {IReport} from "./interfaces/report";

/**
 * 给Model添加注解
 */
export interface IReportModel extends IReport, Document {
}
/**
 * 定义Schema
 * @type {"mongoose".Schema}
 */
export const ReportSchema: Schema = new Schema({
    type: {    // 举报类型
        type: String,
        required: true,
        enum: ['0', '1', '2']  //0=> 用户、 1=> 文章、 2=> 评论留言
    },
    reporter_id: {   // 举报者id
        type: String,
        required: true
    },
    report: {   // 举报分类
        type: String,
        required: true,
        enum: ['ad', 'plagiarism', 'other']  //ad=> 广告及垃圾信息、plagiarism => 抄袭或未授权转载、 other => 其它
    },
    report_content: {   // 举报内容
        type: String,
        required: true
    },
    reporter: {    // 举报用户
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    defendant_id: {    // 被举报者id
        type: String,
        required: true
    },
    defendant: {   // 被举报用户
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    article: {   // 被举报的文章
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'Article'                     // 关联用户表
    },
    comments: {   // 被举报的文章评论和回复
        id: {
            type: String
        },
        parent_id: {
            type: String
        }
    },
    reply: {   // 是否答复
        type: Boolean,
        'default': false
    },
    reply_content: {   // 答复内容
        type: Boolean,
        'default': false
    },
    replyer: {   // 答复者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'Admin'                     // 关联用户表
    },
    replyed: {    // 答复时间
        type: Date,
        'default': Date.now
    },
    created: {     // 举报时间
        type: Date,
        'default': Date.now
    }
});

/**
 * 导出Model
 * @type {Model<IReportModel>}
 */
export const Report: Model<IReportModel> = model<IReportModel>("Report", ReportSchema);