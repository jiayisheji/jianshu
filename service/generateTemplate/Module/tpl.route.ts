/**
 * {{fileName}} 路由
 * Created by {{author}} on {{createAt}}.
 */
/**
 * 引入依赖
 */
import * as Express from 'express';
const {{fileName}}Router = Express.Router();

/**
 * {{fileName}}控制器
 */
import {default as {{fileName}}Controller} from './{{filePath}}.controller';

/**
 * {{fileName}}过滤器
 */
import {default as {{fileName}}Filter} from './{{filePath}}.filter';


/************ {{fileName}}业务模块 ************/
// test 接口
{{fileName}}Router.get('/test', {{fileName}}Filter.test, {{fileName}}Controller.test);

/**
 * 导出{{fileName}}路由
 */
export default {{fileName}}Router;
