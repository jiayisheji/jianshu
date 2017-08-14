# 常用组件之dialog

自 1995 年 JavaScript 诞生之初，就包含了 3 个方法 alert()、confirm() 和 prompt()。却满足不了UI设计师，前端开发工程师都需要自己根据UI界面去模拟各种特性。

随着web标准不断进化，浏览器不断升级，dialog也可以定制了。

## Chromium新的弹窗机制以及HTML5.2的<dialog>元素
  
<dialog> 作为 HTML 5.2 的元素，目前除了 Chrome 和 Opara 以外，其它浏览器均未支持。但是 Google 提供了一个
  [ dialog-polyfill ](https://github.com/GoogleChrome/dialog-polyfill)。
  
和使用html其他标签一样使用<dialog>
  ```
    <dialog>这是一个dialog</dialog>
  ```
  不过你压根看不出什么，没有任何效果，是对的，是没有任何效果，因为没有调用它。
