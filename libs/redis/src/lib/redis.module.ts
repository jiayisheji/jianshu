import { Global, Module, DynamicModule } from '@nestjs/common';
import { RedisModuleOptions, RedisModuleAsyncOptions } from './redis';

@Global()
@Module({})
export class RedisModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [],
    };
  }
  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [],
    };
  }
}
