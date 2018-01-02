// 验证策略
export const publicCheckStrategy = {
    mobile: {
        notEmpty: true,
        matches: {
            // 必须以数组的形式传递多个选项
            options: /^(13[0-9]|14[5-9]|15[0-9]|16[6]|17[0-8]|18[0-9]|19[8-9])\d{8}$/,
            // 单个选项可以直接传递
            // options: /someregex/i
            errorMessage: '不是合法11位手机号',
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
};

// 需要验证的字段
export const publicCheckField = {
    '/api/v1/register': {
        body: ['username', 'nickname', 'code', 'password'],
    },
    '/api/v1/login': {
        body: ['username', 'password'],
    },
};