import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  age: Number,
  breed: String,
});

// 设置索引
// UserSchema.index()

// 设置虚拟属性
// UserSchema.virtual()

// 设置保存中间件
// UserSchema.pre()
