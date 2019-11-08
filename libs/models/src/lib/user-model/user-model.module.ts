import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelSchema } from './user-model.schema';
import { UserModelService } from './user-model.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserModelSchema }]),
  ],
  providers: [UserModelService],
  exports: [UserModelService]
})
export class UserModelModule { }
