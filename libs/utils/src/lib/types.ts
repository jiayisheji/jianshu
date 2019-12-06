// tslint:disable-next-line: no-any
export type AnyType = any;
export type NgClassType = string | string[] | Set<string> | NgClassInterface;

export interface NgClassInterface {
  [className: string]: boolean;
}

export interface NgStyleInterface {
  [attr: string]: string | number;
}
