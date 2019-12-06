import { ErrorHandler, Injectable, isDevMode, Inject } from '@angular/core';
import { WINDOW } from './window.token';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  constructor(private errorHandler: ErrorHandler, @Inject(WINDOW) private win: Window) { }


  /**
   * @description 打印日志
   * @param {*} value
   * @param {...any[]} rest
   * @memberof Logger
   */
  // tslint:disable-next-line: no-any
  public log(value: any, ...rest: any[]): void;
  public log() {
    // 开发模式打印log 生产模式屏蔽log信息
    if (isDevMode()) {
      if (this.win && this.win.console) {
        // tslint:disable-next-line: no-console
        console.log.apply(console, arguments);
      }
    }
  }

  /**
   * @description 上报错误
   * @param {Error} error
   * @memberof Logger
   */
  public error(error: Error) {
    this.errorHandler.handleError(error);
  }

  /**
   * @description 打印警告
   * @param {*} value
   * @param {...any[]} rest
   * @memberof Logger
   */
  // tslint:disable-next-line: no-any
  public warn(value: any, ...rest: any[]): void;
  public warn() {
    if (this.win && this.win.console) {
      // tslint:disable-next-line: no-console
      console.warn.apply(console, arguments);
    }
  }
}
