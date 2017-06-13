import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/**
 * 深拷贝
 * @param obj 
 */
function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 默认存储key值
 */
export const DEFAULT_STORAGE_POOL_KEY = 'app-storage:default';

/**
 * 存储类型（枚举）
 */
export enum StorageType {
    memory,    // 记忆
    sessionStorage,   // 会话存储（浏览器关闭消失）
    localStorage  // 本地存储（长存储）
}

/**
 * 缓存接口
 * name：名字
 * match：检查
 * put： 修改
 * get： 获取
 */
interface IDataCacheStrategy {
    name(): string;
    match(data: any): boolean;
    put(data: any, putStorage: (result: Object) => void): any;
    get(data: any): Object;
}
/**
 * rx缓存实现
 */
class RxDataCacheStrategy implements IDataCacheStrategy {
    name() {
        return 'RxDataCacheStrategy';
    }

    match(result: any): boolean {
        return result && result.subscribe;
    }

    put(result: any, putStorage: (data: Object) => void): Observable<any> {
        return result.map(data => {
            setTimeout(() => putStorage(data));
            return data;
        });
    }

    get(result: any): Object {
        return fromPromise(Promise.resolve(result));
    }
}
/**
 * Promise缓存实现
 */
class PromiseDataCacheStrategy implements IDataCacheStrategy {
    name() {
        return 'PromiseDataCacheStrategy';
    }

    match(result: any): boolean {
        return result && result.then;
    }

    put(result: any, putStorage: (data: Object) => void): Promise<any> {
        return result.then(data => setTimeout(() => putStorage(data)));
    }

    get(result: any): Object {
        return Promise.resolve(result);
    }
}
/**
 * 缓存工厂接口
 * getAll： 获取全部
 * get：获取一条
 * put： 更新
 * remove： 删除一条
 * removeAll： 删除全部
 */
export interface IStorage {
    getAll(pool: string): any;
    get(options: { pool?: string, key: string }): Object;
    put(options: { pool?: string, key: string }, value: Object): any;
    remove(options: { pool?: string, key?: string });
    removeAll();
}

/**
 * 缓存工厂
 */
class DataCacheStrategyFactory {
    private static factory: DataCacheStrategyFactory = new DataCacheStrategyFactory();
    private dataCacheStrategies: IDataCacheStrategy[];

    static getInstance(): DataCacheStrategyFactory {
        return DataCacheStrategyFactory.factory;
    }

    constructor() {
        this.dataCacheStrategies = [new RxDataCacheStrategy(), new PromiseDataCacheStrategy()];
    }

    put(options: { pool?: string, key: string }, value: any, storage: IStorage) {
        let strategy = this.dataCacheStrategies.find(t => t.match(value));
        if (strategy) {
            return strategy.put(value, (result) => storage.put(options, { type: strategy.name(), result }));
        }
        setTimeout(() => storage.put(options, value));
        return value;
    }

    get(data: any): Object {
        if (data && data.type) {
            let strategy = this.dataCacheStrategies.find(t => t.name() === data.type);
            if (strategy) {
                return strategy.get(data.result);
            }
        }
        return data;
    }
}

export class WebStorage implements IStorage {
    constructor(private webStorage: Storage) {
    }

    getAll(pool: string) {
        let json = this.webStorage.getItem(pool);
        return json ? JSON.parse(json) : {};
    }

    saveAll(pool: string, storage) {
        this.webStorage.setItem(pool, JSON.stringify(storage));
    }

    get({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key: string }): Object {
        let storage = this.getAll(pool);
        return storage[key];
    }

    put({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key: string }, value: Object): any {
        let storage = this.getAll(pool);
        storage[key] = value;
        return this.saveAll(pool, storage);
    }

    remove({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key?: string }) {
        if (!key) {
            this.webStorage.removeItem(pool);
            return;
        }

        this.put({ pool, key }, null);
    }

    removeAll() {
        this.webStorage.clear();
    }
}

export class MemoryStorage implements IStorage {
    private storage: Map<string, Map<string, Object>>;

    constructor() {
        this.storage = new Map<string, Map<string, Object>>();
    }

    getAll(pool: string): any {
        return this.storage.has(pool) ? this.storage.get(pool) : new Map<string, Object>();
    }

