/**
 * {{fileName}} 服务
 * Created by {{author}} on {{createAt}}.
 */

import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';

/**
 * 引入{{fileName}}模型和接口
 */
import {default as {{fileName}} } from './{{filePath}}.model';
import {default as {{fileName}}Model} from './{{filePath}}.interface';

/**
 * 定义{{fileName}}服务类接口
 */
interface Interface{{fileName}} {
    test();
};

/**
 * {{fileName}}服务
 */
class {{fileName}}Service implements Interface{{fileName}} {
    constructor() {
    }

    test() {
    }
}

/**
 * 导出{{fileName}}服务模块
 */
export default new {{fileName}}Service();
