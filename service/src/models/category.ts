/**
 * Created by jiayi on 2017/5/27.
 */
/**
 * 引入依赖
 */
import {Document, Schema, Model, model} from "mongoose";
/**
 * 引入注解
 */
import {ICategory} from "./interfaces/category";

/**
 * 给Model添加注解
 */
export interface ICategoryModel extends ICategory, Document {
}
/**
 * 定义Schema
 * @type {"mongoose".Schema}
 */
export const CategorySchema: Schema = new Schema({
    title: {    // 标题必填
        type: String,
        required: true
    },
    created: {     // 发布时间
        type: Date,
        'default': Date.now
    },
    owner: {       // 所有者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    }
});

/**
 * 导出Model
 * @type {Model<ICategoryModel>}
 */
export const Category: Model<ICategoryModel> = model<ICategoryModel>("Category", CategorySchema);