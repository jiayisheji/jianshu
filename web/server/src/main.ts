/** @nest */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
/** Rxjs */

/** Libraries */
import * as express from 'express';
import { Application } from 'express';
const application: Application = express();
/** Dependencies */

/** Component */
import { AppModule } from 'app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, application, {
    bodyParser: true,
  });
  /** 配置Swagger API 文档 */
  const options = new DocumentBuilder()
    .setTitle('简书')
    .setDescription('这是简书WebAPI接口')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(5210);
}
bootstrap();
