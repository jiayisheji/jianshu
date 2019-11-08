import { Types, Document } from 'mongoose';

export interface CrudModel extends Document {
  /**
   * mongodb id
   */
  _id: Types.ObjectId;
  /**
   * _id字符串形式 或 ObjectIds下返回的 hexString
   */
  id: string;
  /**
   * 状态
   * - 0 正常
   * - 1 禁用
   * - 2 逻辑删除
   */
  status: 0 | 1 | 2;
  /**
   * 创建时间
   */
  created_at: Date;
  /**
   * 更新时间
   */
  updated_at: Date;
  /**
   * 禁用时间
   */
  disabled_at: Date;
  /**
   * 逻辑删除时间
   */
  deleted_at: Date;
}
