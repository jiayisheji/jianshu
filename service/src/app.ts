/**
 * Created by jiayi on 2017/2/10.
 */
/**
 * 引入依赖模块
 */
import * as express from 'express';
import * as glob from 'glob';
import * as mongoose from 'mongoose';
/**
 * 引入配置
 */
import config = require('./config');

/**
 * 导入路由
 */
import * as routesAdmin from "./routes/admin";
import * as routesWeb from "./routes/web";

/**
 * api接口
 */
import * as api from "./api/index";

/**
 * 连接数据库
 */
mongoose.connect(config.db);
let db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});
db.once('open', function (callback) {
    console.log('数据库启动了')
});


/**
 * 引入数据库模型
 */
const models = glob.sync(config.root + '/models/*.js');
models.forEach(function (model) {
    require(model);
});

/**
 * 引入express配置
 */
const app = express();

/**
 * 设置静态资源路径，web ,app ,admin
 */
app.use('/web', express.static('public/web'));
app.use('/app', express.static('public/app'));
app.use('/admin', express.static('public/admin'));

/**
 * 设置模板
 */
app.set('views', './views'); // 放模板文件的目录
app.set('view engine', 'ejs');  // 模板引擎


//require('./config/express')(app, config);
/**
 * 启动app
 */
/**
 * web相关路由
 */
routesWeb.web(app);
/**
 * admin相关路由
 */
routesAdmin.admin(app);

/**
 * api接口
 */
api.index(app);



app.listen(config.port, () => console.log('Express server listening on port ' + config.port));