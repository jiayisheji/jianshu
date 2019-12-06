/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  // 注册passport中间件
  app.use(passport.initialize());

  const options = new DocumentBuilder()
    .setTitle('Client API Docs')
    .setDescription('Client API for Jianshu')
    .setExternalDoc('Github Repo', 'https://github.com/jiayisheji/jianshu/tree/master/apps/client')
    .setVersion('v1')
    .setSchemes(false ? 'https' : 'http')
    .addBearerAuth('Authorization', 'header')
    .build();
  // Authorization 操作
  // 1. 调用login接口 拿到token信息
  // 2. 获取tokenType和accessToken字段，拼接，注意空格
  // 3. 点击文档Authorize，填入2信息
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // Starts listening to shutdown hooks
  app.enableShutdownHooks();

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/docs');
  });
}

bootstrap();
