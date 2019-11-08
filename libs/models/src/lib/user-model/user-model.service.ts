import { Injectable, Logger } from '@nestjs/common';

import { CrudModelService } from '../crud-model.service';

import { UserModel } from './user-model.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { hashSync } from 'bcryptjs';

@Injectable()
export class UserModelService extends CrudModelService<UserModel> {
  private readonly logger = new Logger(UserModelService.name, true);
  constructor(@InjectModel('User') private readonly userModel: Model<UserModel>) {
    super(userModel);
  }

  /**
   * @description 创建用户 并初始化一些数据
   * @param {Partial<UserModel>} docs
   * @returns {Promise<UserModel>}
   * @memberof UserModelService
   */
  create(docs: Partial<UserModel>): Promise<UserModel> {
    // 自动生成头像
    docs.avatar = `/assets/avatar/${new Date().getTime() % 15}.jpg`;
    // 密码加密 Auto-gen a salt and hash
    docs.password = hashSync(docs.password, 10);
    return super.create(docs);
  }

  /**
   * @description 根据用户名搜索用户
   * @param {string} username
   * @returns {Promise<UserModel>}
   * @memberof UserModelService
   */
  findOneByEmailOrMobile(username: string): Promise<UserModel> {
    const conditions: { email?: string; mobile?: string } = {};
    if (username.indexOf('@') > -1) {
      conditions.email = username;
    } else {
      conditions.mobile = username;
    }
    return this.findOne(conditions);
  }
}
