/**
 * 配置mongoose连接mongodb
 * Created by jiayi on 2017/9/13.
 */
import * as mongoose from 'mongoose';
/**
 * 引入配置
 */
import {default as coreConfig} from '../config/core';

const uris = `mongodb://${coreConfig.user}:${coreConfig.psw}@${coreConfig.host}:${coreConfig.dbport}/${coreConfig.dbs}`;
const options = {};

options['useMongoClient'] = true;

mongoose.connect(uris, options);
const db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + coreConfig.dbs);
});
export default (app) => {
    db.once('open', function () {
        console.log('数据库启动了');
        app.listen(coreConfig.port, () => console.log('Express server listening on port ' + coreConfig.port));
    });
};
