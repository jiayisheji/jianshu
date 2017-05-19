/**
 * Created by jiayi on 2017/5/17.
 */
import * as Express from 'express';

export function webRegister(app) {
    app.post('/register', function(req: Express.Request, res: Express.Response) {
        console.log(app)
        res.send('hello register');
    });
}