import { IUser } from './user';

export interface IUserService {
    findAll(): Promise<Array<IUser>>;
    findById(_id: string): Promise<IUser | null>;
    findOne(options: object): Promise<IUser | null>;
    create(user: IUser): Promise<IUser>;
    update(_id: string, newValue: IUser): Promise<IUser | null>;
    delete(_id: string): Promise<number>;
}