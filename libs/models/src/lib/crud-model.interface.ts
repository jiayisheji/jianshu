import { Types, Document } from 'mongoose';

export interface CrudModel extends Document {
  _id: Types.ObjectId;  // mongodb id
  id: Types.ObjectId; // mongodb id
  create_at: Date; // 创建时间
  update_at: Date; // 更新时间
}
