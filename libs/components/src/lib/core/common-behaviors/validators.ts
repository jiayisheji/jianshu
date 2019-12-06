import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// tslint:disable-next-line: no-any
export function isEmptyInputValue(value: any): boolean {
  // 这里我们不检查字符串，所以它也能处理数组
  return value == null || value.length === 0;
}

/**
 * 正则表达式
 */
export const regex = {
  // 中文
  CHINESE: /^[\u4e00-\u9fa5]$/,
  // url
  URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/m,
  // ip
  IP: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
};

/**
 * @description 自定义验证器工具箱
 * @export
 * @class ValidatorsKit
 */
export class ValidatorsKit {
  /**
   * @description 比较2个值相等
   * @static
   * @param {AbstractControl} compare
   * @returns {ValidatorFn}
   * @memberof CustomValidators
   */
  public static equal(compare: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;
      }
      return control.value === compare.value ? null : { equal: true };
    };
  }

  /**
   * @description 比较2个值不相等
   * @static
   * @param {AbstractControl} compare
   * @returns {ValidatorFn}
   * @memberof CustomValidators
   */
  public static notEqual(compare: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !ValidatorsKit.equal(compare.value)(control.value) ? null : { notEqual: true };
    };
  }

  /**
   * @description 验证url
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)}
   * @memberof SimValidators
   */
  public static url(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    return regex.URL.test(control.value) ? null : { url: true };
  }

  /**
   * @description 验证ip
   * @static
   * @param {AbstractControl} control
   * @returns {(ValidationErrors | null)}
   * @memberof SimValidators
   */
  public static ip(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    return regex.IP.test(control.value) ? null : { ip: true };
  }

  /**
   * @description 检查数字是否在指定范围内
   * @static
   * @param {number} min
   * @param {number} max
   * @returns {ValidatorFn}
   * @memberof CustomValidators
   */
  public static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = parseFloat(control.value);
      return !isNaN(value) && length < max && length > min
        ? null
        : {
          range: { requiredRange: [min, max], actual: control.value },
        };
    };
  }

  /**
   * @description 检查字符串的长度是否在指定范围内
   * @static
   * @param {number} minLength
   * @param {number} maxLength
   * @returns {ValidatorFn}
   * @memberof CustomValidators
   */
  public static rangeLength(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;
      }
      const length: number = control.value.length;
      return length < maxLength && length > minLength
        ? null
        : {
          rangeLength: { requiredRangeLength: [minLength, maxLength], actualLength: length },
        };
    };
  }

  /**
   * @description 检查是否是中文，并且长度是否在指定范围内
   * @static
   * @param {number} minLength
   * @param {number} maxLength
   * @returns {ValidatorFn}
   * @memberof CustomValidators
   */
  public static chineseLength(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;
      }
      const length: number = control.value.length;
      // 如果不是中文直接返回
      if (!regex.CHINESE.test(control.value)) {
        return {
          chinese: true,
        };
      }
      // 判断是否在指定长度内
      return length < maxLength && length > minLength
        ? null
        : {
          chineseLength: { requiredChineseLength: [minLength, maxLength], actualLength: length },
        };
    };
  }

  /**
   * @description 检查字符长度区分中英文，长度是否在指定范围内 一个中文算2个字符
   * @static
   * @param {number} minLength
   * @param {number} maxLength
   * @returns {ValidatorFn}
   * @memberof CustomValidators
   */
  public static charLength(minLength: number, maxLength: number): ValidatorFn {
    const CHINESE_REGEX = new RegExp(regex.CHINESE, 'g');
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;
      }
      const value = control.value.replace(CHINESE_REGEX, '**');
      const length: number = value.length;

      // 判断是否在指定长度内
      return length < maxLength && length > minLength
        ? null
        : {
          charLength: { requiredCharLength: [minLength, maxLength], actualLength: length },
        };
    };
  }
}
