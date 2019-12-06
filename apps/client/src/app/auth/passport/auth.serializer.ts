import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@jianshu/database';

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
  public serializeUser(user: User, done: (error: null, user: User) => User) {
    done(null, user);
  }

  /**
   * 反序列化用户
   * @param payload
   * @param done
   */
  public async deserializeUser(payload: User, done: (error: null, payload: User) => User) {
    done(null, payload);
  }
}
