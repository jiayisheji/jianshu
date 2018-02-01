// 验证策略
export const authCheckStrategy = {
    nickname: {
        notEmpty: true,
        isLength: {
            options: [{ min: 2, max: 15 }],
            errorMessage: '昵称长度不是2-15位', // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: '昵称不能为空',
    },
    username: {
        notEmpty: true,
        isLength: {
            options: [{ min: 11, max: 11 }],
            errorMessage: '用户名不是合法11位手机号', // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: '用户名不能为空',
    },
    mobile: {
        notEmpty: true,
        isLength: {
            options: [{ min: 11, max: 11 }],
            errorMessage: '手机号不是合法11位手机号', // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: '手机号不能为空',
    },
    code: {
        notEmpty: true,
        matches: {
            // 必须以数组的形式传递多个选项
            options: /^\d{6}$/,
            // 单个选项可以直接传递
            // options: /someregex/i
            errorMessage: '短信验证码不是合法6位数字',
        },
        errorMessage: '短信验证码不能为空',
    },
    password: {
        notEmpty: true, // won't validate if field is empty
        isLength: {
            options: [{ min: 6, max: 18 }],
            errorMessage: '密码长度不是6-18位', // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: '密码不能为空', // Error message for the parameter
    },
};

// 需要验证的字段
export const authCheckField = {
    '/api/v1/register': {
        body: ['nickname', 'username', 'code', 'password'],
    },
    '/api/v1/login': {
        body: ['username', 'password'],
    },
    '/api/v1/forget/mobile': {
        body: ['mobile', 'password', 'code'],
    },
};