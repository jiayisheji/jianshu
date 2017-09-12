/**
 * 专题关注表
 * Created by jiayi on 2017/8/29.
 */
/**
 * 引入依赖
 */
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * 定义接口
 */
export type CorpusModel = mongoose.Document & {
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    collection_id: any;
    subscribers: SubscribersLsit[];
    slug?: String;
};

export interface SubscribersLsit {
    subscriber: any
};

/**
 * 定义Schema
 */
const corpusSubscribersSchema = new Schema({
    collection_id: {       // 所有者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'Corpus'                     // 关联用户表
    },
    subscribers: [{
        subscriber: { // 专题关注者
            type: Schema.Types.ObjectId,    // 引用类型
            ref: 'User'                     // 关联用户表
        }
    }],
}, {timestamps: true});

export default mongoose.model('Corpus_subscribers', corpusSubscribersSchema);
