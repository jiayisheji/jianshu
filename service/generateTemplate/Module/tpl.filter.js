/**
 * {{fileName}} 过滤器
 * Created by {{author}} on {{createAt}}.
 */

/**
 * 引入{{fileName}}服务
 */
import {Request, Response, NextFunction} from 'express';

/**
 * 定义{{fileName}}过滤器类接口
 */
interface Interface{{fileName}} {
    test();
};

/**
 * {{fileName}}过滤器
 */
class {{fileName}}Filter implements Interface{{fileName}} {
    /**
     * test过滤器
     */
    test(req: Request, res: Response, next: NextFunction) {
        console.log(req);
        next();  // 过滤器执行完一定next,不然无法继续了。
    };
}


/**
 * 导出{{fileName}}过滤器
 */
export default new {{fileName}}Filter;
