/**
 * Users 控制器
 * Created by jiayi on 2017-9-18 21:25:16.
 */

/**
 * 引入依赖
 */
import {Request, Response, NextFunction} from 'express';


/**
 * 引入Users服务和接口
 */
import {default as UsersService} from './users.services';

/**
 * 定义Users控制器类接口
 */
export interface InterfaceUsers {

    register(req: Request, res: Response, next: NextFunction);

};


/**
 * Users控制器
 */
class UsersController implements InterfaceUsers {
    constructor() {
    }
    /**
     * POST /register
     * 注册
     */
    async register(req: Request, res: Response, next: NextFunction) {
        console.log('validator3  ');
        try {
            const user: any = await UsersService.create(req.body);
            res.resultsResolve({results: user});
        } catch (err) {
            console.log(err);
            res.resultsReject({ status: 400, code: 999 });
        }
    }

};


/**
 * 导出Users控制器
 */
export default new UsersController();
