import { Inject, Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { WINDOW } from './window.token';

@Injectable({
  providedIn: 'root',
})
export class Base64 {
  constructor(private log: Logger, @Inject(WINDOW) private win: Window) { }
  /**
   * @description 加密
   * @param code {string} 需要加密的字符串
   * @returns {string} 加密的字符串
   */
  public encode(code: string): string {
    try {
      // 首先，我们使用encodeURIComponent获得百分比编码的UTF-8，然后我们将百分比编码转换为可以输入到btoa的原始字节。
      return this.win.btoa(
        encodeURIComponent(code).replace(/%([0-9A-F]{2})/g, (...args) => String.fromCharCode(Number('0x' + args[1]))),
      );
    } catch (error) {
      this.log.error(error);
    }
    return code;
  }

  /**
   * @description 解密
   * @param code {string} 加密字符串
   * @returns {string} 解码后字符串
   */
  public decode(code: string): string {
    try {
      // 回溯:从字节流到百分比编码，再到原始字符串。
      return decodeURIComponent(
        this.win
          .atob(code)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
    } catch (error) {
      this.log.error(error);
    }
    return code;
  }
}

