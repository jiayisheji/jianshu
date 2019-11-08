import { Document, Model, ModelPopulateOptions, QueryFindOneAndUpdateOptions, Types, DocumentQuery } from 'mongoose';
import { WriteOpResult, FindAndModifyWriteOpResultObject } from 'mongodb';

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
  /**
   * Pagination limit
   */
  @ApiModelPropertyOptional({ type: Number, minimum: 0, maximum: 50 })
  @IsOptional()
  @Min(0)
  @Max(50)
  @Transform((val: string) => parseInt(val, 10))
  readonly take = 10;

  /**
   * Pagination offset
   */
  @ApiModelPropertyOptional({ type: Number, minimum: 0 })
  @IsOptional()
  @Min(0)
  @Transform((val: string) => parseInt(val, 10))
  readonly skip = 0;

  /**
   * OrderBy
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  abstract readonly order?: { [P in keyof T]?: OrderType };
}


/**
 * 分页器返回结果
 * @export
 * @interface Paginator
 * @template T
 */
export interface Paginator<T> {
  /**
   * 分页数据
   */
  items: T[];
  /**
   * 总条数
   */
  total: number;
  /**
   * 一页多少条
   */
  limit: number;
  /**
   * 偏移
   */
  offset?: number;
  /**
   * 当前页
   */
  page?: number;
  /**
   * 总页数
   */
  pages?: number;
}

export abstract class CrudModelService<T extends Document> {
  constructor(private readonly _model: Model<T>) { }
  /**
   * @description 返回模型
   * @readonly
   * @type {Model<T>}
   * @memberof CrudModelService
   */
  get getMode(): Model<T> {
    return this._model;
  }

  /**
   * 获取指定条件全部数据
   * @param {*} conditions
   * @param {(any | null)} [projection]
   * @param {({
   *         sort?: any;
   *         limit?: number;
   *         skip?: number;
   *         populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *         [key: string]: any;
   *     })} [options]
   * @returns {Promise<T[]>}
   * @memberof BaseService
   */
  findAll(conditions: any, projection?: any | null, options?: {
    sort?: any;
    limit?: number;
    skip?: number;
    populates?: ModelPopulateOptions[] | ModelPopulateOptions;
    [key: string]: any;
  }): Promise<T[]> {
    const { option, populates } = options;
    const docsQuery = this._model.find(conditions, projection, option);
    return this.populates<T[]>(docsQuery, populates);
  }

  /**
   * 获取带分页数据
   * @param {*} conditions
   * @param {(any | null)} [projection]
   * @param {({
   *         sort?: any;
   *         limit?: number;
   *         offset?: number;
   *         page?: number;
   *         populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *         [key: string]: any;
   *     })} [options]
   * @returns {Promise<Paginator<T>>}
   * @memberof BaseService
   */
  async paginator(conditions: any, projection?: any | null, options?: {
    sort?: any;
    limit?: number;
    offset?: number;
    page?: number;
    populates?: ModelPopulateOptions[] | ModelPopulateOptions;
    [key: string]: any;
  }): Promise<Paginator<T>> {
    const result: Paginator<T> = {
      items: [],
      total: 0,
      limit: options.limit ? options.limit : 10,
      offset: 0,
      page: 1,
      pages: 0,
    };
    const { offset, page, option } = options || { offset: 0, page: 1, option: {} };
    if (offset !== undefined) {
      result.offset = options.offset;
      options.skip = offset;
    } else if (page !== undefined) {
      result.page = page;
      options.skip = (page - 1) * result.limit;
      result.pages = Math.ceil(result.total / result.limit) || 1;
    } else {
      options.skip = 0;
    }
    result.items = await this.findAll(conditions, projection, option);
    result.total = await this.count(conditions);
    return Promise.resolve(result);
  }

  /**
   * 获取单条数据
   * @param {*} conditions
   * @param {*} [projection]
   * @param {({
   *         lean?: boolean;
   *         populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *         [key: string]: any;
   *     })} [options]
   * @returns {(Promise<T | null>)}
   * @memberof BaseService
   */
  findOne(conditions: any, projection?: any, options?: {
    lean?: boolean;
    populates?: ModelPopulateOptions[] | ModelPopulateOptions;
    [key: string]: any;
  }): Promise<T | null> {
    const { option, populates } = options || { option: {}, populates: [] };
    const docsQuery = this._model.findOne(conditions, projection || {}, option);
    return this.populates<T>(docsQuery, populates);
  }

  /**
   * 根据id获取单条数据
   * @param {(any | string | number)} id
   * @param {*} [projection]
   * @param {({
   *         lean?: boolean;
   *         populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *         [key: string]: any;
   *     })} [options]
   * @returns {(Promise<T | null>)}
   * @memberof BaseService
   */
  findById(id: any | string | number, projection?: any, options?: {
    lean?: boolean;
    populates?: ModelPopulateOptions[] | ModelPopulateOptions;
    [key: string]: any;
  }): Promise<T | null> {
    const { populates, ...option } = options || {};
    const docsQuery = this._model.findById(this.toObjectId(id), projection, option);
    return this.populates<T>(docsQuery, populates);
  }

  /**
   * 获取指定查询条件的数量
   * @param {*} conditions
   * @returns {Promise<number>}
   * @memberof UserService
   */
  count(conditions: any): Promise<number> {
    return this._model.countDocuments(conditions).exec();
  }

  /**
   * 创建一条数据
   * @param {T} docs
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  create(docs: Partial<T>): Promise<T> {
    return this._model.create(docs);
  }

  /**
   * 删除指定id数据
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  delete(id: string, options?: {
    /** if multiple docs are found by the conditions, sets the sort order to choose which doc to update */
    sort?: any;
    /** sets the document fields to return */
    select?: any;
  }): Promise<FindAndModifyWriteOpResultObject<T | null>> {
    return this._model.findByIdAndRemove(this.toObjectId(id), options).exec();
  }

  /**
   * 更新指定id数据
   * @param {string} id
   * @param {Partial<T>} [item={}]
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  update(id: string, update: Partial<T>, options: QueryFindOneAndUpdateOptions = { new: true }): Promise<T | null> {
    return this._model.findByIdAndUpdate(this.toObjectId(id), update, options).exec();
  }

  /**
   * 删除所有匹配条件的文档集合
   * @param {*} [conditions={}]
   * @returns {Promise<WriteOpResult['result']>}
   * @memberof BaseService
   */
  clearCollection(conditions = {}): Promise<WriteOpResult['result']> {
    return this._model.deleteMany(conditions).exec();
  }

  /**
   * 转换ObjectId
   * @private
   * @param {string} id
   * @returns {Types.ObjectId}
   * @memberof BaseService
   */
  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }

  /**
   * 填充其他模型
   * @private
   * @param {*} docsQuery
   * @param {*} populates
   * @returns {(Promise<T | T[] | null>)}
   * @memberof BaseService
   */
  private populates<D>(docsQuery: DocumentQuery<D, T, {}>, populates: ModelPopulateOptions | ModelPopulateOptions[]): Promise<D | null> {
    if (populates) {
      [].concat(populates).forEach((item) => {
        docsQuery.populate(item);
      });
    }
    return docsQuery.exec();
  }
}
