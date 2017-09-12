/**
 * Created by jiayi on 2017/9/12.
 */
/**
 * 引入依赖模块
 */
import * as express from 'express';

/**
 * 引入配置
 */
import {default as coreConfig} from './config/core';

/**
 * 引入express配置
 */
const app = express();

/**
 * 启动服务端
 */
app.listen(coreConfig.port, () => console.log('Express server listening on port ' + coreConfig.port));