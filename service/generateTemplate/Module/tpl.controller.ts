/**
 * {{fileName}} 控制器
 * Created by {{author}} on {{createAt}}.
 */

/**
 * 引入依赖
 */
import * as mongodb from 'mongodb';
import {Request, Response, NextFunction} from 'express';


/**
 * 引入{{fileName}}服务和接口
 */
import {default as {{fileName}}Service} from './{{filePath}}.services';
import {default as {{fileName}}Model} from './{{filePath}}.interface';



/**
 * 定义{{fileName}}控制器类接口
 */
export interface Interface{{fileName}} {


    test(req: Request, res: Response, next: NextFunction);

};


/**
 * {{fileName}}控制器
 */
class {{fileName}}Controller implements Interface{{fileName}} {
    constructor() {
    }
    /**
     * GET /test
     * 获取测试
     */
    async test(req: Request, res: Response, next: NextFunction) {
        try {
            const test: any = await {{fileName}}Service.test();
        catch (err) {
            console.log(err)
        }
    }

};


/**
 * 导出{{fileName}}控制器
 */
export default new {{fileName}}Controller();
