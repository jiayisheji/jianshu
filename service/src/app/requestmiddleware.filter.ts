/**
 * Created by jiayi on 2017/9/16.
 */
// 自定义.d.ts
///<reference path='../../types/requestMiddlewareFilter.d.ts' />

import {Request, Response, NextFunction} from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    next();
}

