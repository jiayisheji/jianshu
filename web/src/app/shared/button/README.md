# Button 【按钮】

## Component 【组件】

## ButtonComponent 【按钮组件】

#### Selector(选择器)：[jui-button]

#### Bindings(属性绑定):
 
##### Inputs(输入属性绑定):
- color 参数：字符串，默认default。颜色 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'link' | 'info'
- size 参数：字符串，默认default。 尺寸 'default' | 'lg' | 'md' | 'sm' | 'xs'
- shape 参数：字符串，默认default。形状 'default' | 'outline' | 'dashed' | 'pill'

## Directives 【指令】
### ButtonBlockDirective 【块级按钮】

#### Selector(选择器)：[juiButtonBlock],[jui-button-block]

### ButtonPillDirective 【胶囊按钮】

#### Selector(选择器)：[juiButtonPill],[jui-button-pill]

```html
<h2>color</h2>
<div>
    <button jui-button>default</button>
    <button jui-button [color]="'primary'">primary</button>
    <button jui-button [color]="'secondary'">secondary</button>
    <button jui-button [color]="'success'">success</button>
    <button jui-button [color]="'danger'">danger</button>
    <button jui-button [color]="'warning'">warning</button>
    <button jui-button [color]="'info'">info</button>
    <button jui-button [color]="'link'">link</button>
</div>
<br />
<h2>size</h2>
<div>
    <button jui-button [color]="'primary'" [size]="'lg'">大按钮</button>
    <button jui-button [color]="'info'">default|中等按钮</button>
    <button jui-button [color]="'danger'" [size]="'sm'">小按钮</button>
    <button jui-button [color]="'warning'" [size]="'xs'">超小按钮</button>
</div>
<br />
<h2>shape</h2>
<h3>default</h3>
<div>
    <button jui-button>default</button>
    <button jui-button [color]="'primary'">primary</button>
    <button jui-button [color]="'secondary'">secondary</button>
    <button jui-button [color]="'success'">success</button>
    <button jui-button [color]="'danger'">danger</button>
    <button jui-button [color]="'warning'">warning</button>
    <button jui-button [color]="'info'">info</button>
</div>
<br />
<h3>outline</h3>
<div>
    <button jui-button [shape]="'outline'">default</button>
    <button jui-button [color]="'primary'" [shape]="'outline'">primary</button>
    <button jui-button [color]="'secondary'" [shape]="'outline'">secondary</button>
    <button jui-button [color]="'success'" [shape]="'outline'">success</button>
    <button jui-button [color]="'danger'" [shape]="'outline'">danger</button>
    <button jui-button [color]="'warning'" [shape]="'outline'">warning</button>
    <button jui-button [color]="'info'" [shape]="'outline'">info</button>
</div>
<br />
<h3>dashed</h3>
<div>
    <button jui-button [shape]="'dashed'">default</button>
    <button jui-button [color]="'primary'" [shape]="'dashed'">primary</button>
    <button jui-button [color]="'secondary'" [shape]="'dashed'">secondary</button>
    <button jui-button [color]="'success'" [shape]="'dashed'">success</button>
    <button jui-button [color]="'danger'" [shape]="'dashed'">danger</button>
    <button jui-button [color]="'warning'" [shape]="'dashed'">warning</button>
    <button jui-button [color]="'info'" [shape]="'dashed'">info</button>
</div>
<br />
<h2>pill</h2>
<div>
    <button jui-button jui-button-pill>default</button>
    <button jui-button [color]="'primary'" jui-button-pill [shape]="'outline'">primary</button>
    <button jui-button [color]="'secondary'" jui-button-pill [shape]="'dashed'">secondary</button>
    <button jui-button [color]="'success'" jui-button-pill>success</button>
    <button jui-button [color]="'danger'" jui-button-pill>danger</button>
    <button jui-button [color]="'warning'" jui-button-pill>warning</button>
    <button jui-button [color]="'info'" jui-button-pill>info</button>
</div>
<br />
<h2>block</h2>
<div>
    <button jui-button [color]="'primary'" jui-button-block>primary block</button>
</div>
<br />
```