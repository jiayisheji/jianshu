import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { CrudRepositoryService } from '../crud-repository.service';
import { User } from './user.model';

@Injectable()
export class UserRepositoryService extends CrudRepositoryService<User> {
  constructor(@InjectModel(User.modelName) private readonly _userModel: ModelType<User>) {
    super(_userModel);
  }
}
