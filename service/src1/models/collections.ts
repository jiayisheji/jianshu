/**
 * 专题表
 * Created by jiayi on 2017/6/19.
 */
/**
 * 引入依赖
 */
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
const Schema = mongoose.Schema;
import * as _ from 'lodash';
import {formatDate, getUserinfo} from '../controllers/utility';

/**
 * 管理者接口
 */
interface ManagerLsit {
    _id: mongodb.ObjectID; // 唯一标识
    manager: mongodb.ObjectID;
};

/**
 * 定义接口
 */
export type CollectionsModel = mongoose.Document & {
    _id: mongodb.ObjectID;  // 唯一标识
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    title: String;
    owner: mongodb.ObjectID;
    article_count: Number;
    subscribers_count: Number;
    managers: ManagerLsit[];
    avatar: String;
    description: String;
    push: Boolean;
    verify: Boolean;
    slug?: String;
    formatData: () => CollectionsModel;
};



/**
 * 定义Schema
 */
const CollectionsSchema = new Schema({
    title: {    // 标题必填
        type: String,
        required: true
    },
    owner: {       // 所有者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    managers: [{
        manager: { // 管理者
            type: Schema.Types.ObjectId,    // 引用类型
            ref: 'User'                     // 关联用户表
        }
    }],
    avatar: {   // 专题封面
        type: String,
        required: true
    },
    description: {  // 专题公告
        type: String
    },
    article_count: {  // 专题收录多少文章
        type: Number,
        'default': 0
    },
    subscribers_count: {  // 专题有多少用户多少关注
        type: Number,
        'default': 0
    },
    push: {  // 是否允许投稿
        type: Boolean,
        'default': true
    },
    verify: {  // 投稿是否需要审核
        type: Boolean,
        'default': true
    }
}, {timestamps: true});

/**
 *
 */
/*corpusSchema.pre('save', function save(next) {
    const corpus = this;
    corpus.slug = corpus._id;
    return next();
});*/

/**
 * 格式化数据
 * @method  formatData
 * @param {CollectionsModel} data
 * @param callback
 * @returns {CollectionsModel}
 */
CollectionsSchema.methods.formatData = function (): any {
    return {
        'slug': this._id,
        'updatedAt': formatDate(this.updatedAt),
        'createdAt': formatDate(this.createdAt),
        'owner': getUserinfo(this.owner),
        'title': this.title,
        'article_count': this.article_count,
        'subscribers_count': this.subscribers_count,
        'avatar': this.avatar,
        'description': this.description,
        'verify': this.verify,
        'push': this.push,
        'managers': this.managers && _.map(this.managers, function (item: any): Object {
            return getUserinfo(item.manager);
        })
    };
};

export default mongoose.model('Collections', CollectionsSchema);
