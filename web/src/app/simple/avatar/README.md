# Avatar 【头像模块】

## Component 【组件】

## AvatarComponent 【头像组件】

#### Selector(选择器)：[jui-avatar]

#### Bindings(属性绑定):
 
##### Inputs(输入属性绑定):
- avatarSrc 参数：字符串，默认""。图片地址
- avatarShapes 参数：字符串，默认circle。 形状 'circle' | 'square'
- avatarSize 参数：字符串，默认default。形状 'default' | 'large' | 'small' | 'string number'


```html
<a href="" jui-avatar [avatarSrc]="xxxx.jpg"></a>
<br>
<a href="" jui-avatar [avatarSrc]="xxxx.jpg" [avatarShapes]="'square'"></a>
<br>
<a href="" jui-avatar [avatarSrc]="xxxx.jpg" [avatarSize]="'large'"></a>
<br>
<a href="" jui-avatar [avatarSrc]="xxxx.jpg" [avatarSize]="'small'"></a>
<br>
<a href="" jui-avatar [avatarSrc]="xxxx.jpg" [avatarSize]="'50'"></a>
<br>
<span jui-avatar [avatarSrc]="xxxx.jpg" [avatarSize]="'50'"></span>
```