import { Component, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

import { Environments } from '../../shared/environments';

import { MongooseConfig } from './mongoose.confg';

@Component()
export class MongooseService {
    private readonly logger = new Logger(MongooseService.name);

    private instance: mongoose.Connection;

    constructor() {
        // (mongoose as any).Promise = global.Promise;
    }

    get connection() {
        if (Environments.isTest()) {
            return (this.instance = mongoose.connection);
        }
        if (this.instance) {
            return this.instance;
        } else {
            mongoose.connect(this.setConfig(), {
                useMongoClient: true,
                promiseLibrary: global.Promise,
            });
            this.instance = mongoose.connection;
            this.instance.on('error', (e: Error) => {
                this.logger.error('MongoDB conenction error:' + e);
            });
            this.instance.once('open', () => {
                this.logger.log('Successful MongoDB Connection!');
            });
            return this.instance;
        }
    }

    private setConfig() {
        const mongooseConfig: MongooseConfig = new MongooseConfig();

        return mongooseConfig.configure();
    }
}