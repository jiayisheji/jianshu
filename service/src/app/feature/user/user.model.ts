import { Component } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { DocumentQuery, Schema } from 'mongoose';
import { MongooseService } from '../../core';
import { IUser } from './interfaces';
import { UserSchema } from './user.schema';

export interface IUserModel extends Model<IUser> {
}

@Component()
export class UserModel {
    private model: IUserModel;
    private schema: Schema;
    private readonly collection = 'users';

    constructor(private mongooseService: MongooseService) {
        this.verifySchema();
        this.addStaticsMethod();
        this.useRepository();
    }

    public useRepository() {
        const models: Array<any> = this.mongooseService.connection.modelNames();
        if (models.includes(this.collection)) {
            this.model = this.mongooseService.connection.model(
                this.collection,
            ) as IUserModel;
        } else {
            this.model = this.mongooseService.connection.model(
                this.collection,
                this.schema,
            ) as IUserModel;
        }
        return this.model;
    }

    private verifySchema() {
        this.schema = UserSchema;
    }

    /**
     * Binds custom static methods to the schema
     *
     * @private
     * @memberof HerosModel
     */
    private addStaticsMethod() {
    }

}