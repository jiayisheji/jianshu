# 简书爬虫
> 主要爬一些文章列表和详情，会员列表和详情等相关一部分数据采集。

## 主要用到技术栈
- superagent 页面数据下载
- cheerio  页面数据解析
- node-schedule 定时任务
- async/eventproxy 并发控制

## [superagent](http://visionmedia.github.io/superagent/) 页面数据下载
> superagent是nodejs里一个非常方便的客户端请求代码模块，superagent是一个轻量级的，渐进式的ajax API，可读性好，学习曲线低，内部依赖nodejs原生的请求API,适用于nodejs环境下。

安装：
```
npm install superagent --save
```

### 请求方式
- get (默认)
- post
- put
- delete
- head

> 语法：request(RequestType, RequestUrl).end(callback(**err**, **res**));

写法：
```
request
    .get('/login')
    .end(function(err, res){
        // code
    });
```

### 设置Content-Type
- application/json (默认)
- form
- json
- png
- xml
- ...

设置方式：
```
1. 
request
    .get('/login')
    .set('Content-Type', 'application/json');
2. 
request
    .get('/login')
    .type('application/json');
3. 
request
    .get('/login')
    .accept('application/json');
```
以上三种方效果一样。

### 设置参数
- query
- send

#### query
设置请求参数，可以写json对象或者字符串形式。
##### json对象{key,value}
可以写多组key,value

```

request
    .get('/login')
    .query({
        username: 'jiayi',
        password: '123456'
    });

```
##### 字符串形式key=value
可以写多组key=value，需要用&隔开

```

request
    .get('/login')
    .query('username=jiayi&password=123456');

```

#### sned
设置请求参数，可以写json对象或者字符串形式。
##### json对象{key,value}
可以写多组key,value

```

request
    .get('/login')
    .sned({
        username: 'jiayi',
        password: '123456'
    });

```
##### 字符串形式key=value
可以写多组key=value，需要用&隔开

```

request
    .get('/login')
    .sned('username=jiayi&password=123456');

```

上面两种方式可以使用在一起
```

request
    .get('/login')
    .query({
        id: '100'
    })
    .sned({
          username: 'jiayi',
          password: '123456'
      });

```

### 响应属性Response
#### Response text
Response.text包含未解析前的响应内容，一般只在mime类型能够匹配text/json、x-www-form-urlencoding的情况下，默认为nodejs客户端提供，这是为了节省内存，因为当响应以文件或者图片大内容的情况下影响性能。

#### Response header fields
Response.header包含解析之后的响应头数据，键值都是node处理成小写字母形式，比如res.header('content-length')。

#### Response Content-Type
Content-Type响应头字段是一个特列，服务器提供res.type来访问它，默认res.charset是空的，如果有的化，则自动填充，例如Content-Type值为text/html;charset=utf8，则res.type为text/html；res.charset为utf8。

#### Response status

http响应


## [cheerio](https://cheerio.js.org/)  页面数据解析
cheerio是一个node的库，可以理解为一个Node.js版本的jquery，用来从网页中以 css selector取数据，使用方式和jquery基本相同。
安装：
```
npm install cheerio --save
```

- 相似的语法:Cheerio 包括了 jQuery 核心的子集。Cheerio 从jQuery库中去除了所有 DOM不一致性和浏览器尴尬的部分，揭示了它真正优雅的API。
- 闪电般的块:Cheerio 工作在一个非常简单，一致的DOM模型之上。解析，操作，呈送都变得难以置信的高效。基础的端到端的基准测试显示Cheerio 大约比JSDOM快八倍(8x)。
- 巨灵活: Cheerio 封装了兼容的htmlparser。Cheerio 几乎能够解析任何的 HTML 和 XML document。

