## 核心概念

### react 是什么？

React 是一个声明式，高效且灵活的用于构建用户界面的JavaScript库。

### hello world

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React</title>
</head>
<body>
<!--
1. 添加一个 DOM 容器到 HTML
2. 添加 Script 标签
-->
<div id="app"></div>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin></script>
<script type="text/babel">
    const renderElement = React.createElement;

    class Btn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                liked: false
            }
        }

        render() {
            if (this.state.liked) {
                return "You like this"
            }
            // return renderElement(
            //     'button',
            //     {onClick:()=>this.setState({liked: true})},
            //     '按钮'
            // )
            /**
             *  jsx 写法
             */
            return (
                    <button onClick={() => this.setState({liked: true})}>
                        Like
                    </button>
            );
        }
    }

    const root = document.querySelector("#app");
    const app = ReactDOM.createRoot(root);
    app.render(renderElement(Btn));
</script>
</body>
</html>
```

### jsx简介

```javascript
const element = <h1>hello world!</h1>;
//它被称为jsx，是一个JavaScript的语法扩展。JSX 可以很好地描述 UI 应该呈现出
//它应有交互的本质形式。JSX 可能会使人联想到模板语言，但它具有 JavaScript 的全部功能。
```

#### 为什么使用jsx?

> React 认为渲染逻辑本质上与其他UI逻辑内在耦合，比如，在UI中需要绑定处理事件，在
> 某些时刻状态发生变化时需要到UI,以及需要在UI中展示准备好的数据。

> React 并没有采用将`标记`与`逻辑`分离到不同文件这种人为的分离方式，而是通过
> 将二者共同存放在称之为“组件”的松散耦合单元之中，来实现关注点分离。

> React 不强制要求使用 JSX，但是大多数人发现，在 JavaScript 代码中
> 将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示
> 更多有用的错误和警告消息。

#### 在jsx中嵌入表达式

`{}`内可放置任何有效的`JavaScript`表达式

```javascript
const name = "react";
const element = <h1>hello {name}</h1>;
```

```jsx
function formatName(user) {
    return user.firstName + user.lastName;
}

const user = {
    firstName: "foo",
    lastName: "bar"
}
const element = (
    <h1>
        hello, {formatName(user)}
    </h1>
);
```

#### jsx也是一个表达式

在编译之后，jsx表达式会转为普通的JavaScript函数调用，并且对其取值后得到JavaScript对象。

也就是说，可以在`if`语句和`for`循环的代码中使用jsx,将jsx赋值给变量，把jsx当作参数传入，以及从函数中返回jsx.

```jsx
function greeting(user){
    if(user){
        return (<h1>hello,{formatName(user)}</h1>)
    }
    return <h1>hello , stranger.</h1>
}
```

#### jsx中指定属性

使用引号，来将属性值指定为字符串字面量
```jsx
const element  = <a href='https://www.reactjs.org'>Link</a>;
```

也可以使用大括号，来在属性值中插入一个JavaScript表达式
```jsx
const element = <img src={user.avatarUrl}><img/>
```

在属性中嵌入JavaScript表达式时，不需要在大括号外面加上引号。你应该使用引号(对于字符串值)
或大括号(对于表达式)中的一个，对同一属性不能同时使用这两种符号。

> 因为jsx语法上更接近JavaScript而不是HTML,所以ReactDOM使用使用cameCase来定义属性的名称
> 而不是使用html属性名称的命名约定。

#### 使用jsx指定子元素

假如一个标签里没有内容，可以使用`/>`来闭合标签，就像xml语法一样
```jsx
const el = <img src={user.avatarUrl}/>
```
jsx标签里能够包含很多子元素
```jsx
const el = (
    <div>
        <h1>hello</h1>
        <h2>good to see you here.</h2>
    </div>
)
```

#### jsx防止注入攻击
```jsx
const title = response.title;
const el = <h1>{title}</h1>;
```

ReactDOM在渲染所有输入内容之前，默认会进行`转义`.它可以确保在你的应用中，永远不会
注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效
地防止`XSS(cross-site-scripting,跨站脚本)`攻击。

#### jsx表示对象
`Babel`会把jsx转义成一个名为`React.createElement()`函数调用。

```jsx
const el = (
    <h1 className="greeting">hello,world!</h1>
);
```
等效于
```jsx
const el = React.createElement(
    "h1",
    {className:"greeting"},
    "hello world!"
)
```
React.createElement()会预先执行一些检查，以帮助你编写无错误的代码，但实际上它创建了这样的对象：

```jsx
const el ={
    type:"h1",
    props:{
        className:"greeting",
        children:"hello wolrd!"
    }
}
```
这些对象被称为`React元素`。他们描述了你希望在屏幕上看到的内容。React通过读取这些对象
然后使用他们来构建Dom以及保持随时更新。

### 元素渲染

#### 将一个元素渲染为DOM

```html
<!--根节点-->
<div id="root"></div>
```

仅使用React构建的应用通常 只有一个根DOM节点。如果将React集成进一个已有的应用，那么你可以在应用中包含人一多的独立根DOM节点。

```jsx
const root = ReactDOM.createRoot(
    document.getElementById('root')
)
const el = <h1>hello,world!</h1>
root.render(element);
```

#### 更新已渲染的元素

React元素是不可改变对象。一旦被创建，你就无法更改它的子元素或者属性。它代表了某个特定时刻的UI.根据已有的知识，更新ui唯一的方式是创建一个全新的元素，并
将其传入`root.render()`

