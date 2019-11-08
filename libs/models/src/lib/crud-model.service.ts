import { Document, Model } from 'mongoose';
export abstract class CrudModelService<T extends Document> {
  constructor(private readonly _model: Model<T>) { }

  /**
 * 返回模型
 */
  get getMode(): Model<T> {
    return this._model;
  }
}
