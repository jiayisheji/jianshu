/**
 * Created by jiayi on 2017/9/13.
 */
///<reference path='../../types/responseHandlerMiddleware.d.ts' />

import {Request, Response, NextFunction} from 'express';
import {default as responseMessage} from './responseMessage';

const STATUS_RESULT = (method: string): number => {
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

export default function ExpressResponseHandlerMiddleware(req: Request, res: Response, next: NextFunction) {
    // resolve 成功
    // reject  失败
    console.log('router middlewares ExpressResponseHandlerMiddleware : ');
    /**
     * 结果成功响应
     * @param args 返回结果集合
     */
    res.resultsResolve = (results?: object, others?: { start?: number, count?: number, total?: number }) => {
        const code: number = STATUS_RESULT(req.method);
        others = others || {};
        const {start, count, total} = others;
        res.status(code);
        res.json({
            data: results,
            start: start,
            count: count,
            total: total,
        });
    }
    /**
     * 结果失败响应
     * @param code  出错代码
     * @param message  出错信息
     */
    res.resultsReject = (errors: { status: number, code: number, message: string }) => {
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
