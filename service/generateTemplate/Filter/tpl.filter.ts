/**
 * {{fileName}} 自定义过滤器
 * Created by {{author}} on {{createAt}}.
 */
// 自定义.d.ts
///<reference path='../../types/{{fileName}}.d.ts' />

import {Request, Response, NextFunction} from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    next();
}
