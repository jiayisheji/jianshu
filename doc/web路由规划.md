# web页面和路由规划
## web页面
> 我们先列列出需要哪些页面

简书类似一个博客系统。根据用户定位有读者，有作者，有游客。 但是实际只有两类用户和游客。因为用户即使读者也是作者。
那么既然有用户就要有用户一套相关的东西。例如，登录，注册，找回密码，用户中心。这是一个基本的套路。凡是有用户的差不多都有这几样的，用户中心就复杂了，日后再说。

### 我先列游客所见的页面：

登录，注册，找回密码（简书是分了4个功能来处理这个，我这里就简单点了，直接手机号找回。）

首页，app下载页，搜索结果展示列表页面

文集/专题列表页，新上榜，7日热门，30日热门，简书出版

文章详情

用户首页

### 用户中心管理相关页面：

基本设置，个人资料，微博认证，黑名单，赞赏设置（不涉及支付，这个功能去掉），账号管理，喜欢文章/关注专题和文集，收藏的文章

还一个终于功能，写文章页面

### 其他页面：

帮助与反馈，关于简书

基本就以上的功能，如果还未有看到以后再添加

## web路由规划

 login             登录
 register          注册
 forget            找回密码
 home              首页
 article/:id       文章详情
 apps              app下载
 search            搜索结果展示列表页面
 theme/:id         专题列表页 
 recommend         新上榜
 trending/weekly   7日热门
 trending/monthly  30日热门
 publications      简书出版
 user/:id          用户首页
 bookmarks         收藏的文章
 user/:id/likedNotes   喜欢文章/关注专题和文集
 settings/basic    基本设置
 settings/profile  个人资料
 settings/weiboAuth    微博认证
 settings/blacklist    黑名单
 settings/misc     账号管理
 help              帮助与反馈
 contact           关于简书
