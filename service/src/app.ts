/**
 * 应用程序启动入口
 * Created by jiayi on 2017/9/12.
 */

/**
 * 引入配置
 */
import {default as mongooseService} from './core/mongoose.service';
import {default as app} from './app.core';
import {default as routes} from './app.route';

/**
 * 配置路由
 */
routes(app);

/**
 * 启动服务端 并连接数据库 mongodb
 */
mongooseService(app);
