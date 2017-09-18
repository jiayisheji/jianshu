"use strict";
/**
 * process.argv 返回一个数组
 * [0] node.exe
 * [1] 当前运行的文件
 * [2...] 传递参数
 */
const process_argv = process.argv.slice(2);
// 获取package.json的author字段，如果没有就设一个默认的
const author = require("./package.json").author || 'jiayi';
// 创建时间
const createAt = new Date().toLocaleString();
// mkdirp是无限级创建目录的库
const mkdirp = require('mkdirp');
// 文件操作对象
const fs = require('fs');
// 文件路径对象
const path = require('path');
// 模板替换
const tpl_apply = require('tpl_apply');
/**
 * 类型文件
 * 业务模块 module|m
 * 服务 service|s
 * 过滤器 filter|f
 */
const TYPE_REGULAR = /^module|m|service|s|filter|f$/;
const FILE_REGULAR = /^[\w]+[\w\/]+[\w]$/g;
/**
 * 如果不是预期就直接抛出错误，强制逗比结束
 */
if (!TYPE_REGULAR.test(process_argv[0])) {
    throw Error(`${process_argv[0]} is not module or service or filter`);
}

/**
 * 支持几种写法
 * xxx
 * xxx/xxx
 * xxx/xxx/xxx
 */
if (!FILE_REGULAR.test(process_argv[1])) {
    throw Error(`${process_argv[1]} The file name does not match Or the file name length is less than 3`);
}

// 当前项目目录
const ROOT_PATH = __dirname;
// 默认开发目录
const DEV_PATH = 'src';
// 类型
const file_type = process_argv[0];
// 文件路径和文件名
const file_path = process_argv[1];

/**
 * 策略算法
 */
const typeStrategy = {
    'm': generateModule,
    'module': generateModule,
    's': generateService,
    'service': generateService,
    'f': generateFilter,
    'filter': generateFilter
};

/**
 * 策略条件
 */
function generateStrategy() {
    /**
     * file_path 有2种策略
     * 1. user        => filePath = src fileName = user
     * 2. core/redis  => filePath = src/core fileName = redis
     */
    console.log(getFilePathAndName())
    typeStrategy[file_type](...getFilePathAndName());
}
// 调用策略模式
generateStrategy();


/**
 * 业务模块 module|m 生成策略
 * @param {any} filePath 文件路径
 * @param {any} fileName 文件名
 */
function generateModule(filePath, fileName) {
    // 生成目标文件夹 
    const destDir = path.join(ROOT_PATH, filePath);
    // 获取对应的模板文件列表
    const tpls = fs.readdirSync(path.join(ROOT_PATH, "/generateTemplate/Module"));
    tpls.forEach(function(element, index) {
        // 文件名遵循 模板命名空间.type类型.文件后缀
        const type = element.split('.')[1];
        console.log(type)
        if (!/controller|model|service|filter|route|interface/.test(type)) {
            throw Error(`/generateTemplate/Module/${element} is not ${type} type`);
        }
        // 生成目标文件
        const createFile = `${fileName}.${type}.ts`;

        // 传递参数
        const data = {
            fileName: bigCamelCaseFormat(fileName), // 文件里名称显示大驼峰
            filePath: fileName, // 文件里引用的模块文件夹前缀
            author,
            createAt
        }
        console.log(data)
            // 获取对应的模板
        const source = path.join(ROOT_PATH, "/generateTemplate/Module", `tpl.${type}.ts`);
        // 生成的文件
        const dest = path.join(destDir, createFile);
        mkdirp(destDir, function(err) {
            if (err) console.error(err);
            // 使用tpl_apply根据模板文件和数据
            tpl_apply.tpl_apply(source, data, dest);
            console.log(`${createFile} generate complete!`);
        });
    });
}
/**
 * 服务 service|s 生成策略
 * @param {any} filePath 文件路径
 * @param {any} fileName 文件名
 */
function generateService(filePath, fileName) {
    // 生成目标文件
    const createFile = `${fileName}.service.ts`;
    // 生成目标文件夹 
    const destDir = path.join(ROOT_PATH, filePath);
    // 获取对应的模板文件列表
    const tpls = fs.readdirSync(path.join(ROOT_PATH, "/generateTemplate/Service"));
    tpls.forEach(function(element, index) {
        // 文件名遵循 模板命名空间.type类型.文件后缀
        const type = element.split('.')[1];
        console.log(type)
        if (type !== 'service') {
            throw Error(`/generateTemplate/Service/${element} is not service type`);
        }

        // 传递参数
        const data = {
            fileName: bigCamelCaseFormat(fileName), // 文件里名称显示大驼峰
            filePath: fileName, // 文件里引用的模块文件夹前缀
            author,
            createAt
        }
        console.log(data)
            // 获取对应的模板
        const source = path.join(ROOT_PATH, "/generateTemplate/Service", `tpl.${type}.ts`);
        // 生成的文件
        const dest = path.join(destDir, createFile);
        mkdirp(destDir, function(err) {
            if (err) console.error(err);
            // 使用tpl_apply根据模板文件和数据
            tpl_apply.tpl_apply(source, data, dest);
            console.log(`${createFile} generate complete!`);
        });
    });
}
/**
 * 过滤器 filter|f 生成策略
 * @param {any} filePath 文件路径
 * @param {any} fileName 文件名
 */
function generateFilter(filePath, fileName) {
    // 生成目标文件
    const createFile = `${fileName}.filter.ts`;
    // 生成目标文件夹 
    const destDir = path.join(ROOT_PATH, filePath);
    // 获取对应的模板文件列表
    const tpls = fs.readdirSync(path.join(ROOT_PATH, "/generateTemplate/Filter"));
    tpls.forEach(function(element, index) {
        // 文件名遵循 模板命名空间.type类型.文件后缀
        const type = element.split('.')[1];
        console.log(type)
        if (type !== 'filter') {
            throw Error(`/generateTemplate/Filter/${element} is not filter type`);
        }

        // 传递参数
        const data = {
            fileName: bigCamelCaseFormat(fileName), // 文件里名称显示大驼峰
            filePath: fileName, // 文件里引用的模块文件夹前缀
            author,
            createAt
        }
        console.log(data)
            // 获取对应的模板
        const source = path.join(ROOT_PATH, "/generateTemplate/Filter", `tpl.${type}.ts`);
        // 生成的文件
        const dest = path.join(destDir, createFile);
        mkdirp(destDir, function(err) {
            if (err) console.error(err);
            // 使用tpl_apply根据模板文件和数据
            tpl_apply.tpl_apply(source, data, dest);
            console.log(`${createFile} generate complete!`);
        });
    });
}

/**
 * 获取文件路径和文件名
 * @returns {array} [0] filePath [1] fileName;
 */
function getFilePathAndName() {
    let _filename, _filepath;
    if (!/\//g.test(file_path)) {
        _filename = file_path;
        _filepath = DEV_PATH;
    } else {
        const _paths = file_path.split('/');
        _filename = _paths.pop();
        _filepath = ['src'].concat(_paths).join('/');
    }
    _filepath = process.platform.startsWith('win') ?
        _filepath.replace(/\//g, '\\') :
        _filepath;
    return [_filepath, _filename];
}

/**
 * 大驼峰式命名法格式化
 * @param  {string} str 
 * @return {string} 
 */
function bigCamelCaseFormat(str) {
    return str.replace(/-(\w)/g, function(k, r) {
        return r.toUpperCase();
    }).replace(/^\S/, function(s) { return s.toUpperCase(); });
}
