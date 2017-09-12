/**
 * Created by jiayi on 2017/9/10.
 */
import * as router from './router';
import {Request, Response, NextFunction} from 'express';
import '../../types/myexpress';

export default function jianshuMiddlewares(req: Request, res: Response, next: NextFunction) {

    /**
     * 结果成功响应
     * @param args 返回结果集合
     */
    res.resultsResolve = (results?: object, others?: { start?: number, count?: number, total?: number }) => {
    }

    /**
     * 结果失败响应
     * @param code  出错代码
     * @param message  出错信息
     */
    res.resultsReject = (errors: { status: number, code: number, message: string }) => {
    }
    // 传递处理
    next();
}
