/**
 * Created by lenovo on 2017/2/10.
 */
"use strict";
// 获取模块
const gulp = require('gulp');
const path = require('path');
const ts = require('gulp-typescript');
const merge = require('merge2');
const del = require('del');

// 定义文件路径
const config = {
    src: 'src',
    build: 'build'
};

// ts配置
let tsProject = ts.createProject({
    "declaration": true,
    "module": "commonjs",   //指定生成哪个模块系统代码
    "target": "es6",        //目标代码类型
    "noImplicitAny": false, //在表达式和声明上有隐含的'any'类型时报错。
    "sourceMap": false,     //用于debug
});

// ts to js
gulp.task('tsc-scripts', function () {
    var tsResult = gulp.src(path.join(config.src, '/**/*.ts'))
        .pipe(tsProject());

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts.pipe(gulp.dest(path.join(config.build, '/'))),
        tsResult.js.pipe(gulp.dest(path.join(config.build, '/')))
    ]);
});

// 定义watch任务
gulp.task('watch', ['tsc-scripts'], function () {
    // 转换ts
    gulp.watch(path.join(config.src, '/**/*.ts'), ['tsc-scripts']);

    // 拷贝静态资源
    gulp.watch(path.join(config.src, '/public'), function(){
        gulp.dest(path.join(config.build, '/public'))
    });

    // 拷贝模板
    gulp.watch(path.join(config.src, '/view'), function(){
        gulp.dest(path.join(config.build, '/view'))
    });
});

// 清除发布目录
gulp.task('clean', () => del([path.join(config.build, '/')]));

// 运行开发任务
gulp.task('dev', () => gulp.start('watch'));

// 运行发布任务
gulp.task('build', ['clean'], () => gulp.start('dev'));

// 默认任务
gulp.task('default', ['build']);