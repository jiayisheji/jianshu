/**
 * 文集表 （文章集合）
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
export type BooksModel = mongoose.Document & {
    title: string,
    owner: any,
    createdAt: Date,
    updatedAt: Date,
    articles: [any]
};

/**
 * 定义Schema
 */
const booksSchema = new Schema({
    title: {    // 标题必填
        type: String,
        minlength: 1,   // 最小1个字符
        maxlength: 20,  // 最大20个字符
        //unique: true,  // 不可重复约束
        required: true
    },
    owner: {       // 所有者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    }/*,
    articles: [{    // 文集下所有的文章
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'Article'                     // 关联用户表
    }]*/
}, { timestamps: true });

/**
 *
 */
/*booksSchema.pre("save", function save(next) {

});*/

/**
 * 校验用户输入密码是否正确
 * @method comparePassword
 * @param password {String}  验证密码
 * @param callback {Function}  回调函数
 */
/*booksSchema.methods.comparePassword = function(candidatePassword?: string, callback?: any): any {

};*/

export default mongoose.model("Books", booksSchema);