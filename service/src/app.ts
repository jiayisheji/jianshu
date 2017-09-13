/**
 * Created by jiayi on 2017/9/12.
 */
/**
 * 引入依赖模块
 */

/**
 * 引入配置
 */
import {default as coreConfig} from './config/core';
import {default as mongooseConfig} from './config/mongoose';
import {default as app} from './config/express';
import {default as routes} from './routes';


/**
 * 配置路由
 */
routes(app);

/**
 * 启动服务端 并连接数据库 mongodb
 */
mongooseConfig(app);
