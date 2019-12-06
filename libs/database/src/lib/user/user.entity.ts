import { schemaOptions, Crud } from '../crud.entity';
import { ModelType, InstanceType, index, prop } from 'typegoose';
enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}


// enum Activatable {
//   INITIALIZE,
//   active,
//   disable,
// }

@index({ nickname: 1, mobile: 1 }, { unique: true })
export class User extends Crud<User> {
  static get model(): ModelType<User> {
    return new User().getModelForClass(User, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  @prop() // this will create a virtual property called 'mobile_number'
  get mobile_number() {
    return this.mobile && this.activatable === 1 ? this.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : null;
  }

  @prop({
    trim: true,
    required: true,
  })
  public nickname: string;

  @prop({ required: true, })
  public mobile: string;

  @prop()
  public avatar: string;

  @prop({
    required: true,
    select: false
  })
  public password: string;

  @prop({ enum: Gender })
  public gender?: Gender;

  @prop()
  public activatable?: number;

  public static createModel(): InstanceType<User> {
    return new this.model();
  }
}
