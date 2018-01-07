import * as mongoose from 'mongoose';
import { MongooseService } from '../mongoose';
export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => {
            return await new MongooseService().connection;
        },
    },
];