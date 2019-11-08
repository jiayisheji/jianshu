import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserModel } from '@jianshu/models';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  /**
   * 序列化用户
   * @param user
   * @param done
   */
  serializeUser(user: UserModel, done: (error: null, user: UserModel) => UserModel) {
    done(null, user);
  }

  /**
   * 反序列化用户
   * @param payload
   * @param done
   */
  async deserializeUser(payload: UserModel, done: (error: null, payload: UserModel) => UserModel) {
    done(null, payload);
  }
}
