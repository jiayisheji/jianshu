/**
 * Created by jiayi on 2017/9/10.
 */
import {Request, Response, NextFunction} from 'express';
/**
 * 定义用户过滤器类接口
 */
interface InterfaceUsersFilter {
    validate(req: Request, validfield: Array<string>);
};

/**
 * 用户过滤器
 */
class UsersFilter implements InterfaceUsersFilter {
    constructor() {
    }

    validate(req: Request, validfield: Array<string>) {
        req.checkBody({
            'mobile': {
                notEmpty: true,
                isLength: {
                    options: [{min: 11, max: 11}],
                    errorMessage: '用户名不是合法11位手机号' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '用户名不能为空'
            },
            'type': {
                notEmpty: true, // won't validate if field is empty
                matches: {
                    options: /^register|login$/,
                    errorMessage: 'type不合法' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: 'type不能为空' // Error message for the parameter
            }
        });
    }
}

/**
 * 导出用户过滤器模块
 */
export default new UsersFilter();
