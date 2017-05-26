/**
 * Created by jiayi on 2017/5/25.
 */
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    password: {
        type: String,
        require: true // 不可为空约束
    },
    token: {
        type: String
    }
});

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
AdminSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
// 校验用户输入密码是否正确
AdminSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Admin', AdminSchema);