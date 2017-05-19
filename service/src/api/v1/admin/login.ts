/**
 * Created by jiayi on 2017/2/20.
 */
import * as Express from 'express';
import * as passport from 'passport';
/*const redisClient = redis.createClient();
function generateRateLimiter(getKey, limit){
    return function (req, res, next) {
        var source = req.body.source || req.query.source;
        var key = getKey(source);
        redisClient.incr(key, function (err, ret) {
            if(err) return next(err);
            if(ret > limit) return next({"out_of_rate_limit": "超出请求频率限制"});
            next();
        });
    }
}*/
export function adminlogin(app) {
    app.post('/admin/login',
        passport.authenticate('admin'),
        function (req: Express.Request, res: Express.Response) {
        if(req.isAuthenticated()){
            res.apiSuccess("");
        }else{
            return res.sendStatus(403);
        }
    });
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

