/**
 * Created by jiayi on 2017/2/10.
 */
/**
 * 引入依赖模块
 */
import * as express from 'express';
import * as config from './config';
import * as glob from 'glob';
import * as mongoose from 'mongoose';

/**
 * 连接数据库
 */
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});
/**
 * 引入数据库模型
 */
const models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
    require(model);
});

/**
 * 引入express配置
 */
const app = express();
//require('./config/express')(app, config);
/**
 * 启动app
 */
app.listen(config.port, () => console.log('Express server listening on port ' + config.port));