/**
 * Created by jiayi on 2017/9/15.
 */
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

export default (app) => {
    /**
     * 成功日志
     */
    app.use(expressWinston.logger({
        transports: [
            new (winston.transports.Console)({
                json: true,
                colorize: true
            }),
            new winston.transports.File({
                filename: 'logs/success.log'
            })
        ]
    }));

    /**
     * 错误日志
     */
    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            }),
            new winston.transports.File({
                filename: 'logs/error.log'
            })
        ]
    }));
}
