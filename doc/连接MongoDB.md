# 简介
MongoDB开源，高性能的NoSQL数据库；支持索引、集群、复制和故障转移、各种语言的驱动程序；高伸缩性；
- 最新版本：v3.4.2
- 官网地址：[http://www.mongodb.org/](http://www.mongodb.org/)
- API Docs：[http://docs.mongodb.org/manual/](http://docs.mongodb.org/manual/)
- mongodb的nodejs驱动: [GitHub地址](https://github.com/mongodb/node-mongodb-native)

# MongoDB安装(windows)
> 下载MongoDB并安装 [下载地址](http://www.mongodb.org/downloads)

## 创建数据库和日志存放目录
把MongoDB安装在E盘根目录下mongodb里, 进入mongodb，创建data，logs两个文件夹，分别存放数据库文件和日志文件

## 创建一个config文件
打开目录“E:\mongodb\”，并在此目录下新建一个mongo.config文件，文件内容如下
```
#数据库路径
dbpath=E:\mongodb\data
#日志输出文件路径
logpath=E:\mongodb\logs\mongodb.log
#错误日志采用追加模式
logappend=true
#启用日志文件，默认启用
journal=true
#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
quiet=true
#端口号 默认为27017
port=27017
#验证安全认证
auth=true
```
## 添加环境变量
在环境变量PATH中加入“E:\mongodb\bin“

## 以Windows服务器运行MongoDB
以管理员方式打开CMD窗口，运行如下命令安装MongoDB服务，可以在 “控制面板\所有控制面板项\管理工具\服务”找到名为“MongoDB”的服务右键启动
```
mongod --config "E:\mongodb\mongo.config"  --auth --install --serviceName "MongoDB"
```
## 启动服务
在CMD窗口中运行如下命令，也可以在可以在 “控制面板\所有控制面板项\管理工具\服务”
```
net start MongoDB
```
> 查看任务管理器，MongoDB会一直运行。
## 连接测试 mongo
```
MongoDB shell version v3.4.1
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.1
```
安装成功！
>　小提示：MongoDB默认端口是27017，可以修改！

## MongoDB认证
1. 启动后直接执行命令mongo
2. 进入存放管理员信息的数据库 use admin
3. 添加管理员 db.createUser({user:"root",pwd:"123456",roles:["root"]}) 
4. 进入任务管理器重启MongoDB服务
5. 再次进入存放管理员信息的数据库 use admin
6. 开始认证 db.auth("root","123456") 
7. 如果返回1表示认证通过，0表示失败 如果失败重新认证一遍

## 创建一个项目数据库(必须要创建一个数据库，不然没法玩耍)
1. 创建一个数据库： use jianshu
2. 在当前数据库上面： db.createUser({user:"jiayi",pwd:"123456",roles:["userAdmin"]})
3. 切换到 use admin
4. 认证 db.auth("jiayi","123456")
5. 如果返回1表示认证通过，0表示失败 如果失败重新认证一遍

## 连接Robomongo软件
1. [下载Robomongo](http://blog.robomongo.org/robomongo-0-9-0-final/)
2. 安装 一直下一步
3. 打开软件 file > connect
4. 创建 creat
5. 填写name > jianshu 
6. 切换到auth，Perform auth勾选
7. 填写认证的username > root, password > 123456
8. 点击左下角Test,如果验证成功就点save
9. jianshu后面就会出现一个锁的icon, 点击connect就完成了。

# bin文件中exe程序
- mongo.exe：客户端，支持js语法
- mongod.exe：服务端
- mongodump.exe：备份工具
- mongorestore.exe：恢复工具
- mongoexport.exe：导出工具
- mongoimport.exe：导入工具
- mongostat.exe：实时性能监控工具
- mongotop.exe：跟踪MongDB实例读写时间工具

# MongoDB基本语法和操作入门
## 库操作
### 新建数据库
1. 第一步：use 新建数据库名；
2. 第二步：进行此库相关的操作；
> 如果不进行第二步，该数据库不会被创建
### 查看数据库
show dbs
### 新建表
db.createCollection('要新建的表名')
### 查看当前数据库下表
show collections
### 删除当前数据库指定表
db.表名.drop()
### 删除当前数据库
db.dropDatabase()

> 说明
1. 默认为存在“admin”和“local”两个数据库；admin数据库是存放管理员信息的数据库，认证会用到；local是存放replication相关的数据；
2. find();是个查询操作，后面会讲到，上面用到主要是为了演示use不存在的库后，进行相关操作会创建出这个库；
3. MongoDB没有像MySQL或MSSQL等数据库这么严格的规定，不是非得要先建库、建表、建各种字段。

## 插入
### 方法一：db.表名.insert(数据)
1. 从上图操作可以看出，没有去创建“tb1”表，其实通过插入操作也会自动创建
2. _id，是mongodb自已生成的，每行数据都会存在，默认是ObjectId，可以在插入数据时插入这个键的值(支持mongodb支持的所有数据类型)　

### 方法二：db.表名.save(数据)
1. save也可达到insert一样的插入效果
2. _id可以自已插入
3. 一个表中不一定要字段都相同

> 那它们有什么区别?

虽然insert和save方法都可以插入数据，当默认的“_id”值已存在时，调用insert方法插入会报错；而save方法不会,会更新相同的_id所在行数据的信息。

## 查询
### 查询语句
```
查询表中所有数据：db.表名.find();
按条件查询（支持多条件）：db.表名.find(条件); 
查询第一条（支持条件）：db.表名.findOne(条件);
限制数量：db.表名.find().limit(数量);
跳过指定数量：db.表名.find().skip(数量);
查询数量：db.表名.find().count();
排序：db.表名.find().sort({"字段名":1});  1：表示升序  -1：表示降序
指定字段返回： db.表名.find({},{"字段名":0});　　1：返回  0：不返回　　　　　
```
### 比较查询
```
大于：$gt
小于：$lt
大于等于：$gte
小于等于：$lte
非等于：$ne
或者: $or
查询包含: $in
查询不包含: $nin
```

## 修改
> 前面save在_id字段已存在是就是修改操作，按指定条件修改语法如下

db.表名.update({"条件字段名":"字段值"},{$set:{"要修改的字段名":"修改后的字段值"}});

## 删除

db.表名.remove(条件);

## 存储过程
### 创建存储过程
```
db.system.js.save({_id:"存储过程ID", 
value:function(参数){  
        -- 逻辑主体; 
        return 返回; 
}});    
```
### 调用存储过程
```
db.eval("存储过程ID()");
```
> 所有存储过程都存放在db.system.js中

# 注意事项
1. 文章中“表”本应该描述为“collection(集合)”；“行”应该描述为“文档（document）”,一个database中可以有多个collection，一个collection中又可以有多个document
2. 用CMD中使用mongo.exe操作时，插入中文遇一了问题，原因是MongoDB默认编辑是utf-8，而CMD是GBK，所以在CMD窗口中执行这个命令修改编辑即可：chcp 65001
3. 注意mongodb严格区分大小写，比如查询 db.tb2.find({"name":"wilson0"})和 db.tb2.find({"Name":"wilson0"}) 并不是用的同一字段做的条件；
4. 推荐大家阅读《MongoDB权威指南》

# 连接数据库
## 安装mongoose
> npm install mongoose

## 使用mongoose
```
import * as mongoose from 'mongoose';
mongoose.connect(`mongodb://${config.user}:${config.psw}@${config.host}:${config.dbport}/${config.dbs}`);
let db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});
db.once('open', function (callback) {
    console.log('数据库启动了')
});

${config.user}  连接数据库的管理员账号  jiayi
${config.psw}  连接数据库的管理员密码   123456
${config.host} 连接数据库的地址  本地默认是localhost
${config.dbport} 连接数据库的端口  本地默认是27017
${config.dbs} 连接数据库的名称 本次项目是jianshu
```
如果控制台出现'数据库启动了'，就表示node已经连接上了MongoDB。
