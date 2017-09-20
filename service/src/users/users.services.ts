/**
 * Users 服务
 * Created by jiayi on 2017-9-18 21:25:16.
 */

import * as mongoose from 'mongoose';

/**
 * 引入Users模型和接口
 */
import {default as Users, UsersModel} from './users.model';


/**
 * 定义Users服务类接口
 * CRUD操作单一  对数据库的增删改查
 * create 添加操作
 * update 修改操作
 * delete 删除操作
 * read   查询操作
 * 批量操作
 * find   查找
 */
interface InterfaceUsers {
    create(data: InterfaceUsersCreate): Promise<InterfaceUsersToken>;
};

interface InterfaceUsersCreate {
    username: string;
    password: string;
    nickname: string;
    code: string;
}

interface InterfaceUsersToken {
    slug: string;
    avatar: string;
    nickname: string;
    token: string;
}

/**
 * Users服务
 */
class UsersService implements InterfaceUsers {
    constructor() {
    }

    async create(data: InterfaceUsersCreate): Promise<InterfaceUsersToken> {
        const user = await this.read({username: data.username});
        return this.storageToken(user);
    }

    async read(params: object): Promise<object> {
        try {
            return await Users.findOne(params);
        } catch (err) {
            return err;
        }
    }

    /**
     * 返回给前端，并在redis存储用户信息，供后面验证api验证用
     * @param user
     * @returns {Promise<InterfaceUsersToken>}
     */
    private storageToken(user): Promise<InterfaceUsersToken> {
        const token = '';
        return Promise.resolve({
            slug: user._id,
            avatar: user.avatar,
            nickname: user.nickname,
            token
        });
    }
}

/**
 * 导出Users服务模块
 */
export default new UsersService();
