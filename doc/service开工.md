# 编写config
> angular2用的angular-cli构建，默认自带服务器端口号4200。
vue2用的vue-cli构建，默认自带服务器端口号8080。
定义服务器端口3000。
```
root: rootPath,  根目录
app: {           网站相关配置
    name: 'jianshu'    网站名称
},
port: 3000,      服务端口号
db: 'mongodb://localhost/jianshu'  数据库地址链接
```

## 开始编写
> 开始之前，先科普一点知识。
TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。
TypeScript大部分语法和JavaScript的ECMA2015一样，对其有一些增强。个添加了对静态类型，经典的面向对象语言特性如类，继承，接口和命名空间等的支持，TypeScript鼓励强类型。

### 定义变量
> ECMA2015版本之前JavaScript定义变量都是var，ECMA2015添加了let和const，TypeScript默认支持let和const；
#### let是更完美的var
1. let声明的变量拥有块级作用域。也就是说用let声明的变量的作用域只是外层块，而不是整个外层函数。
2. let声明的全局变量不是全局对象的属性。这就意味着，你不可 以通过window.变量名的方式访问这些变量。它们只存在于一个不可见的块的作用域中，这个块理论上是Web页面中运行的所有JS代码的外层块。
3. let声明的变量直到控制流到达该变量被定义的代码行时才会被装载，所以在到达之前使用该变量会触发错误。
4. 用let重定义变量会抛出一个语法错误（SyntaxError）。

#### 神秘的代理命名空间const
1. const声明的变量定义为常量，不可修改。
2. const声明的变量与let声明的变量类似，它们的不同之处在于，const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误）。
3. 用const声明变量后必须要赋值，否则也抛出语法错误。
4. 用const申明变量除了对象字面量{}，其他变量都不能修改，会抛出语法错误。

### 模块导出
> nodejs自带module.exports导出模块依赖。
TypeScript可以使用export导出模块依赖等其他文件
任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。
```
默认导出
export default $;
// 导出声明
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
导出语句
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
重新导出 // 导出原先的验证器但做了重命名
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";
```

### 模块导入
> nodejs自带require导入模块依赖。
TypeScript可以使用import导入模块依赖等其他文件
```
// 默认导入和命名导入
import theDefault, { named1, named2 } from 'src/config';
import theDefault from 'src/config';
import { named1, named2 } from 'src/config';
将模块作为对象导入  
import * as path from 'path';
重命名：import named1为myNamed1
import { named1 as myNamed1, named2 } from 'src/config';
```

### 入坑1（关于导入）
> error TS1192: Module '"path"' has no default export.
```
import path from "path";
let rootPath = path.resolve(__dirname + '/..');
会被编译成
const path_1 = require("path");
let rootPath = path_1.default.resolve(__dirname + '/..');
```
node内置模块需要用到以下方式导入
```
import * as path from "path";
let rootPath = path.resolve(__dirname + '/..');
会被编译成
const path = require("path");
let rootPath = path.resolve(__dirname + '/..');
```
> export = 和 import = require() 
自定义模块，导入导出都需要用到

这是TypeScript提供一组导入导出方法

CommonJS和AMD都有一个exports对象的概念，它包含了一个模块的所有导出内容。
它们也支持把exports替换为一个自定义对象。 默认导出就好比这样一个功能；然而，它们却并不相互兼容。 TypeScript模块支持 export =语法以支持传统的CommonJS和AMD的工作流模型。
export =语法定义一个模块的导出对象。 它可以是类，接口，命名空间，函数或枚举。
若要导入一个使用了export =的模块时，必须使用TypeScript提供的特定语法import let = require("module")。

### 入坑2（关于报错）
> typescript getting error TS2304: cannot find name ' require'

会出现以上的报错信息：
1. 需要配置一下tsconfig.json([参考](https://www.tslang.cn/docs/handbook/tsconfig-json.html))
2. 定义"types" : ["node", "lodash", "express", "mongoose"]在compilerOptions里
3. npm install @types/node --save安装对应的依赖


