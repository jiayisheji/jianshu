/**
 * 文章表
 * Created by jiayi on 2017/6/18.
 */
/**
 * 引入依赖
 */
import * as mongoose from "mongoose";

/**
 * 定义接口
 */
export type ArticleModel = mongoose.Document & {
    created: Date,   // 创建时间
    updated: Date,   // 更新时间

};

const articleSchema = new mongoose.Schema({
    created: {     // 创建时间
        type: Date,
        'default': new Date
    },
    updated: {     // 更新时间
        type: Date,
        'default': new Date
    }
}, { timestamps: true });

/**
 * 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
 */
articleSchema.pre("save", function save(next) {

});

/**
 * 校验用户输入密码是否正确
 * @method comparePassword
 * @param password {String}  验证密码
 * @param callback {Function}  回调函数
 */
articleSchema.methods.comparePassword = function(candidatePassword?: string, callback?: any): any {

};

export default mongoose.model("Article", articleSchema);