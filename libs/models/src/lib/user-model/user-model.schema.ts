import { Schema } from 'mongoose';
import { CommonSchema, schemaOptions } from '../crud-model.schema';

export const UserModelSchema = new Schema({
  /**
   * 昵称
   * 必填
   */
  nickname: {
    type: String,
    required: true,
  },
  /**
   * 密码
   * 必填 加密存储
   */
  password: {
    type: String,
    required: true,
  },
  /**
   * 头像
   */
  avatar: {
    type: String,
  },
  /**
   * 手机号
   */
  mobile: {
    type: String,
    required: true,
  },
}, schemaOptions);

/**
 * 添加通用Schema
 */
UserModelSchema.add(CommonSchema);

/**
 * 设置索引
 */
UserModelSchema.index({ nickname: 1 }, { unique: true });
UserModelSchema.index({ mobile: 1 }, { unique: true });

/**
 * 设置虚拟属性
 */
// 隐藏手机号 134****5678
UserModelSchema.virtual('mobile_number').get(function () {
  return this.mobile && this.activatable === 1 ? this.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : null;
});

// 设置中间件
// UserModelSchema.pre()

// 设置创建更新时间插件
// UserModelSchema.plugin();
