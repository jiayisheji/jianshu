import { Middleware, NestMiddleware, ExpressMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ResponseHandler } from '../../shared';

/**
 * 判断对象是否为空
 * @param value
 */
const isEmpty = (value: object): boolean => {
    return Object.keys(value).length === 0;
};
/**
 * 根据验证字段返回需要验证策略
 * @param checkField
 * @param checkStrategy
 */
const generatedCheckStrategy = (checkField: string[], checkStrategy): Promise<object> => {
    return Promise.resolve(checkField.reduce((results, field) => {
        results[field] = checkStrategy[field];
        return results;
    }, {}));
};
/**
 * 去除重复错误信息
 * @param array
 * @param iterator
 */
const removeDuplicates = (array: Array<any>, iterator: any): Array<any> => {
    const key = iterator;
    const results = [];
    const seen = {};
    let cursorRead = 0;
    while (cursorRead < array.length) {
        const current = array[cursorRead++];
        if (!seen[current[key]]) {
            seen[current[key]] = true;
            results.push(current);
        }
    }
    return results;
};

@Middleware()
export class ValidatorMiddleware implements NestMiddleware {
    constructor(
        private responseHandler: ResponseHandler,
    ) { }
    resolve(...args: any[]): ExpressMiddleware {
        return async (req: Request, res: Response, next: NextFunction) => {
            // 如果长度不是2就直接下一步，忽略验证
            if (args.length !== 2) {
                return next();
            }
            // args[0]  CheckField  需要验证的字段集合
            // 根据当前path获取需要验证的字段
            const checkFields: { body?: string[], params?: string[], query?: string[] } | undefined = args[0][req.path];
            //
            if (!checkFields || isEmpty(checkFields)) {
                return next();
            }
            // 根据验证策略 效验body方法
            // req.body 传进来的数据
            // authCheckStrategy 认证模块验证策略集合
            if (!isEmpty(req.body) && checkFields.body && checkFields.body.length) {
                const checkBody = await generatedCheckStrategy(checkFields.body, args[1]);
                // 使用express-validator 验证body
                (req as any).checkBody(checkBody);
            }
            // 根据验证策略 效验params方法
            // req.params 传进来的数据
            // authCheckStrategy 认证模块验证策略集合
            if (!isEmpty(req.params) && checkFields.params && checkFields.params.length) {
                const checkParams = await generatedCheckStrategy(checkFields.params, args[1]);
                // 使用express-validator 验证params
                (req as any).checkParams(checkParams);
            }
            // 根据验证策略 效验query方法
            // req.body 传进来的数据
            // args[1] CheckStrategy 验证策略集合
            if (!isEmpty(req.query) && checkFields.query && checkFields.query.length) {
                const checkQuery = await generatedCheckStrategy(checkFields.query, args[1]);
                // 使用express-validator 验证query
                (req as any).checkQuery(checkQuery);
            }
            // 返回验证结果，如果通过返回false，否则返回一个错误数组
            const errors = (req as any).validationErrors();
            // 如果没有错误才能进行下一步
            if (!errors) {
                return next();
            }
            // 有错误直接返回错误
            return res.status(HttpStatus.BAD_REQUEST)
                .json(this.responseHandler.error(400, removeDuplicates(errors, 'param')));
        };
    }
}