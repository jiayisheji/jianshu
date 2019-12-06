import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import * as mongoose from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';


// 解决 DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/jianshu', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true
    }),
    AppRoutingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