需要先loading一个需要加载html文档，后面就可以jQuery一样使用操作页面了。
```
const cheerio = require('cheerio');
const $ = cheerio.load('<ul id="fruits">...</ul>');
$('#fruits').addClass('newClass');
```
基本所有选择器基本和jQuery一样，就不一一列举。具体怎么使用看[官网](https://cheerio.js.org/)。

### 安利一个简书首页文章列表

#### 安装依赖superagent和cheerio并引入
```
const superagent = require('superagent');
const cheerio = require('cheerio');
```

#### 定义一个地址

```
const reptileUrl = "http://www.jianshu.com/";
```

#### 发起请求

```
superagent.get(reptileUrl).end(function (err, res) {
    // 抛错拦截
     if(err){
         return err;
     }
});
```
#### 页面数据解析 

```
superagent.get(reptileUrl).end(function (err, res) {
   /**
   * res.text 包含未解析前的响应内容
   * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
   */
   let $ = cheerio.load(res.text);
});
```

#### 分析页面数据 

首页文章列表在id是list-container的div里面的ul里，初次加载有20条数据。够我们使用。

```
/**
* 存放数据容器
* @type {Array}
*/
let data = [];
// 下面就是和jQuery一样获取元素，遍历，组装我们需要数据，添加到数组里面
$('#list-container .note-list li').each(function(i, elem) {
    let _this = $(elem);
    data.push({
       id: _this.attr('data-note-id'),
       slug: _this.find('.title').attr('href').replace(/\/p\//, ""),
       author: {
           slug: _this.find('.avatar').attr('href').replace(/\/u\//, ""),
           avatar: _this.find('.avatar img').attr('src'),
           nickname: replaceText(_this.find('.blue-link').text()),
           sharedTime: _this.find('.time').attr('data-shared-at')
       },
       title: replaceText(_this.find('.title').text()),
       abstract: replaceText(_this.find('.abstract').text()),
       thumbnails: _this.find('.wrap-img img').attr('src'),
       collection_tag: replaceText(_this.find('.collection-tag').text()),
       reads_count: replaceText(_this.find('.ic-list-read').parent().text()) * 1,
       comments_count: replaceText(_this.find('.ic-list-comments').parent().text()) * 1,
       likes_count: replaceText(_this.find('.ic-list-like').parent().text()) * 1
   });
});
// 因为text获取的有空格和换行符我们需要替换掉
function replaceText(text){
    return text.replace(/\n/g, "").replace(/\s/g, "");
}
// 在控制台就可以看到我们想要数据了
console.log(data);

```
#### 生成数据
我们数据可以在控制台打印了，但是这个和我们压根没有关系，还是没有取到数据，需要拿出来使用，可以存到数据库，我现在还没有建数据，那么可以导出城json格式。

生成文件需要用到nodejs内置模块fs。
直接引入
```
const fs = require('fs');


console.log(data);
// 写入数据, 文件不存在会自动创建
fs.writeFile(__dirname + '/data/article.json', JSON.stringify({
    status: 0,
    data: data
}), function (err) {
    if (err) throw err;
    console.log('写入完成');
});


fs.writeFile(filename,data,[options],callback); 创建并写入文件
/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag 默认‘2’,mode(权限) 默认‘0o666’,encoding 默认‘utf8’
 * callback  回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
 */
```
> 注意事项
1. 默认utf-8编码;
2. 写json文件一定要JSON.stringify()处理，不然就是[object Object]这货了。
3. 如果是文件名可以直接article.json会自动生成到当前项目根目录里，如果要放到某个文件里，例如data，一定要加上__dirname + '/data/article.json'。千万不能写成3. 如果是文件名可以直接article.json会自动生成到当前项目根目录里，如果要放到某个文件里，例如data，一定要加上__dirname + '/data/article.json'。千万不能写成'/data/article.json'不然就会抛错，找不到文件夹，因为文件夹在你所在的项目的盘符里。例如G:/data/article.json。

 
### 安利一个简书文章详情

我们已经获取文字列表，那么我们可以通过获取列表的里面的id来获取详情。

详情的url 是http://www.jianshu.com/p/:id

#### 封装一个方法 getArticle(item) 接受一个列表项

它里面做什么，就是把获取文章列表的干的事在干一遍。

```
function getArticle(item) {
    superagent.get(reptileUrl + '/p/' + item.id).end(function (err, res) {
        // 抛错拦截
        if (err) {
            return err;
        }
        let $ = cheerio.load(res.text);
        /**
         * 存放数据容器
         * @type {Array}
         */
        let data = {};
        // code
    });
}
```

#### 分析页面数据 

分析页面数据，找出为我们使用的地方，拼装成json数据。

页面上所有内容都存在class是note的div里面的class是post的div里

.post容器里面又分几部分。
- article 文章相关的（标题，作者信息，正文，文章分类）
- follow-detail  关注作者
- support-author  打赏，我不需要
- meta-bottom  点赞，分享
- comment-list 评论列表
  
还有一个被哪些专题收录
.note-bottom 它和.note平级的，我们开始拼装数据。

> 注意，默认有几个api请求，专题收录， 评论列表， 分享数据，这些需要去想办法调用这些api，不要去页面获取相应数据了。

还有几个需要注意的，你在浏览器打开页面，会发现有几个数据是页面加载完成后加载的，这个是用js来渲染的，你可能会奇怪，网络请求里面没有这个js，这个数据是从哪里的，这个数据存在data-name="page-data"的script标签里面
你拿到这个内容以后，需要将里面的数据处理一下，看数据刚好是严格json格式可以用JSON.parse来转换成json供后续操作。

```
let $ = cheerio.load(res.text);
let $post = $('div.post');
let note = JSON.parse($('script[data-name=page-data]').text());
/**
 * 存放数据容器
 * @type {Array}
 */
let data = {
    article: {
        id: note.note.id,
        slug: note.note.slug,
        title: replaceText($post.find('.article .title').text()),
        content: replaceText($post.find('.article .show-content').html()),
        publishTime: $post.find('.article .publish-time').html(),
        wordage: $post.find('.article .wordage').text().match(/\d+/g)[0]*1,
        views_count: note.note.views_count,
        comments_count: note.note.comments_count,
        likes_count: note.note.likes_count
    },
    author: {
        id: note.note.user_id,
        slug: $post.find('.avatar').attr('href').replace(/\/u\//, ""),
        avatar: $post.find('.avatar img').attr('src'),
        nickname: replaceText($post.find('.author .name a').text()),
        signature: replaceText($post.find('.signature').text()),
        total_wordage: note.note.author.total_wordage,
        followers_count: note.note.author.followers_count,
        total_likes_count: note.note.author.total_likes_count
    }
};

```

#### 生成数据
我们要把数据取出来，这次就不是一个文件名了，需要加上请求文章的slug值，这样就不会重名，在取的时候就可以直接通过slug来取，就方便多了

生成文件需要用到nodejs内置模块fs
直接引入
```
// 写入数据, 文件不存在会自动创建
fs.writeFile(__dirname + '/data/article_' + item.slug + '.json', JSON.stringify({
    status: 0,
    data: data
}), function (err) {
    if (err) throw err;
    console.log('写入完成');
});
```