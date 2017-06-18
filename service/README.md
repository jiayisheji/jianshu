# 简书服务端(TypeScript or Node)
# 安装必备工具
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/) or [WebStorm](https://www.jetbrains.com/webstorm/)

# 准备开始

进入目录
```
cd service
```
安装依赖
```
npm install
```
安装mongoDB数据库

[连接MongoDB教程](https://github.com/jiayisheji/jianshu/blob/master/doc/%E8%BF%9E%E6%8E%A5MongoDB.md)

启动数据库

启动服务器
```
npm start
```
浏览器打开 `http://localhost:3000`

# TypeScript + Node 
这是一个TypeScript + Node项目

## TypeScript准备
```
npm install -g typescript
```

## 项目结构
这是TypeScript + Node项目结构，有源目录和发布目录

TypeScript (`.ts`) 文件在 `src` 里，编译成JavaScript (`.js`) 在 `dist`中 .
The `test` and `views` folders remain top level as expected. 

项目的完整文件夹结构如下:

> **Note!** 可以使用以下命令发布 `npm run build` or `yarn run build` 

| 名字 | 描述 |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | 发布目录  |
| **node_modules**         | 包含所有的npm依赖项                                                            |
| **src**                  | 源代码                               |
| **src/config**           | 项目配置   |
| **src/controllers**      | 项目控制器                            |
| **src/models**           | 项目模型（Mongoose schemas）  |
| **src/api**              | 项目API接口  |
| **src/routes**           | 项目路由配置  |
| **src/public**           | 项目静态资源           |
| **src/types**            | 存放[DefinitelyTyped](https://github.com/Microsoft/TypeScript-Node-Starter/blob/master/README.md#)里没有的自定义`.d.ts`文件          |
| **src**/app.ts        | 项目启动文件                                                               |
| **test**                 | 测试         |
| **views**                | 视图文件                 |                  |
| package.json             | 包含npm依赖项的文件和[build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json            | 用于编译TypeScript编写的服务器代码的配置设置                               |                                  |
| tslint.json              | TSLint代码样式检查的配置设置                                                |

## 构建项目
这和JavaScript项目不一样，需要编译，如果编辑就需要有编译配置

### TypeScript编译配置
下面就是一个配置信息和说明

```json
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "baseUrl": ".",
        "paths": {
            "*": [
                "node_modules/*",
                "src/types/*"
            ]
        }
    },
```

| `compilerOptions` | 说明 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `"module": "commonjs"`             | 以什么样模块方式，nodejs默认commonjs           |
| `"target": "es6"`                  | 编译es等级，nodejs支持es6                               |
| `"noImplicitAny": true`            | 启用更严格的设置，当有默认`any`值时，会抛出错误                |
| `"moduleResolution": "node"`       | TypeScript attempts to mimic Node's module resolution strategy. Read more [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node)                                                                    |
| `"sourceMap": true`                | 源映射可以在`JavaScript`的旁边输出.          |
| `"outDir": "dist"`                 | 编译输出`.js`文件夹                                                       |
| `"baseUrl": "."`                   | 配置模块解析的一部分. 看 [路径映射部分](#installing-dts-files-from-definitelytyped) |
| `paths: {...}`                     | 配置模块解析的一部分. 看 [路径映射部分](#installing-dts-files-from-definitelytyped) |


文件的其余部分定义了TypeScript项目上下文。
项目上下文基本上是一组选项，用于确定在使用特定的`tsconfig.json`调用编译器时编译哪些文件。

在这种情况下，我们使用以下的方式来定义我们的项目上下文：
```json
    "include": [
        "src/**/*"
    ]
```
`include` 在编译过程中包含了一系列的文件格式的文件。
这个项目相中，我们所有`.ts`文件在`src`文件夹下。

对于更复杂的设置，可以包含一个 `exclude` glob模式的数组，它从定义的集合中删除特定的`include`文件

还有一个`files`选项，它采用了一组单独的文件名，覆盖了`include`和`exclude`。

### 运行发布
所有不同的构建步骤都是通过 [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts 基本上允许我们通过npm调用(和链)终端命令。
这很好，因为大多数JavaScript工具都很容易使用命令行实用工具，允许我们不需要使用命令行或吞咽来管理我们的构建。
如果你打开`package.json`，您将看到一个`scripts`部分，其中包含您可以调用的所有不同的脚本。
要调用一个脚本，只需在命令行中运行`npm run <script-name>`(or `yarn run <script-name>`)。
您将注意到，npm脚本可以相互调用，这使得用简单的单个构建脚本编写复杂的构建变得很容易。
下面是本项目可用的所有脚本的列表:


| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | 在开始所有观察任务之前，运行完整的构建。可以调用 `npm start`                  |
| `build`                   | 完整的构建。运行所有构建任务 ( `build-ts`, `tslint`)       |
| `dev`                   | 运行 `node dist/app.js` 启动项目                                     |
| `watch`                   | 自动监听任务    |
| `build-ts`                | 编码目标 `.ts` 文件成 `.js` 文件到 `dist` 中                               |
| `watch-ts`                | 和 `build-ts` 一样， 可以监听 `.ts` 变化                |
| `tslint`                  | 在项目文件上运行TSLint                                                                      |

## 类型定义 (`.d.ts`) 文件
TypeScript 使用 `.d.ts` 文件 为没有编写的JavaScript库提供TypeScript类型.
这很好，因为一旦你有了 `.d.ts` 文件, TypeScript 可以对库进行类型检查，并在编辑器中提供更好的帮助。.
TypeScript社区积极地分享所有最新的 `.d.ts` 文件在GitHub库中流行的库 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types).
确保你的 `.d.ts` 正确设置文件是非常重要的，因为一旦它们就位，就会获得大量的高质量的类型检查(因此bug捕获、智能感知和其他编辑工具)。

> **说明!** 因为我们使用的是 `"noImplicitAny": true`, 我们被要求拥有一个 `.d.ts` 文件对于我们使用的每个库. 当你可以 `noImplicitAny` 设置 `false` 来关闭无 `.d.ts` 文件的错误, 最好的做法是为每个库提供 `.d.ts` 文件. (甚至`.d.ts`文件[基本上是空的!](#writing-a-dts-file)) 

### 从DefinitelyTyped安装 `.d.ts` 文件
大多数情况下，你会发现`DefinitelyTyped`为我们准备了使用的库的`.d.ts`文件。
这些`.d.ts`通过使用npm范围`@types`，可以很容易地将`.d.ts`ts文件安装到您的项目中。
例如，如果我们想要。对于jQuery，我们可以使用npm安装`npm install --save-dev @types/jquery`。

> **说明!** 确保添加`--save-dev` (or `-D`)到您的`npm install`。`.d.ts`文件是项目依赖关系，但只在编译时使用，因此应该是devDependencies。 

在这个项目中，所有的`.d.ts`文件已经在包中被添加到`package.json`中`devDependencies`，所以在运行您的第一个`npm install`之后，您将得到您所需要的一切。
一旦`.d.ts`文件是使用npm安装的，你应该在你的`node_modules/@types`文件夹中看到它们。
编译器将始终在这个文件夹中查找`.d.ts`解析JavaScript库时的ts文件。

### 如果一个库没有DefinitelyTyped，那该怎么办呢? 
如果你试着安装来自`@types`的`.d.ts`文件，它没有被找到，或者你检查了定义类型并且找不到一个特定的库，你想要创建你自己的`.d.ts file`。
在这个项目的 `src` 文件夹中，您将找到包含`.d.ts`的`types`文件夹，`.d.ts`文件不是在定义上的(或者不是在写这篇文章的时候)。

#### 设置TypeScript 查找 `.d.ts` 文件所在文件夹
编译器知道默认情况下会查看`node_modules/@types`，但可以帮助编译器找到属于自己的 `.d.ts`文件，我们必须在`tsconfig.json`中配置路径映射。
路径映射可能会变得相当混乱，但是基本的思想是，当解析模块时，类型的编译器将会以特定的顺序查看特定的位置，并且我们有能力告诉编译器确切的方法。
在`tsconfig.json`对于这个项目，您将看到以下内容:
```json
"baseUrl": ".",
"paths": {
    "*": [
        "src/types/*"
    ]
}
```
这告诉了TypeScript编译器，除了查看`node_modules/@types`外，每个导入的也可以通过(`*`)查看我们自己的`.d.ts`文件的位置为`<baseUrl>` + `src/types/*`。
所以当我们写一些东西的时候：
```ts
import * as lusca from "lusca";
```
首先编译器将查找`d.ts`在`node_modules/@types`文件中，当它没有找到一个在 `src/types`中的查找，并找到我们的文件`lusca.d.ts`。

#### 使用 `dts-gen`
除非你熟悉`.d.ts`文件，我强烈建议尝试使用工具dts-gen(https://github.com/microsoft/dts-gen)

[README](https://github.com/microsoft/dts-gendts-gen-file-file-file-生成器)在解释如何使用该工具方面做了大量工作，在大多数情况下，您将获得一个优秀的`.d.ts`的支架。从文件开始。
在这个项目中,`bcrypt-nodejs.d.ts`, `fbgraph.d.ts`, 和 `lusca.d.ts`是使用dts-gen生成的。

#### 写一个 `.d.ts` 文件
如果使用`dts-gen`的生成的`.d.ts`不起作用，然后你就可以创建你自己的。ts文件。

如果你想暂时关闭编译器，创建一个名为`<some-library>.d.ts` 在 `types` 文件夹中，并且然后添加这一行代码: 
```ts
declare module "<some-library>";
```

如果你想花点时间去做一个全面的。将会给你提供很棒的类型检查和智能感知的`.d.ts`文件, 可以参照TypeScript官网[文档编写的`.d.ts`的文件](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html). 

### 总结 `.d.ts` 管理
一般来说，如果你坚持下面的步骤，你应该没有问题;
1. 在安装了任何npm包作为dependency或devDependency之后，立即尝试通过`@types`安装`.d.ts`文件。
2. 如果库有`.d.ts`在DefinitelyTyped的文件中，安装会成功，你就完成了。
如果安装失败，因为包不存在，则继续执行步骤3。
3. 确保你的项目是 [为自己提供的配置 `d.ts` 文件](#setting-up-typescript-to-look-for-dts-files-in-another-folder)
4. 试着[生成一个 `.d.ts` 文件与dts-gen](#using-dts-gen). 
如果成功了，你就完成了。
如果没有，继续第5步。
5. 创建一个名为`<some-library>.d.ts`的文件。在您的`types`文件夹中。
6. 添加以下代码:
```ts
declare module "<some-library>";
```
7. At this point everything should compile with no errors and you can either improve the types in the `.d.ts` file by following this [guide on authoring `.d.ts` files](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) or continue with no types.

## Debugging
调试TypeScript就像调试JavaScript，有一个`警告`，一定需要源映射

### Source maps
源代码映射允许您在您的类型文件源代码中删除断点，并且在运行时被执行的JavaScript破坏了断点。

> **说明!** - 源映射并不特定于打印文件。
任何时候，只要JavaScript被转换(转换、编译、优化、缩小等等)，您就需要源代码映射，以便在运行时执行的代码可以映射回生成它的源代码。

源映射最好的部分是正确配置时，您甚至不知道它们的存在！来看看我们在这个项目中是怎么做的。

#### 配置 source maps
首先，您需要确保你的`tsconfig.json`的源映射生成:
```json
"compilerOptions" {
    "sourceMaps": true
} 
```
有了这个选项，每个选项都可以`.js`文件将会有一个`.map.js`文件。
这种`.map.js`文件提供了映射回源的必要信息`.ts`文件来调试。

> **说明!** - 还可以使用“内联”源映射 `"inlineSourceMap": true`.
这在编写客户端代码时更为常见，因为有些bundler需要内联源映射，以通过bundle保存映射。
因为我们在写node.js代码，我们不用担心这个。

## 测试
测试项目，后期再说

## TSLint
TSLint是一个代码linter，主要帮助捕获小的代码质量和样式问题。
TSLint与ESLint或JSLint非常相似，但是它是用TypeScript来构建的。

### TSLint 规则
与大多数lint一样，TSLint具有一组可配置的规则集，以及对自定义规则集的支持。
所有规则都是通过`tslint.json`配置的。
在这个项目中，我们使用了一组相当基本的规则，没有附加的自定义规则。
这些设置很大程度上是基于我们用来开发TypeScript本身的TSLint设置。

### 运行 TSLint
与其他构建步骤一样，我们使用npm脚本来调用TSLint。
要运行TSLint，您可以调用主构建脚本，也可以调用TSLint任务。
```
npm run build   // runs full build including TSLint
npm run tslint  // runs only TSLint
```
注意，TSLint不是主表任务的一部分。
在编写函数的过程中，TSLint可能会让输出窗口混乱，所以我选择只在整个构建期间运行它。

# 依赖关系
依赖关系通过`package.json`来管理。在这个文件中，你会找到两个部分:
## `dependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| async                           | Utility library that provides asynchronous control flow.              |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |
| body-parser                     | Express 4 middleware.                                                 |
| compression                     | Express 4 middleware.                                                 |
| connect-mongo                   | MongoDB session store for Express.                                    |
| dotenv                          | Loads environment variables from .env file.                           |
| errorhandler                    | Express 4 middleware.                                                 |
| express                         | Node.js web framework.                                                |
| express-flash                   | Provides flash messages for Express.                                  |
| express-session                 | Express 4 middleware.                                                 |
| express-validator               | Easy form validation for Express.                                     |
| fbgraph                         | Facebook Graph API library.                                           |
| lusca                           | CSRF middleware.                                                      |
| mongoose                        | MongoDB ODM.                                                          |
| morgan                          | Express 4 middleware.                                                 |
| nodemailer                      | Node.js library for sending emails.                                   |
| passport                        | Simple and elegant authentication library for node.js                 |
| passport-facebook               | Sign-in with Facebook plugin.                                         |
| passport-local                  | Sign-in with Username and Password plugin.                            |
| request                         | Simplified HTTP request library.                                      |

## `devDependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| concurrently                    | 用于管理多个并发任务的实用程序。使用npm脚本 |
| supertest                       | HTTP assertion library.                                               |
| tslint                          | 检查 (类似 ESLint) TypeScript 文件                       |
| typescript                      | 提高JavaScript生产率的JavaScript编译器/类型检查器  |

要安装或更新这些依赖项，您可以使用 `npm` or `yarn`.

# 其他
可以看[系列教程](https://github.com/jiayisheji/jianshu/blob/master/doc/)


