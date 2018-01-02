
import { Component, Logger, HttpStatus } from '@nestjs/common';

// 200 get
// 201 post
// 202 put
// 204 delete
const errorMessage = {
    404: '资源不存在或已删除',
    401: '未授权',
    400: '参数不合法',
    403: '无权限访问',
    500: '内部错误',
};

@Component()
export class ResponseHandler {
    private readonly logger = new Logger(ResponseHandler.name);
    private _isString(value: string | object): boolean {
        return typeof value === 'string';
    }
    public error(code: number, message: string | Array<any>, errors?: Array<any>) {
        let newMessage = '';
        if (!this._isString(message) && Array.isArray(message)) {
            newMessage = errorMessage[code] || '未知错误';
            errors = message;
        } else {
            newMessage = message as string;
        }
        return this._handler({
            code,
            message: newMessage,
            errors,
            defaultMessage: '未知错误',
        });
    }
    public invoke(code: number, message: string | object, data?: object) {
        return this._handler({
            code,
            message,
            data,
            defaultMessage: '调用成功',
        });
    }
    public findAll(code: number, message: string | object, data?: object) {
        return this._handler({
            code,
            message,
            data,
            defaultMessage: '获取全部成功',
        });
    }

    public findOne(code: number, message: string | object, data?: any) {
        return this._handler({
            code,
            message,
            data,
            defaultMessage: '查询成功',
        });
    }

    public create(message: string | object, data?: any) {
        return this._handler({
            code: 0,
            message,
            data,
            defaultMessage: '创建成功',
        });
    }

    public update(code: number, message: string | object, data?: any) {
        return this._handler({
            code,
            message,
            data,
            defaultMessage: '修改成功',
        });
    }

    public delete(code: number, message: string | object, data?: any) {
        return this._handler({
            code,
            message,
            data,
            defaultMessage: '删除成功',
        });
    }

    private _handler({ code, message, data, defaultMessage, errors }: {
        code: number,
        message: string | object,
        data?: object,
        defaultMessage?: string,
        errors?: Array<string>,
    }): {
            meta: {
                code: number,
                message: string,
            },
            data?: object,
            errors?: Array<string>,
        } {

        let newMessage = '';
        if (!this._isString(message)) {
            data = message as object;
            newMessage = defaultMessage;
        } else {
            newMessage = message as string;
        }
        return {
            meta: {
                code,
                message: newMessage,
            },
            errors,
            data,
        };
    }
}