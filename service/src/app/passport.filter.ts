/**
 * Created by jiayi on 2017/9/13.
 */
/**
 * Created by jiayi on 2017/6/20.
 */
/*
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import * as passportBearer from 'passport-http-bearer';

const Strategy = passportBearer.Strategy;
*/

/**
 * 注册web端用户权限
 */
/*import {default as TokenGuard} from '../redis/tokenGuard';

passport.use('user', new Strategy(function (token, done) {
    jwt.verify(token, 'jiayishejijianshu', function (err, decoded) {
        if (!decoded) {
            return done(null, false);
        }
        TokenGuard.getToken(token).then((user) => {
            if (!user) {
                return done(null, false, {message: '账号和密码不存在'});
            }
            return done(null, JSON.parse(user));
        }).catch((error) => {
            return done(error);
        });
    });
}));*/

/**
 * 注册后台管理 管理员权限
 */
/*import {Admin} from './models/Admin';
passport.use('admin', new Strategy(function(token, done) {
    Admin.findOne({
        token: token
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));*/
// export default passport;
