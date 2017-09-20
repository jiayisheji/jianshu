/**
 * Users 过滤器
 * Created by jiayi on 2017-9-18 21:25:16.
 */

/**
 * 引入Users服务
 */
import {Request, Response, NextFunction} from 'express';

/**
 * 定义Users过滤器类接口
 */
interface InterfaceUsersFilter {
    validator(validateField: Array<string>);
};


const VALIDATE_COLLECTION = {
    'nickname': {
        notEmpty: true,
        isLength: {
            options: [{min: 2, max: 10}],
            errorMessage: '昵称长度不是2-10位' // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: '昵称不能为空'
    },
    'username': {
        notEmpty: true,
        isLength: {
            options: [{min: 11, max: 11}],
            errorMessage: '用户不是合法11位手机号' // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: '用户名不能为空'
    },
    'code': {
        notEmpty: true,
        isLength: {
            options: [{min: 6, max: 6}],
            errorMessage: '短信验证码不是合法6位数字' // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: '短信验证码不能为空'
    },
    'password': {
        notEmpty: true, // won't validate if field is empty
        isLength: {
            options: [{min: 6, max: 18}],
            errorMessage: '密码长度不是6-18位' // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: '密码不能为空' // Error message for the parameter
    }
}

function getValidateCollection(collection: object, fields: Array<string>): object {
    return fields.reduce((result: object, item: string) => {
        if (collection[item]) {
            result[item] = collection[item]
        }
        return result;
    }, {});
}


/**
 * Users过滤器
 */
class UsersFilter implements InterfaceUsersFilter {
    /**
     * 验证过滤器
     * 如果验证失败直接返回，不继续执行， 依赖express-validator验证
     */
    validator(validateField: Array<string>) {
        console.log('validator1  ');
        console.log(validateField);
        const validateCollection: object = getValidateCollection(VALIDATE_COLLECTION, validateField);
        return (req: Request, res: Response, next: NextFunction) => {
            console.log('validator2  ');
            console.log(validateField);
            req.checkBody(validateCollection);
            const errors = req.validationErrors();
            console.log(errors);
            if (errors) {
                return res.resultsReject({status: 400, code: 1002, message: errors[0].msg});
            }
            next();
        }
    };
}


/**
 * 导出Users过滤器
 */
export default new UsersFilter;
