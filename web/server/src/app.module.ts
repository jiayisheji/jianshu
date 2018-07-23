/** @nest */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/** Rxjs */

/** Libraries */

/** Dependencies */
import { CoreModule } from 'core';
import { FeatureModule } from 'feature';
/** Component */
import { AppController } from 'app.controller';
import { AppService } from 'app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://jiayi:123456@127.0.0.1:27017/jianshu', { useNewUrlParser: true }),
    CoreModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}
