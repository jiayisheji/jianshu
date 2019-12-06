/**
 * 与分部<T>相同，但更深一步，使得分部<T>具有所有的性质和子性质。
 */
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };
/**
 * 接口的简单文字对象，具有任何字符串键。
 */
// tslint:disable-next-line: no-any
export type ObjectLiteral<D = any> = Record<string, D>;

/**
 * use Mutable<B, keyof B>
 */
// tslint:disable-next-line: no-any
export type Mutable<T extends { [x: string]: any }, K extends string> = {
  [P in K]: T[P];
};
