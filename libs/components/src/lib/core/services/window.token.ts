import { InjectionToken } from '@angular/core';

/**
 * 表示主呈现上下文的DI标记。在浏览器中，这是Window对象。
 * 注意:当应用程序和呈现上下文不相同时(例如在Web Worker中运行应用程序时)，Window可能在应用程序上下文中不可用。
 * @example
 * constructor(
 *  @Optional() @Inject(WINDOW) private _window: Window,
 *  ...
 * )
 */
export const WINDOW = new InjectionToken<Window>(
  'WindowToken',
  typeof window !== 'undefined' && window.document
    ? { providedIn: 'root', factory: () => window }
    : undefined
);
