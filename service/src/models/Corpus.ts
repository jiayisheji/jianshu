/**
 * 专题表
 * Created by jiayi on 2017/6/19.
 */
/**
 * 引入依赖
 */
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import * as _ from 'lodash';
import {formatDate, getUserinfo} from '../controllers/utility';
/**
 * 定义接口
 */
export type CorpusModel = mongoose.Document & {
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    title: String;
    owner: any;
    editors: EditorsLsit[];
    avatar: String;
    description: String;
    push: Boolean;
    verify: Boolean;
    slug?: String;
    formatData: () => CorpusModel;
};

export interface EditorsLsit {
    editor: any
};

/**
 * 定义Schema
 */
const corpusSchema = new Schema({
    title: {    // 标题必填
        type: String,
        required: true
    },
    owner: {       // 所有者
        type: Schema.Types.ObjectId,    // 引用类型
        ref: 'User'                     // 关联用户表
    },
    editors: [{
        editor: { // 专题编辑
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
 * @param {CorpusModel} data
 * @param callback
 * @returns {CorpusModel}
 */
corpusSchema.methods.formatData = function (): any {
    return {
        'slug': this._id,
        'updatedAt': formatDate(this.updatedAt),
        'createdAt': formatDate(this.createdAt),
        'owner': getUserinfo(this.owner),
        'title': this.title,
        'avatar': this.avatar,
        'description': this.description,
        'verify': this.verify,
        'push': this.push,
        'editors': _.map(this.editors, function (item: any): Object {
            return getUserinfo(item.editor);
        })
    };
};


export default mongoose.model('Corpus', corpusSchema);