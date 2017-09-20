/**
 * Created by jiayi on 2017/9/20.
 */

import expressValidator = require('express-validator');

export default (app) => {
    /**
     * 表单验证
     */
    app.use(expressValidator({
        errorFormatter: function (param, msg, value) {
            const namespace = param.split('.');
            let formParam = namespace.shift();

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        },
        customValidators: {
            isArray: function (value) {
                return Array.isArray(value);
            },
            gte: function (param, num) {
                return param >= num;
            }
        }
    }));
}
