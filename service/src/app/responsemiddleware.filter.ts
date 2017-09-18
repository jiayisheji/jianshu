/**
 * 响应过滤器
 * Created by jiayi on 2017/9/13.
 */
// 自定义.d.ts
///<reference path='../../types/responseMiddlewareFilter.d.ts' />

import {Request, Response, NextFunction} from 'express';
// 响应Error新
import {default as responseMessage} from '../config/responseErrorMessage';

const STATUS_RESULT = (method: string): { code: number } => {
    method = method.toLocaleLowerCase();
    return {
        'get': {
            'code': 200
        },
        'post': {
            'code': 201
        },
        'put': {
            'code': 202
        },
        'delete': {
            'code': 204
        },
    }[method];
}

export default (req: Request, res: Response, next: NextFunction) => {
    console.log('router middlewares ExpressResponseHandlerMiddleware : ');
    /**
     * 结果成功响应
     * @param results 返回结果
     * @param others  返回结果集合
     */
    res.resultsResolve = function (results?: object | Array<any>, others?: { start?: number, count?: number, total?: number }) {
        const meta: { code: number } = STATUS_RESULT(req.method);
        others = others || {};
        const result = Object.assign(others, {
            data: results
        });
        res.status(meta.code);
        res.json(result);
    }
    /**
     * 结果失败响应
     * @param code  出错代码
     * @param message  出错信息
     */
    res.resultsReject = (errors: { status?: number, code?: number, message?: string }) => {
        let code = errors.code || 999;
        if (errors.status === 404) {
            code = 1001;
        }
        const message = errors.message || getResponseMessage(code);
        res.status(errors.status || 400);
        res.json({
            request: req.method + ' ' + req.url,
            code,
            message
        });
    }
    // 传递处理
    next();
}

/**
 * 获取响应错误信息
 * @param {number} code
 * @returns {string}
 */
function getResponseMessage(code: number): string {
    return responseMessage[code];
}