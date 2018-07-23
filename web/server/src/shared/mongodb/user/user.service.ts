/** @nest */
import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
/** Rxjs */

/** Libraries */
import { Model } from 'mongoose';
/** Dependencies */

/** Component */
import { User } from './user.interface';
import { UserSchema } from './user.schema';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name, true);
    constructor(
        @InjectModel(UserSchema) private readonly userModel: Model<User>,
    ) { }

    /**
     * 获取用户模型
     * @returns {Model<User>}
     * @memberof UserDbService
     */
    getModel(): Model<User> {
        return this.userModel;
    }

    /**
     * 获取指定id数据
     * @param {string} _id
     * @param {*} [projection={}]
     * @param {*} [options={}]
     * @returns {Promise<User>}
     * @memberof UserService
     */
    findId(_id: string, projection: any = {}, options: any = {}): Promise<User> {
        return this.userModel.findById(_id, projection, options).exec();
    }

    /**
     * 根据指定条件获取数据
     * @param {*} conditions
     * @param {*} [projection={}]
     * @param {*} [options={}]
     * @returns {Promise<User>}
     * @memberof UserService
     */
    findOne(conditions: any, projection: any = {}, options: any = {}): Promise<User> {
        return this.userModel.findOne(conditions, projection, options).exec();
    }

    /**
     * 获取指定查询条件的数据
     * @param {*} conditions
     * @param {*} [projection={}]
     * @param {*} [options={}]
     * @returns {Promise<User[]>}
     * @memberof UserService
     */
    find(conditions: any, projection: any = {}, options: any = {}): Promise<User[]> {
        return this.userModel.find(conditions, projection, options).exec();
    }

    /**
     * 获取指定查询条件的数量
     * @param {*} query
     * @returns {Promise<number>}
     * @memberof UserService
     */
    count(query: any): Promise<number> {
        return this.userModel.count(query).exec();
    }

    /**
     * 创建用户
     * @param {*} body
     * @returns {Promise<User>}
     * @memberof UserService
     */
    async create(body: any): Promise<User> {
        const user = new this.userModel(body);
        return await user.save();
    }

    /**
     * 更新用户
     * @param {string} _id
     * @param {*} [update={}]
     * @param {*} [options={}]
     * @returns {Promise<User>}
     * @memberof UserService
     */
    updateOne(_id: string, update: any = {}, options: any = {}): Promise<User> {
        return this.userModel.findByIdAndUpdate(_id, update, options).exec();
    }

    /**
     * 批量更新用户
     * @param {*} conditions
     * @param {*} doc
     * @param {*} [options={ multi: true}]
     * @returns {Promise<User>}
     * @memberof UserService
     */
    update(conditions: any, doc: any, options: any = { multi: true}): Promise<User> {
        return this.userModel.update(conditions, doc, options).exec();
    }

    /**
     * 删除用户
     * @param {string} _id
     * @returns {Promise<any>}
     * @memberof UserService
     */
    removeOne(_id: string): Promise<any>{
        return this.updateOne(_id, { activatable: 4});
    }

    /**
     * 批量删除用户
     * @returns {Promise<any>}
     * @memberof UserService
     */
    remove(): Promise<any> {
        return null; // this.updateOne(_id, { activatable: 4 });
    }

    /**
     * 销毁数据
     * @param {string} _id
     * @returns {Promise<any>}
     * @memberof UserService
     */
    destroyOne(_id: string): Promise<any> {
        return this.userModel.findByIdAndRemove(_id).exec();
    }

    /**
     * 批量销毁数据
     * @param {*} conditions
     * @returns {Promise<any>}
     * @memberof UserService
     */
    destroy(conditions: any): Promise<any> {
        return this.userModel.remove(conditions).exec();
    }

    /**
     * 根据指定字段获取唯一性
     * @param {{ nickname?: string, email?: string, mobile?: string}} body
     * @returns {Promise<User>}
     * @memberof UserService
     */
    unique(body: { nickname?: string, email?: string, mobile?: string}): Promise<User> {
        return this.findOne(body);
    }

}