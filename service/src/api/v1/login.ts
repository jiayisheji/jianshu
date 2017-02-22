/**
 * Created by jiayi on 2017/2/20.
 */
import * as Express from 'express';

export function adminlogin(app) {
    app.post('/login', function(req: Express.Request, res: Express.Response) {
        console.log(app)
        res.send('hello world');
    });
}

