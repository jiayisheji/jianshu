import { registerDecorator, ValidationOptions, Validator } from 'class-validator';
const validator = new Validator();
export function EmailOrMobile(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'emailOrMobile',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        /** true表示验证成功 false表示验证失败 */
        validate(value: string): boolean {
          if (validator.isEmpty(value)) {
            return true;
          }
          return value && (value.indexOf('@') > -1 ? validator.isEmail(value) : validator.isMobilePhone(value, 'zh-CN'));
        },
      },
    });
  };
}
