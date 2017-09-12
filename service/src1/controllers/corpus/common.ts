/**
 * Created by jiayi on 2017/9/4.
 */
import {default as Corpus, CorpusModel} from '../../models/corpus';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import {getUserPopulate} from '../utility';

/**
 * 专题查询参数接口
 */
interface InterfaceCorpusSearchParams {
    page?: string;   // 当前页
    limit?: string;  // 查询多少条
    type?: string;  // type manager 管理者 owner 所有者
    slug?: string;  // 查询某个用户专题
}

/**
 * 专题查询参数接口
 */
export interface InterfaceCorpusSearchResult {
    data: Object[];    // 返回数据
    page: number;   // 当前页
    total: number;  // 总条数条
}


/**
 * 获取查询参数
 * @param params
 * @returns {{}}
 */
export function getParams(params: InterfaceCorpusSearchParams): Object {
    const result = {};
    // 如果slug存在 type没有默认查询所有者
    if (params.slug && mongoose.Types.ObjectId.isValid(params.slug) && !params.slug) {
        params.slug = 'owner';
    }
    // 查询所有者
    if (params.slug && params.type && params.type === 'owner') {
        result['owner'] = params.slug;
    }
    // 查询管理者
    if (params.slug && params.type && params.type === 'manager') {
        result['managers.manager'] = params.slug;
    }
    return result;
}

/**
 * 获取排序参数
 * @param params
 * @returns {Object}
 */
export function getSort(params: InterfaceCorpusSearchParams): Object {
    return {'updatedAt': 'desc'};
}

export async function count(params) {
    try {
        return await Corpus.count(params);
    } catch (err) {
        return 0;
    }
}

export function userformatData(data) {
    return _.map(data, (item: CorpusModel) => {
        return {
            avatar: item.avatar,
            slug: item._id,
            title: item.title
        };
    });
}

function searchFormatData(data, params) {
    console.log(params.slug && params.type)
    if (params.slug && params.type) {
        return userformatData(data);
    } else {
        return _.map(data, (corpu: CorpusModel) => corpu.formatData());
    }
}



export async function search(query) {
    // type manager 管理者 owner 所有者
    const {page = 1, limit = 10} = query;
    const params = getParams(query);
    const sort = getSort(query); // {'updatedAt': 'desc'}
    console.log(params)
    try {
        const total = await count(params);
        const corpus = await Corpus.find(params).populate(getUserPopulate('owner'))
            .populate(getUserPopulate('managers.manager'))
            .sort(sort)
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        return {
            page: Number(page),
            data: searchFormatData(corpus, query),
            total
        }
    } catch (err) {
        console.log('通过获取全部专题信息失败', err);
        return null;
    }
}
