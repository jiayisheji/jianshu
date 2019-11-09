import { Document, Model, ModelPopulateOptions, QueryFindOneAndUpdateOptions, Types, DocumentQuery, QueryFindOneAndRemoveOptions } from 'mongoose';
import { WriteOpResult, FindAndModifyWriteOpResultObject } from 'mongodb';

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export type OrderType<T> = Record<keyof T, 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1>

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
  /**
   * Pagination limit
   */
  @ApiModelPropertyOptional({ type: Number, minimum: 1, maximum: 50 })
  @IsOptional()
  @Min(1)
  @Max(50)
  @Transform((val: string) => parseInt(val, 10) || 10)
  readonly limit = 10;

  /**
   * Pagination offset
   */
  @ApiModelPropertyOptional({ type: Number, minimum: 0 })
  @IsOptional()
  @Min(0)
  @Transform((val: string) => parseInt(val, 10))
  readonly offset: number;

  /**
   * Pagination page
   */
  @ApiModelPropertyOptional({ type: Number, minimum: 1 })
  @IsOptional()
  @Min(1)
  @Transform((val: string) => parseInt(val, 10))
  readonly page: number;

  /**
   * OrderBy
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  abstract readonly order?: OrderType<T>;
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
   * @description 获取指定条件全部数据
   * @param {*} conditions
   * @param {(Object | String)} [projection]
   * @param {({
   *     sort?: OrderType<T>;
   *     limit?: number;
   *     skip?: number;
   *     lean?: boolean;
   *     populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *     [key: string]: any;
   *   })} [options]
   * @returns {Promise<T[]>}
   * @memberof CrudModelService
   */
  findAll(conditions: any, projection?: Object | String, options: {
    sort?: OrderType<T>;
    limit?: number;
    skip?: number;
    lean?: boolean;
    populates?: ModelPopulateOptions[] | ModelPopulateOptions;
    [key: string]: any;
  } = {}): Promise<T[]> {
    const { populates = null, ...option } = options;
    const docsQuery = this._model.find(conditions, projection, option);
    return this.populates<T[]>(docsQuery, populates);
  }

  /**
   * @description 获取带分页数据
   * @param {PaginationParams<T>} conditions
   * @param {(Object | String)} [projection]
   * @param {({
   *     lean?: boolean;
   *     populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *     [key: string]: any;
   *   })} [options={}]
   * @returns {Promise<Paginator<T>>}
   * @memberof CrudModelService
   */
  async paginator(conditions: PaginationParams<T>, projection?: Object | String, options: {
    lean?: boolean;
    populates?: ModelPopulateOptions[] | ModelPopulateOptions;
    [key: string]: any;
  } = {}): Promise<Paginator<T>> {
    const { limit, offset, page, order, ...query } = conditions;

    // 拼装分页返回参数
    const result: Paginator<T> = {
      items: [],
      total: 0,
      limit,
      offset: 0,
      page: 1,
      pages: 0,
    };

    // 拼装查询配置参数
    options.sort = order;
    options.limit = limit;

    // 处理起始位置
    if (offset !== undefined) {
      result.offset = offset;
      options.skip = offset;
    } else if (page !== undefined) {
      result.page = page;
      options.skip = (page - 1) * limit;
      result.pages = Math.ceil(result.total / limit) || 1;
    } else {
      options.skip = 0;
    }
    // 获取分页数据
    result.items = await this.findAll(query, projection, options);
    // 获取总条数
    result.total = await this.count(query);
    // 返回分页结果
    return Promise.resolve(result);
  }

  /**
   * @description 获取单条数据
   * @param {*} conditions
   * @param {(Object | String)} [projection]
   * @param {({
   *     lean?: boolean;
   *     populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *     [key: string]: any;
   *   })} [options]
   * @returns {(Promise<T | null>)}
   * @memberof CrudModelService
   */
  findOne(conditions: any, projection?: Object | String, options: {
    lean?: boolean;
    populates?: ModelPopulateOptions[] | ModelPopulateOptions;
    [key: string]: any;
  } = {}): Promise<T | null> {
    const { populates = null, ...option } = options;
    const docsQuery = this._model.findOne(conditions, projection || {}, option);
    return this.populates<T>(docsQuery, populates);
  }

  /**
   * @description 根据id获取单条数据
   * @param {(any | string | number)} id
   * @param {(Object | String)} [projection]
   * @param {({
   *     lean?: boolean;
   *     populates?: ModelPopulateOptions[] | ModelPopulateOptions;
   *     [key: string]: any;
   *   })} [options={}]
   * @returns {(Promise<T | null>)}
   * @memberof CrudModelService
   */
  findById(id: any | string | number, projection?: Object | String, options: {
    lean?: boolean;
    populates?: ModelPopulateOptions[] | ModelPopulateOptions;
    [key: string]: any;
  } = {}): Promise<T | null> {
    const { populates = null, ...option } = options;
    const docsQuery = this._model.findById(this.toObjectId(id), projection, option);
    return this.populates<T>(docsQuery, populates);
  }

  /**
   * @description 获取指定查询条件的数量
   * @param {*} conditions
   * @returns {Promise<number>}
   * @memberof CrudModelService
   */
  count(conditions: any): Promise<number> {
    return this._model.countDocuments(conditions).exec();
  }

  /**
   * @description 创建一条数据
   * @param {Partial<T>} docs
   * @returns {Promise<T>}
   * @memberof CrudModelService
   */
  create(docs: Partial<T>): Promise<T> {
    return this._model.create(docs);
  }

  /**
   * @description 删除指定id数据
   * @param {(any | number | string)} id
   * @param {QueryFindOneAndRemoveOptions} options
   * @returns {(Promise<FindAndModifyWriteOpResultObject<T | null>>)}
   * @memberof CrudModelService
   */
  delete(id: any | number | string, options?: QueryFindOneAndRemoveOptions): Promise<FindAndModifyWriteOpResultObject<T | null>> {
    return this._model.findByIdAndRemove(this.toObjectId(id), options).exec();
  }

  /**
   * @description 更新指定id数据
   * @param {string} id
   * @param {Partial<T>} update
   * @param {QueryFindOneAndUpdateOptions} [options={ new: true }]
   * @returns {(Promise<T | null>)}
   * @memberof CrudModelService
   */
  update(id: string, update: Partial<T>, options: QueryFindOneAndUpdateOptions = { new: true }): Promise<T | null> {
    return this._model.findByIdAndUpdate(this.toObjectId(id), update, options).exec();
  }

  /**
   * @description 删除所有匹配条件的文档集合
   * @param {*} [conditions={}]
   * @returns {Promise<WriteOpResult['result']>}
   * @memberof CrudModelService
   */
  clearCollection(conditions: any = {}): Promise<WriteOpResult['result']> {
    return this._model.deleteMany(conditions).exec();
  }

  /**
   * @description 转换ObjectId
   * @private
   * @param {(string | number)} id
   * @returns {Types.ObjectId}
   * @memberof CrudModelService
   */
  private toObjectId(id: string | number): Types.ObjectId {
    return Types.ObjectId(id);
  }

  /**
   * @description 填充其他模型
   * @private
   * @template D
   * @param {DocumentQuery<D, T, {}>} docsQuery
   * @param {(ModelPopulateOptions | ModelPopulateOptions[] | null)} populates
   * @returns {(Promise<D | null>)}
   * @memberof CrudModelService
   */
  private populates<D>(docsQuery: DocumentQuery<D, T, {}>, populates: ModelPopulateOptions | ModelPopulateOptions[] | null): Promise<D | null> {
    if (populates) {
      [].concat(populates).forEach((item: ModelPopulateOptions) => {
        docsQuery.populate(item);
      });
    }
    return docsQuery.exec();
  }
}
