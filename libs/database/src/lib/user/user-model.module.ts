import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryService } from './user-repository.service';
import { User } from './user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.modelName, schema: User.model.schema }]),
  ],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService]
})
export class UserModelModule { }
