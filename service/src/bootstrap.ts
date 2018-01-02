import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as http from 'http';
import { AppModule, AppComponent } from './app';

import { Environments } from './app/shared';
import { MongooseService } from './app/shared';

const logger = new Logger('HttpServer');

const appInstance = new AppComponent();
const app = appInstance.bootstrap();

// swagger文档配置
const swaggerOptions = new DocumentBuilder()
    .setTitle(app.get('name'))
    .setDescription('简书的API说明')
    .setVersion('1.0')
    .build();

async function bootstrap() {
    const server = await NestFactory.create(AppModule, app);
    // 配置redis
    /* server.connectMicroservice({
        transport: Transport.REDIS,
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }); */
    server.setGlobalPrefix(app.get('prefix'));
    // 注册全局过滤器
    // server.useGlobalFilters();
    SwaggerModule.setup(app.get('swagger'), server, SwaggerModule.createDocument(server, swaggerOptions));
    server.init();
    await server.startAllMicroservicesAsync();
}

bootstrap();

const mongoose = new MongooseService();
mongoose.connection.once('open', () => {
    logger.log('App Database started');
    http.createServer(app)
        .listen(app.get('port'))
        .on('listening', () => {
            logger.log(`${app.get('name')} API Server ready and running on ${app.get('host')}:${app.get('port')}${app.get('swagger')}`);
            logger.log('');
            logger.log(`${app.get('name')} Server ready and running on ${app.get('host')}:${app.get('port')}${app.get('prefix')}`);
            logger.log(``);
            logger.log(`-------------------------------------------------------`);
            logger.log(`Environment  : ${Environments.getEnv()}`);
            logger.log(`Version      : ${Environments.getPackageInfo().version}`);
            logger.log(``);
            logger.log(`-------------------------------------------------------`);
            logger.log(``);
        });
});
