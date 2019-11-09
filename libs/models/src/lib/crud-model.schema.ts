import { Schema, SchemaOptions } from 'mongoose';

export const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
    versionKey: false,
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
}

/** 名词解释
 * - Schema: 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
 * - Model: 由Schema发布生成的模型，具有抽象属性和数据库操作能力
 * - Entity: 由Model创建的实例, 也能操作数据库
 * Schema、Model、Entity 的关系请牢记
 * Schema 生成 Model，Model 创造 Entity
 * Model 和 Entity 都可对数据库操作造成影响
 * 但 Model 比 Entity 更具操作性
 */

/**
 * created_at 创建时间
 * created_by 创建人
 * 英语中表时间的时候，
 * at 一般跟一个时间点，
 * in 有表示在未来的某个时间之内的意思。
 * 用 at 表示过去或者现在的时间，
 * 用 in 表示未来的时间
 * start_at 事件的开始时间，相对 end_in 它属于当前时间，采用 _at 后缀
 * end_in 事件的结束时间，相对 start_at 它属于未来时间，从用 _in 后缀
 * 比较常用的比如 created_at、updated_at、expires_in 都属于这种类型
 */

export const CommonSchema = new Schema({
  /**
   * 状态
   * 0 正常 1 禁用 2 逻辑删除
   */
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  /**
   * 禁用时间
   */
  disabled_at: {
    type: Date,
  },
  /**
   * 逻辑删除时间
   */
  deleted_at: {
    type: Date,
  },
})
