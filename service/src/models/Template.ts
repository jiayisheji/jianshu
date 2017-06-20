/**
 * 模板数据模型
 * Created by jiayi on 2017/6/20.
 */
/**
 * 引入依赖
 */
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
/**
 * 定义接口
 */
export type TemplateModel = mongoose.Document & {
    title: String,
    comparePassword: (candidatePassword: String, callback: (err: any, isMatch: boolean) => any) => void  // 验证密码
};

/**
 * 定义Schema
 */
const templateSchema = new Schema({
    title: {    // 标题必填
        type: String,
        minlength: 1,   // 最小1个字符
        maxlength: 20,  // 最大20个字符
        required: true
    }
}, { timestamps: true });

/**
 * Schema 操作中间件
 */
templateSchema.pre("save", function save(next) {
    const books = this;
    books.slug = books._id;
    return next();
});

/**
 * 添加方法
 * @method comparePassword
 * @param password {String}  验证密码
 * @param callback {Function}  回调函数
 */
templateSchema.methods.comparePassword = function(candidatePassword?: string, callback?: any): any {

};

export default mongoose.model("Template", templateSchema)