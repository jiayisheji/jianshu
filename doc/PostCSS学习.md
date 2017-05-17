# PostCSS介绍
> “PostCSS is a tool for transforming CSS with JS plugins. These plugins can support variables and mixins, transpile future CSS syntax, inline images, and more.

上面是来自于PostCSS自身项目在[github](https://github.com/postcss)上的描述。

简而言之，PostCSS是CSS变成JavaScript的数据，使它变成可操作。PostCSS是基于JavaScript插件，然后执行代码操作。PostCSS自身并不会改变CSS，它只是一种插件，为执行任何的转变铺平道路。

本质上是没有很制PostCSS插件操纵CSS，也就是说它可以适用于任何CSS。只要你能想到的，你都可以编写一个PostCSS插件，让它来转成CSS。

PostCSS插件可以像预处理器，它们可以优化和autoprefix代码；可以添加未来语法；可以添加变量和逻辑；可以提供完整的网格系统；可以提供编码的快捷方式......还有很多很多。

PostCSS不是预处理器, 可以继续使用你最喜欢的预处理器，并且能结合PostCSS一起使用。

PostCSS不是后处理器，后处理器通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效，常做的一件事情就是给CSS属性添加浏览器私有前缀。然而，PostCSS并不局限于这种操作。正如上面提到的，它可以像一个预处理器。

PostCSS不是未来的新语法，有一些优秀的PostCSS插件允许你写未来的语法，即使这些CSS语法尚未得到广泛支持。然而PostCSS并不是天生下来就支持未来语法。有一些开发人员表示不愿意使用PostCSS就是这个原因之一，因为他们不知道如何让自己适应去写未来的CSS。然而，写未来的语法只不过是利用PostCSS之一。

你需要知道的第一件事情就是PostCSS速度很快，这并没有充分理由，所以现在是时候该清晰的理解它，并帮助你如何在开发过程中使用PostCSS。

## PostCSS不是什么
- 尽管表面上它看起来是一个预处理器，其实它不是一个预处理器
- 尽管表面上它看起来是一个后处理器，其实它也不是一个后处理器
- 尽管它可以促进、支持未来的语法，其实它不是未来语法
- 尽管它可以提供清理、优化代码这样的功能，其实它不是清理、优化代码的工具
- 它不是任何一件事情，这也意味者它潜力无限，你可以根据自己的需要配置你需要的功能
## PostCSS特别之处
- 多样化的功能插件，创建了一个生态的插件系统
- 根据你需要的特性进行模块化
- 快速编译
- 创建自己的插件，且具可访问性
- 可以像普通的CSS一样使用它
- 不依赖于任何预处理器就具备创建一个库的能力
- 可以与许多流行工具构建无缝部署
## 常用功能
1. 引入部分（partial imports）
2. 变量（variables）
3. 嵌套（nesting）
4. 混合宏（mixins）
5. 扩展（extend）
6. 占位符（placeholder classes）
7. 颜色函数（darken and rgba color functions）
8. 压缩（compression）
## 准备工作
我们写scss，less等其他预编译的css时，都是以该文件后缀来书写，postcss是以.css结尾。
> 我们需要安装nodejs，使用[PostCSS CLI](https://github.com/postcss/postcss-cli)来编译目前浏览器支持的css。
### 核心插件
[cssnext](//cssnext.io/)是PostCSS一个插件，把CSS未来特性编译成现在CSS语法特性。特别需要注意的是，这个插件和Sass和LESS都不一样。它提供的特性是CSS正在进行的规范（或者未来CSS将会具备的语法特性）。而且有一些特性已经得到了浏览器的支持。
可以使用cssnext来处理Sass不具备的一些特性。自带浏览器私有前缀cssnext包括了Autoprefixer插件

### 1. 引入部分（partial imports）
其他的预编译都有一个@import引入，就可以编译。postscss需要安装一个插件[postcss-import](//github.com/postcss/postcss-import#postcss-import)才能实现该功能

### 2. 变量（variables）
postcss变量需要定义:root里面，栗子如下：
```
:root { 
  --white: #fff; 
  --grey: #1e1e1d; 
  --yellow: #ffad15; 
  --offwhite: #f8f8f8; 
  ... 
}
```
那么如何变量，需要用到var，栗子如下：
```
a { 
  color: var(--yellow);
}
```

### 3. 嵌套（nesting）
在引入CSS预处理器时，嵌套是不可或缺的。一个比较舒适的样式设置。对于在处理器中的嵌套规范，我们该如何使用：

```
.projects-list { 
    ... 
    & li { 
        & > div {
        ...
            
        } 
        
    } 
    & a { 
        ... 
        &:hover, &:focus {
            ...
            
        } 
        &::after {
            ...
            
        } 
        
    } 
    @media (min-width: 640px) {
        ...
        
    } 
}
```
基本的嵌套需要一个前置的&。伪类和选择器在Sass和CSS中使用是相同的。对于媒体查询嵌套，不需要前置的&。

同样值得一提的是@nest。在文档中提到，复杂的嵌套需要@nest替代&。

### 4. 混合宏（mixins）
postcss并没有一个在项目中类似其他预编译混合宏，可以简写样式代码。

不过可以用CSS一个特性，那就是:matches选择器来模拟。
模拟混合宏：
```
.p-jribbble, .p-jribbble a:matches(:hover, :focus) { 
    background-color: var(--color-jrb); 
    & i { 
        color: var(--color-jrb); 
        
    } 
}
```
编译后结果：

```
.p-jribbble, .p-jribbble a:hover, .p-jribbble a:focus { 
    background-color: #ff0066 
    
} 
.p-jribbble a, .p-jribbble a:hover i, .p-jribbble a:focus i { 
    color: #ff0066; 
}
```


### 5. 扩展（extend）和 6. 占位符（placeholder classes）
在其他预编译中有在Sass中使用@extend和%placeholder是非常常见的。
@apply允许你在选择器中引用一组已存储样式。我们可以使用@apply规则来替代Sass中的@extend规则。
看个栗子：

```
:root { 
    ... --franklin: { 
        font-family: 'futura-pt', helvetica, sans-serif; 
        
    }; 
    --franklin-heading: { 
        @apply --franklin; 
        font-weight: 700; 
        line-height: 1.1; 
        text-transform: uppercase; 
    }; 
}
```
使用它：
```
.my-heading { 
    @apply --franklin-heading; 
}
```
@apply不是@extend。在cssnext中，@apply可以复制每个属性的规则和值。这是一个小项目，所以用不用都没关系。在大型项目中要是有一些额外的属性，就可能导致样式的冗余，文件过度膨胀。最好的方多使用一个通用的类名来设置相似的样式。


### 7. 颜色函数（darken and rgba color functions）
我们不光可以定义变量还可以支持[W3C CSS color function](https://github.com/postcss/postcss-color-function#list-of-color-adjuster)，不过需要先引入, 具体写法可以参照

```
background-color: color(#d32c3f shade(40%) alpha(80%));
```
编译后的栗子：
```
background-color: rgba(127, 26, 38, 0.8);
```
