/**
 * {{fileName}} 接口
 * Created by {{author}} on {{createAt}}.
 */
/**
 * 引入依赖
 */
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';

/**
 * 定义{{fileName}}模型接口
 */
export type {{fileName}}Model = mongoose.Document & {
    slug: String;          // 加盐标识;
    _id: mongodb.ObjectID; // 唯一标识;
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    test: String;  // 一个字符串
    testArray: TestList[] // 集合
    testFun: (name: String, callback: (err: any, isMatch: boolean) => any) => void;
    getFun: () => String;
};

/**
 * 集合
 */
interface TestList {
    _id: mongodb.ObjectID; // 唯一标识;
    name: String;   //  名称
};
