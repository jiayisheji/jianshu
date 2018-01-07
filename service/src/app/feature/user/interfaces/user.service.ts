import { IUser } from './user';

export interface IUserService {
    findAll(filter: object, projection: object): Promise<Array<IUser> | null>;
    findById(_id: string): Promise<IUser | null>;
    findOne(filter: object, projection: object): Promise<IUser | null>;
    create(user: IUser): Promise<IUser>;
    update(_id: string, newValue: IUser): Promise<IUser | null>;
    delete(_id: string): Promise<number>;
}