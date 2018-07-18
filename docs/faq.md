# 常见问题

## 关于git Commit 规范提交问题

> vscode 可以安装 Visual Studio Code Commitizen Support插件来规范书写commit 信息

提交格式

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**注意**：

1. `<type>(<scope>): <subject>`： type是强制性，scope是选的，subject是一个简单标题
2. `<body>` 写详细描述 可选
3. `<footer>` 一般放关闭bug描述和关闭的编号

### Visual Studio Code Commitizen Support使用

#### 第一步：选择类型

```text
build: 影响构建系统或外部依赖关系的更改（示例范围：gulp, broccoli, npm）
ci: 更改我们的配置文件和脚本（示例范围：Travis, Circle, BrowserStack, SauceLabs）
docs: 仅文档更改，比如README, CHANGELOG, CONTRIBUTE等等
feat: 一个新功能
fix: 一个错误修复
perf: 一个性能优化的代码，比如提升性能、体验
refactor: 重构，既不修复错误也不添加功能
style: 不改变代码逻辑，仅仅修改代码风格（空格，格式化，分号分号等）
test: 添加缺失测试或更正现有测试（测试用例，包括单元测试、集成测试等）
chore: 其他，例如发布版 chore(release): 
```

#### 第二步：填写作用域范围 【denote the scope of this change(optional)】

可选的作用域（暂定）：

0. web：pc端 spa
1. web-ssr：pc端 ssr
2. web-app: 移动端 pwa
3. admin：pc端 spa
4. app：移动端 flutter
5. docs: 开发说明文档

不涉及具体业务的补充说明：

1. packaging 用于package.json修改
2. README.md 用于README.md修改

#### 第三步 写一个简短的描述 【write a short imperative tense description of the change】

提交格式：

> 文件名<功能>：文件内容操作描述

注意用词规范：

对文件操作

- 添加：添加一个文件使用  添加user模块
- 移动：移动文件夹到某一个地方 带上从哪里移动到哪里即可 **注意**位置和上面的作用域挂钩
- 删除：删除文件
- 更改：重命名 从什么名字重命名为什么名字 xxx重命名为yyy

对文件内容操作

- 新增：新增一个功能使用（需要带上具体的功能）
- 重构：重构一个功能代码
- 修改：修改或者改进一个功能代码
- 修复：修复一个功能bug
- 移除：注释代码，屏蔽功能，删除代码

功能：（可选，无法描述的功能，可以不填）

- 模块（模块 通用）
- 组件（组件 通用）
- 服务（服务 通用）
- 路由（路由 通用）
- 指令（指令 通用）
- 配置（配置 通用）
- 管道（管道 通用）
- 动画（动画 通用）
- 模板（组件模板 组件关联）
- 样式（组件样式 组件关联）
- 接口（typescipt）
- 状态（状态管理）

```text
举例：一个user业务模块

文件操作

添加user模块，组件，服务，路由，指令，配置文件

删除user模块

移动user服务 从core到user

更改user接口 user.ts重命名为user.type.ts

文件内容操作

user组件 新增验证用户名功能

user组件 重构全部 | 重构初始化方法

user模板 修改搜索功能结构

user服务 修复手机号正则表达式错误

user样式 移除:hsot样式
```

#### 第四步 提供一个较长描述的 用|断开 【provide a longer description of the chane optional use | to break new line】

如果上一步无法描述清楚，你可以在这里写详细的内容。可选的

#### 第五步 列出任何突发情况 【list any breaking changes(optional)】

备注，可选的

#### 第六步 关于关闭bug的描述 【list any issues closed by this change(optional) E.g #31, #34】

关于bug描述的，对应的bug编号（和公司bug管理系统相关）

```text
已经修复 #130,#134
```

## 关于前端文件依赖

```text
/** @angular */
包含@angular自带的依赖
/** Rxjs */
包含Rxjs依赖
/** Libraries */
不包含Rxjs，@angular依赖，第三方依赖ui组件模块，或其他功能模块
/** Dependencies */
包含项目内部公共依赖
/** Component */
包含本模块下，本组件下等私有依赖
```

## 关于后台文件依赖

```text
/** @nest */
包含@nest自带的依赖
/** Rxjs */
包含Rxjs依赖
/** Libraries */
不包含Rxjs，@nest依赖，第三方依赖中间件模块，或其他功能模块
/** Dependencies */
包含项目内部公共依赖
/** Component */
包含本模块下，本组件下等私有依赖
```

## 关于开发代理配置

proxy.conf.json

```json
"/api": {    // 后端的API前端
    "target": "http://localhost:5210/",    // web
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
}
```

> **注意**：target选其一即可

## 关于Git分支管理

根据每个特性都会开一个新的分支，每个分支都应该包含着描述性的名称，无论是一个人开发，还是多人协同，该特性的全部开发工作都在这个分支上进行。待该特性开发完成后， 并入主分支，然后删除分支，代码上线。

### Gitflow 工作流

基于Gitflow 的工作流方式， 这种工作流方式， 主要是管理着新功能开发，发布及维护等模式，根据不同类型的工作对分支进行定义， 分为 特性分支 ，修复分支，release 分支，开发分支 和 主分支。

分支说明：

1. 主分支：中心仓库建立后的默认 `master` 分支（当然使用其他分支也可以，但要保证该分支是受保护的）。主分支随时保持代码是稳定的，并且有明确的版本标签，后续代码回滚等操作都将从主分支进行。

2. 开发分支：中心仓库建立后，从 `master` 分支切出来 `develop`，此时与 `master` 分支保持一致。后续演进中，开发分支随时保持代码最新，但却不一定是线上实际运行的代码。

3. 修复分支， 用于对线上主分支代码的及时修复， 待修复完成后， 合并进入主分支， 再并入开发分支。 注意，修复分支只能从主分支`master`切出为`hotfix`，修复完成合并并删除。

4. 发版分支， 一般命名为 `release` 这个分支只能从开发分支切出，最后并入主分支。

工作流程：

1. 开发流程：每次开发都需要从master分支切出develop分支，在进行开发。
2. 紧急线上bug修复流程：从master分支切出hotfix分支，修复以后测试确认ok，合并到master分支和develop分支，并删除该分支
3. 发布流程，develop分支开发完成，合并到release分支，待测试确认，该版本发布以后，合并到master分支并打版本号