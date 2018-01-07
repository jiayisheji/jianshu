import { Component, Inject, Logger } from '@nestjs/common';
import { IUserService, IUser } from './interfaces';
import { Model } from 'mongoose';
import { CreateUsersDTO } from './dto';

@Component()
export class UserService implements IUserService {
    private readonly logger = new Logger(UserService.name);
    constructor( @Inject('UserModelToken') private readonly userModel: Model<IUser>) { }

    // 查找全部用户
    async findAll(filter: object, projection: object = { slug: 1, nickname: 1, avatar: 1 }): Promise<Array<IUser>> {
        return await this.userModel.find(filter, projection).exec();
    }

    // findOne()可以加入各种option，以下示範常見的where
    // 注意findOne() 找到一筆就會立即return data，不會繼續往下找。
    async findOne(filter: object, projection: object = { slug: 1, nickname: 1, avatar: 1 }): Promise<IUser | null> {
        return await this.userModel.findOne(filter, projection).exec();
    }
    // restful API很常用。
    async findById(_id: string): Promise<IUser | null> {
        return await this.userModel.findById(_id).exec();
    }

    // 保存数据
    async create(user: CreateUsersDTO): Promise<IUser> {
        const created = new this.userModel(user);
        return await created.save();
    }

    async update(_id: string, newValue: IUser): Promise<IUser | null> {
        // 先找出要更新的用户
        const user = await this.userModel.findById(_id).exec();
        // 该用户不存在
        if (!user._id) {
            console.error('user doesn\'t exist');
        }
        // 调用user Model的方法
        await this.userModel.findByIdAndUpdate(_id, newValue).exec();
        // 返回更新后的信息
        return await this.userModel.findById(_id).exec();
    }
    async delete(_id: string): Promise<number> {
        // 先删除用户
        await this.userModel.findByIdAndRemove(_id).exec();
        // 在查找用户，如果找不到表示已经删除
        const user = await this.userModel.findById(_id).exec();
        if (!user) {
            // 刪除成功
            return 1;
        }
        else {
            // 刪除失败
            return 0;
        }
    }
}