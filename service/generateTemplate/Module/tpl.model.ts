/**
 * {{fileName}} 模型
 * Created by {{author}} on {{createAt}}.
 */
/**
 * 引入依赖
 */
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';
/**
 * 引入{{fileName}}接口
 */
import { {{fileName}}Model } from './{{filePath}}.interface';

/**
 * {{fileName}}Schema
 * @type {mongoose.Schema}
 */
const {{fileName}}Schema = new mongoose.Schema({
    test: {
        type: String
    },
    testArray: [{
        name: String
    }]
}, {timestamps: true});

/**
 * 添加
 */
{{fileName}}Schema.pre('save', function (next) {
    // this 当前对象

   next(); // 必要要执行这个方法 第一个参数是err
});

/**
 * 测试函数
 * @method testFun
 * @param name {String}
 * @param callback {Function}  回调函数
 */
{{fileName}}Schema.methods.testFun = function (name?: string, callback?: any): any {
    callback(err, data)   // 第一个参数是err，第二个是传递数据
};


/**
 * 导出{{fileName}}模型
 */
export default mongoose.model(`{{fileName}}`, {{name}}Schema);
