import { Connection } from 'mongoose';
import { LoginhistorySchema } from './loginhistory.schema';

export const LoginhistoryProviders = [
    {
        provide: 'LoginhistoryModelToken',
        useFactory: (connection: Connection) => connection.model('Loginhistory', LoginhistorySchema),
        inject: ['DbConnectionToken'],
    },
];