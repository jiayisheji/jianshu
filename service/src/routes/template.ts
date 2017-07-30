/**
 * 模板接口
 * Created by jiayi on 2017/6/20.
 */


/**
 * 引入依赖
 */
import * as Express from 'express';
const Router = Express.Router();
import * as passport from 'passport';

/**
 * 模板 控制器
 */
import {default as TemplateController} from '../controllers/template';

/**
 * 模板 API接口
 */
// 用户登录注册退出找回密码 用户修改资料，查看信息
Router.put('/template/:id', passport.authenticate('user', {session: false}), TemplateController.updata);
Router.post('/template', passport.authenticate('user', {session: false}), TemplateController.save);
Router.delete('/template/:id', passport.authenticate('admin', {session: false}), TemplateController.remove);
Router.get('/template/:id', TemplateController.find);
Router.get('/template', TemplateController.search);


/**
 * 导出路由
 */
export default Router;
