# 常用组件之dialog

自 1995 年 JavaScript 诞生之初，就包含了 3 个方法 alert()、confirm() 和 prompt()。却满足不了UI设计师，前端开发工程师都需要自己根据UI界面去模拟各种特性。

随着web标准不断进化，浏览器不断升级，dialog也可以定制了。

## Chromium新的弹窗机制以及HTML5.2的<dialog>元素
  
<dialog> 作为 HTML 5.2 的元素，目前除了 Chrome 和 Opara 以外，其它浏览器均未支持。但是 Google 提供了一个[dialog-polyfill](https://github.com/GoogleChrome/dialog-polyfill)。
  
和使用html其他标签一样使用<dialog>
  ```
    <dialog>这是一个dialog</dialog>
  ```
  不过你压根看不出什么，没有任何效果，是对的，是没有任何效果，因为没有调用它。

怎么调用，一般我们自己去写dialog，会有2个必须有的方法，一个是open打开dialog，一个是close关闭dialog。
不过不好意思<dialog>提供是show()和showModal()和close()。
  ```
  <dialog>
        <p>这是一个dialog</p>
        <button id="close">关闭</button>
    </dialog>

    <button id="show">打开</button>
    <script>
        var dialog = document.querySelector('dialog');

        document.querySelector('#show').onclick = function() {
            // dialog.show();     // 无backdrop
            dialog.showModal();   // 有backdrop
        };

        document.querySelector('#close').onclick = function() {
            dialog.close();
        };
    </script>
  ```
  不写任何样式，很丑很原生。
  
  谷歌浏览器默认dialog样式
  ```
  dialog {
      display: block;
      position: absolute;
      left: 0px;
      right: 0px;
      width: -webkit-fit-content;
      height: -webkit-fit-content;
      color: black;
      margin: auto;
      border-width: initial;
      border-style: solid;
      border-color: initial;
      border-image: initial;
      padding: 1em;
      background: white;
  }
  ```
  你可能一定要问show()和showModal()有什么区别，它们的区别在于有没有backdrop遮罩层。
    谷歌浏览器默认dialog样式
  ```
  dialog::backdrop {
      position: fixed;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background: rgba(0, 0, 0, 0.1);
  }
  ```
  backdrop是dialog的伪元素，可以通过使用 CSS 的伪元素 ::backdrop 去修改定制。
  
  整体来说<dialog>还是比较简单易用，比我们用javascript 使用 <div> 来模拟弹窗，容易的多，随着浏览器不断升级，这也将是标准。
  相比 <div> 而言，<dialog> 更大强大，也更加符合规范。
  
  
