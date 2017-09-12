# web第一个组件设计之文章列表
文章列表在简书项目很多地方都用的，首页，文集，用户首页，喜欢文章，专题分类，搜索结果等。

## 文章列表功能分析
1. 点击加载更多按钮加载数据
2. 滚动加载数据
3. 首页有点击加载更多，大约200条左右数据，就不能再加载了。
4. 加载占位符效果
5. 数据分有图片和无图片2种显示效果
6. 列表无其他操作

## 组件化
1. article-list
2. article-item
3. article-placeholder
4. infinitescroll

### 列表（article-list） 
在列表里需要处理所有功能，但是他们所在位置不一样处理也不一样，就需要一个params，来管理不同数据。

例如首页，只需要查询最新20条加入首推的文章，首页有个加载更多按钮，这个需要特殊处理，就需要一个loadmore，来管理这个按钮存在与否

像文集，专题分类他们都有不同的参数，最新评论，最新添加等。

像搜索结果，又比较特殊，如果数据都加载封装都组件里，就会出问题，那么就需要在暴露一个request来设定请求地址，默认就是文章，如果写了搜索就用搜索。其他处理形式一样，就需要一个抽象服务来解决这个问题。只需要封装同样接口即可。

### 列表项（article-item） 
其实简书文章列表项，只是显示，没有其他交互功能。只是区分，有图片和无图片2种方式。通过一个class来区分。然后通过angular的*ngIf来处理

### 占位符（article-placeholder）
这个就更没得说的，就是css动画，angular来控制显示隐藏。

### 滚动指令 （infinitescroll）
这个指令来处理滚动加载数据。这是一个通用指令。

#### 分析滚动指令功能
1. 滚动加载，有两种形式一种Window，一种当前元素Element。他们处理方式不同。
2. 滚动到哪里开始出发加载下一次加载事件
3. 数据加载时候是否能触发滚动加载下次数据事件
4. scroll这个是在高频调用时，保证多少毫秒内只会被执行一次，还是会不断地触发，但是限制了频率。

#### 配置参数
1. scrollWindow 是否Window 默认true
2. scrollThrottle 限制频率时间 默认300毫秒
3. scrollUpDistance 滚动到顶部距离 默认1.5
4. scrollDistance 滚动到底部距离 默认1.5
5. scrollDisabled 是否可以触发事件 默认false
6. scrollContainer 滚动容器 默认无
6. scrollVertical 是否垂直滚动 默认true
7. onScrollDown 滚动底部事件
8. onScrollUp   滚动顶部事件

### 需要用到的技术知识
1. scroll 事件
2. scrollTop 当前滚动的位置
3. 获取容器宽高，内容宽高等
4. 计算滚动位置是否在顶部 scrollTop = 0
5. 计算滚动位置是否在底部 element.scrollTop + element.clientHeight >= element.scrollHeight