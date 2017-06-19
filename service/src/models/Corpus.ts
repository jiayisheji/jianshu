/**
 * 专题表
 * Created by jiayi on 2017/6/19.
 */
/**
 * 引入依赖
 */
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
import * as _ from "lodash";
/**
 * 定义接口
 */
export type CorpusModel = mongoose.Document & {
    createdAt: Date,   // 创建时间
    updatedAt: Date,   // 更新时间
    title: String,
    owner: any,
    editors: EditorsLsit[],
    avatar: String,
    description: String,
    push: Boolean,
    verify: Boolean,
    slug: String,
    getData: (data: Object|[Object], callback: (err: Error, results: Object|[Object]) => any) => void
};

export type EditorsLsit = {
    editor: any
}

/**
 * 定义Schema
 */
const corpusSchema = new Schema({
    title: {    // 标题必填
        type: String,
        required: true
    },
    slug: {
        type: String
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
corpusSchema.pre("save", function save(next) {
    const corpus = this;
    corpus.slug = corpus._id;
    return next();
});

/**
 * 格式化单条数据
 * @param data
 * @returns {CorpusModel}
 */
export function formatData(data: any): Object {
    return {
        "slug": data.slug,
        "updatedAt": new Date(data.updatedAt).toLocaleString(),
        "createdAt": new Date(data.createdAt).toLocaleString(),
        "owner": data.owner,
        "title": data.title,
        "avatar": data.avatar,
        "description": data.description,
        "verify": data.verify,
        "push": data.push,
        "editors": _.map(data.editors, function (item: any): Object {
            return item.editor;
        })
    };
}

/**
 * 获取专题数据
 * @method getData
 * @param password {Object|Array}  验证密码
 * @param callback {Function}  回调函数
 */
corpusSchema.methods.getData = function (data: Object, callback?: any): any {
    callback(null, formatData(data));
};

export default mongoose.model("Corpus", corpusSchema);