    get({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key: string }): Object {
        let storage = this.getAll(pool);
        return storage.has(key) ? cloneDeep(storage.get(key)) : null;
    }

    put({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key: string }, value: Object) {
        if (!this.storage.has(pool)) {
            this.storage.set(pool, new Map<string, Object>());
        }
        this.storage.get(pool).set(key, cloneDeep(value));
    }

    remove({ pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string, key?: string }) {
        if (!key) {
            this.storage.delete(pool);
            return;
        }

        let poolStorage = this.storage.get(pool);
        if (poolStorage) {
            poolStorage.delete(key);
        }
    }

    removeAll() {
        this.storage = new Map<string, Map<string, Object>>();
    }
}


@Injectable()
export class StorageService {
    sessionStorage: Storage;
    localStorage: Storage;
    memoryStorage: MemoryStorage;
    storages: Map<Object, IStorage>;

    private defaultStorageType: StorageType = StorageType.memory;

    constructor() {
        this.setupStorages();
    }

    setDefaultStorageType(storageType: StorageType): void {
        this.defaultStorageType = storageType;
    }

    getAll({ pool, storageType }: { pool: string, storageType?: StorageType }): any {
        const storage: IStorage = <IStorage> this.storages.get(storageType || this.defaultStorageType);
        return storage.getAll(pool);
    }

    get({ pool, key, storageType }: { pool?: string, key: string, storageType?: StorageType }): Object {
        let data = this.storages.get(storageType || this.defaultStorageType).get({ pool, key });
        return DataCacheStrategyFactory.getInstance().get(data);
    }

    put({ pool, key, storageType }: { pool?: string, key: string, storageType?: StorageType }, value: Object): any {
        let storage = this.storages.get(storageType || this.defaultStorageType);
        return DataCacheStrategyFactory.getInstance().put({ pool, key }, value, storage);
    }

    remove({ pool, key, storageType }: { pool?: string, key?: string, storageType?: StorageType }) {
        return this.storages.get(storageType || this.defaultStorageType).remove({ pool, key });
    }

    removeAll({ storageType }: { storageType?: StorageType }) {
        return this.storages.get(storageType || this.defaultStorageType).removeAll();
    }

    private setupStorages() {
        this.storages = new Map<String, IStorage>();
        this.memoryStorage = new MemoryStorage();

        if (window) {
            this.sessionStorage = window.sessionStorage;
            this.localStorage = window.localStorage;
            this.storages.set(StorageType.memory, this.memoryStorage)
                .set(StorageType.sessionStorage, new WebStorage(this.sessionStorage))
                .set(StorageType.localStorage, new WebStorage(this.localStorage));
            return;
        }

        this.storages.set(StorageType.memory, this.memoryStorage)
            .set(StorageType.sessionStorage, this.memoryStorage)
            .set(StorageType.localStorage, this.memoryStorage);
    }
}

export class StorageFactory {
    private static storageService: StorageService = new StorageService();

    static getStorageService(): StorageService {
        return StorageFactory.storageService;
    }
}

export function Cacheable({ pool = DEFAULT_STORAGE_POOL_KEY, key, storageType = StorageType.memory }:
                              { pool?: string, key?: string, storageType?: StorageType } = {}) {

    const storageService = StorageFactory.getStorageService();
    let getKey = (target: any, method: string, args: Object[]) => {
        // TODO: we can change this code or override object toString method;
        let prefix = key || `${target.constructor.name}.${method}`;
        return `${prefix}:${args.join('-')}`;
    };

    return function (target: any, name: string, methodInfo: any) {
        let method = methodInfo.value;

        let proxy = function (...args) {
            const key = getKey(target, name, args || []);
            let data = storageService.get({ pool, key, storageType });
            if (data) {
                return data;
            }

            let result = method.apply(this, args || []);
            return storageService.put({ pool, key, storageType }, result);
        };

        (<any>proxy).cacheEvict = function () {
            storageService.remove({ pool, key });
        };

        return {
            value: proxy
        };
    };
}

export const APP_STORAGE_PROVIDERS: Array<any> = [
    {
        provide: StorageService,
        useClass: StorageService
    },
];