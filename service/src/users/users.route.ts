/**
 * Users 路由
 * Created by jiayi on 2017-9-18 21:25:16.
 */
/**
 * 引入依赖
 */
import * as Express from 'express';
const UsersRouter = Express.Router();

/**
 * Users控制器
 */
import {default as UsersController} from './users.controller';

/**
 * Users过滤器
 */
import {default as UsersFilter} from './users.filter';


/************ Users业务模块 ************/
// 注册接口
UsersRouter.post('/register', UsersFilter.validator(['username', 'password', 'nickname', 'code']), UsersController.register);
// 登陆接口
// UsersRouter.post('/login', UsersFilter.login, UsersFilter.validator, UsersController.login)
// 找回密码接口 通过手机号找回 以后可能新增其他方式
// UsersRouter.post('/forgot/mobile', UsersFilter.forgotMobile, UsersFilter.validator, UsersController.forgot);

/**
 * 导出Users路由
 */
export default UsersRouter;
