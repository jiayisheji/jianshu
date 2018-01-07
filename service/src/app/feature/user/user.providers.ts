import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

export const UserProviders = [
    {
        provide: 'UserModelToken',
        useFactory: (connection: Connection) => connection.model('Users', UserSchema),
        inject: ['DbConnectionToken'],
    },
];