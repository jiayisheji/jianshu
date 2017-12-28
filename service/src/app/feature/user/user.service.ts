import { Component, Inject } from '@nestjs/common';
import { IUserService, IUser } from './interfaces';
import { Model } from 'mongoose';
import { CreateUsersDTO } from './dto';
import { UserModel } from './user.model';
@Component()
export class UserService implements IUserService {
    constructor(private userModel: UserModel) { }

    // 获取 Model 实例
    private get repository() {
        return this.userModel.useRepository();
    }

    // 查找全部用户
    async findAll(): Promise<Array<IUser>> {
        return await this.repository.find().exec();
    }

    // findOne()可以加入各种option，以下示範常見的where
    // 注意findOne() 找到一筆就會立即return data，不會繼續往下找。
    async findOne(options: object): Promise<IUser | null> {
        console.log(options);

        return await this.repository.findOne(options).exec();
    }
    // restful API很常用。
    async findById(_id: string): Promise<IUser | null> {
        return await this.repository.findById(_id).exec();
    }

    // 保存数据
    async create(user: CreateUsersDTO): Promise<IUser> {
        return await this.repository.create(user);
    }

    async update(_id: string, newValue: IUser): Promise<IUser | null> {
        // 先找出要更新的用户
        const user = await this.repository.findById(_id).exec();
        // 该用户不存在
        if (!user._id) {
            console.error('user doesn\'t exist');
        }
        // 调用user Model的方法
        await this.repository.findByIdAndUpdate(_id, newValue).exec();
        // 返回更新后的信息
        return await this.repository.findById(_id).exec();
    }
    async delete(_id: string): Promise<number> {
        // 先删除用户
        await this.repository.findByIdAndRemove(_id).exec();
        // 在查找用户，如果找不到表示已经删除
        const user = await this.repository.findById(_id).exec();
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