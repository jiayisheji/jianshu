/**
 * Created by jiayi on 2017/9/10.
 */

import {Request, Response, NextFunction} from 'express';

interface InterfaceResponseMeta {
    code: number;
    message: string;
}

function getResponseMessage(code: number): string {
    return {
        '999': '未知错误',
        '1000': '需要权限',
        '1001': '资源不存在',
        '1002': '参数不全',
        '1003': '上传的图片太大',
        '1004': '输入有违禁词',
        '1005': '输入为空，或者输入字数不够',
        '1006': '相关的对象不存在，比如回复帖子时，发现小组被删掉了',
        '1007': '需要验证码，验证码有误',
        '1008': '不支持的图片格式',
        '1009': '照片格式有误(仅支持JPG,JPEG,GIF,PNG或BMP)',
        '1010': '用户名为空',
        '1011': '密码为空'
    }[code];
}


const STATUS_RESULT = function (method: string): InterfaceResponseMeta {
    method = method.toLocaleLowerCase();
    return {
        'get': {
            'code': 200,
            'message': '请求成功'
        },
        'post': {
            'code': 201,
            'message': '创建成功'
        },
        'put': {
            'code': 202,
            'message': '修改成功'
        },
        'delete': {
            'code': 204,
            'message': '删除成功'
        },
    }[method];
}

export function extendAPIOutput(req: Request, res: Response, next: NextFunction) {
    // resolve 成功
    // reject  失败
    console.log('router middlewares extendAPIOutput : ');
    /**
     * 结果成功响应
     * @param args 返回结果集合
     */
    (res as any).resultsResolve = (results?: object, others?: { start?: number, count?: number, total?: number }) => {
        const meta: InterfaceResponseMeta = STATUS_RESULT(req.method);
        others = others || {};
        const {start, count, total} = others;
        console.log(results)
        res.status(meta.code);
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
    (res as any).resultsReject = (errors: { status: number, code: number, message: string }) => {
        const code = errors.code || 999;
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

