## 核心概念

### react 是什么？

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。

### hello world

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React</title>
  </head>
  <body>
    <!--
1. 添加一个 DOM 容器到 HTML
2. 添加 Script 标签
-->
    <div id="app"></div>
    <script
      src="https://unpkg.com/react@18/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/babel-standalone@6/babel.min.js"
      crossorigin
    ></script>
    <script type="text/babel">
      const renderElement = React.createElement;

      class Btn extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            liked: false,
          };
        }

        render() {
          if (this.state.liked) {
            return 'You like this';
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
            <button onClick={() => this.setState({ liked: true })}>Like</button>
          );
        }
      }

      const root = document.querySelector('#app');
      const app = ReactDOM.createRoot(root);
      app.render(renderElement(Btn));
    </script>
  </body>
</html>
```

### jsx 简介

```javascript
const element = <h1>hello world!</h1>;
//它被称为jsx，是一个JavaScript的语法扩展。JSX 可以很好地描述 UI 应该呈现出
//它应有交互的本质形式。JSX 可能会使人联想到模板语言，但它具有 JavaScript 的全部功能。
```

#### 为什么使用 jsx?

> React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件，在
> 某些时刻状态发生变化时需要到 UI,以及需要在 UI 中展示准备好的数据。

> React 并没有采用将`标记`与`逻辑`分离到不同文件这种人为的分离方式，而是通过
> 将二者共同存放在称之为“组件”的松散耦合单元之中，来实现关注点分离。

> React 不强制要求使用 JSX，但是大多数人发现，在 JavaScript 代码中
> 将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示
> 更多有用的错误和警告消息。

#### 在 jsx 中嵌入表达式

`{}`内可放置任何有效的`JavaScript`表达式

```javascript
const name = 'react';
const element = <h1>hello {name}</h1>;
```

```jsx
function formatName(user) {
  return user.firstName + user.lastName;
}

const user = {
  firstName: 'foo',
  lastName: 'bar',
};
const element = <h1>hello, {formatName(user)}</h1>;
```

#### jsx 也是一个表达式

在编译之后，jsx 表达式会转为普通的 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

也就是说，可以在`if`语句和`for`循环的代码中使用 jsx,将 jsx 赋值给变量，把 jsx 当作参数传入，以及从函数中返回 jsx.

```jsx
function greeting(user) {
  if (user) {
    return <h1>hello,{formatName(user)}</h1>;
  }
  return <h1>hello , stranger.</h1>;
}
```

#### jsx 中指定属性

使用引号，来将属性值指定为字符串字面量

```jsx
const element = <a href="https://www.reactjs.org">Link</a>;
```

也可以使用大括号，来在属性值中插入一个 JavaScript 表达式

```jsx
const element = <img src={user.avatarUrl}><img/>
```

在属性中嵌入 JavaScript 表达式时，不需要在大括号外面加上引号。你应该使用引号(对于字符串值)
或大括号(对于表达式)中的一个，对同一属性不能同时使用这两种符号。

> 因为 jsx 语法上更接近 JavaScript 而不是 HTML,所以 ReactDOM 使用使用 cameCase 来定义属性的名称
> 而不是使用 html 属性名称的命名约定。

#### 使用 jsx 指定子元素

假如一个标签里没有内容，可以使用`/>`来闭合标签，就像 xml 语法一样

```jsx
const el = <img src={user.avatarUrl} />;
```

jsx 标签里能够包含很多子元素

```jsx
const el = (
  <div>
    <h1>hello</h1>
    <h2>good to see you here.</h2>
  </div>
);
```

#### jsx 防止注入攻击

```jsx
const title = response.title;
const el = <h1>{title}</h1>;
```

ReactDOM 在渲染所有输入内容之前，默认会进行`转义`.它可以确保在你的应用中，永远不会
注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效
地防止`XSS(cross-site-scripting,跨站脚本)`攻击。

#### jsx 表示对象

`Babel`会把 jsx 转义成一个名为`React.createElement()`函数调用。

```jsx
const el = <h1 className="greeting">hello,world!</h1>;
```

等效于

```jsx
const el = React.createElement('h1', { className: 'greeting' }, 'hello world!');
```

React.createElement()会预先执行一些检查，以帮助你编写无错误的代码，但实际上它创建了这样的对象：

```jsx
const el = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'hello wolrd!',
  },
};
```

这些对象被称为`React元素`。他们描述了你希望在屏幕上看到的内容。React 通过读取这些对象
然后使用他们来构建 Dom 以及保持随时更新。

### 元素渲染

#### 将一个元素渲染为 DOM

```html
<!--根节点-->
<div id="root"></div>
```

仅使用 React 构建的应用通常 只有一个根 DOM 节点。如果将 React 集成进一个已有的应用，那么你可以在应用中包含人一多的独立根 DOM 节点。

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
const el = <h1>hello,world!</h1>;
root.render(element);
```

#### 更新已渲染的元素

React 元素是不可改变对象。一旦被创建，你就无法更改它的子元素或者属性。它代表了某个特定时刻的 UI.根据已有的知识，更新 ui 唯一的方式是创建一个全新的元素，并
将其传入`root.render()`

### 列表渲染

1. 如何设定 key 值
   不同来源的数据往往对应不同的 key 值获取方式：

   来自数据库的数据： 如果你的数据是从数据库中获取的，那 你可以直接使用数据表中的主键，因为它们天然具有唯一 性。

   本地产生数据： 如果你数据的产生和保存都在本地（例如笔 记软件里的笔记），那么你可以使用一个自增计数器或者一 个类似 uuid 的库来生成 key。

2. key 需要满足的条件

   key 值在兄弟节点之间必须是唯一的。 不过不要求全局唯一，在不同的数组中可以使用相同的 key。

   key 值不能改变，否则就失去了使用 key 的意义！所以千万不要在渲染时动态地生成 key。

3. React 中为什么需要 key？

你可能会想直接把数组项的索引当作 key 值来用，实际上，如果你没有显式地指定 key 值，React 确实默认会这么做。但是数组项的顺序在插入、删除或者重新排序等操作中会发生改变，此时把索引顺序用作 key 值会产生一些微妙且令人困惑的 bug。

与之类似，请不要在运行过程中动态地产生 key，像是 key={Math.random()} 这种方式。这会导致每次重新渲染后的 key 值都不一样，从而使得所有的组件和 DOM 元素每次都要重新创建。这不仅会造成运行变慢的问题，更有可能导致用户输入的丢失。所以，使用能从给定数据中稳定取得的值才是明智的选择。

有一点需要注意，组件不会把 key 当作 props 的一部分。Key 的存在只对 React 本身起到提示作用。如果你的组件需要一个 ID，那么请把它作为一个单独的 prop 传给组件： <Profile key={id} userId={id} />。

### 思想

React 便围绕着这个概念进行设计。React 假设你编写的所有组件都是纯函数。也就是说，对于相同的输入，你所编写的 React 组件必须总是返回相同的 JSX。

你可以把你的组件当作食谱：如果你遵循它们，并且在烹饪过程中不引入新食材，你每次都会得到相同的菜肴。那这道 “菜肴” 就是组件用于 React 渲染 的 JSX。

### 副作用：（不符合）预期的后果

React 的渲染过程必须自始至终是纯粹的。组件应该只 返回 它们的 JSX，而不 改变 在渲染前，就已存在的任何对象或变量 — 这将会使它们变得不纯粹！

一般来说，你不应该期望你的组件以任何特定的顺序被渲染。调用 y = 5x 和 y = 2x 的先后顺序并不重要：这两个公式相互独立。同样地，每个组件也应该“独立思考”，而不是在渲染过程中试图与其他组件协调，或者依赖于其他组件。渲染过程就像是一场学校考试：每个组件都应该自己计算 JSX！

尽管你可能还没使用过，但在 React 中，你可以在渲染时读取三种输入：props，state 和 context。你应该始终将这些输入视为只读。

当你想根据用户输入 更改 某些内容时，你应该 设置状态，而不是直接写入变量。当你的组件正在渲染时，你永远不应该改变预先存在的变量或对象。

React 提供了 “严格模式”，在严格模式下开发时，它将会调用每个组件函数两次。通过重复调用组件函数，严格模式有助于找到违反这些规则的组件。

我们注意到，原始示例显示的是 “Guest #2”、“Guest #4” 和 “Guest #6”，而不是 “Guest #1”、“Guest #2” 和 “Guest #3”。原来的函数并不纯粹，因此调用它两次就出现了问题。但对于修复后的纯函数版本，即使调用该函数两次也能得到正确结果。纯函数仅仅执行计算，因此调用它们两次不会改变任何东西 — 就像两次调用 double(2) 并不会改变返回值，两次求解 y = 2x 不会改变 y 的值一样。相同的输入，总是返回相同的输出。

严格模式在生产环境下不生效，因此它不会降低应用程序的速度。如需引入严格模式，你可以用 `<React.StrictMode>` 包裹根组件。一些框架会默认这样做。

### 哪些地方 可能 引发副作用

函数式编程在很大程度上依赖于纯函数，但 某些事物 在特定情况下不得不发生改变。这是编程的要义！这些变动包括更新屏幕、启动动画、更改数据等，它们被称为 副作用。它们是 “额外” 发生的事情，与渲染过程无关。

在 React 中，副作用通常属于 事件处理程序。事件处理程序是 React 在你执行某些操作（如单击按钮）时运行的函数。即使事件处理程序是在你的组件 内部 定义的，它们也不会在渲染期间运行！ 因此事件处理程序无需是纯函数。

如果你用尽一切办法，仍无法为副作用找到合适的事件处理程序，你还可以调用组件中的 useEffect 方法将其附加到返回的 JSX 中。这会告诉 React 在渲染结束后执行它。然而，这种方法应该是你最后的手段。

如果可能，请尝试仅通过渲染过程来表达你的逻辑。你会惊讶于这能带给你多少好处！

### React 为何侧重于纯函数?

编写纯函数需要遵循一些习惯和规程。但它开启了绝妙的机遇：

你的组件可以在不同的环境下运行 — 例如，在服务器上！由于它们针对相同的输入，总是返回相同的结果，因此一个组件可以满足多个用户请求。
你可以为那些输入未更改的组件来 跳过渲染，以提高性能。这是安全的做法，因为纯函数总是返回相同的结果，所以可以安全地缓存它们。
如果在渲染深层组件树的过程中，某些数据发生了变化，React 可以重新开始渲染，而不会浪费时间完成过时的渲染。纯粹性使得它随时可以安全地停止计算。
我们正在构建的每个 React 新特性都利用到了纯函数。从数据获取到动画再到性能，保持组件的纯粹可以充分释放 React 范式的能力。

### 添加事件处理函数

#### 在事件处理函数中读取 props

#### 将事件处理函数作为 props 传递

#### 命名事件处理函数 prop

#### 阻止传播

_在 React 中所有事件都会传播，除了 onScroll，它仅适用于你附加到的 JSX 标签。_

事件处理函数接收一个 事件对象 作为唯一的参数。按照惯例，它通常被称为 e ，代表 “event”（事件）。你可以使用此对象来读取有关事件的信息。

这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 Button 组件那样调用 `e.stopPropagation()`

#### 阻止默认行为

不要混淆 e.stopPropagation() 和 e.preventDefault()。它们都很有用，但二者并不相关：

e.stopPropagation() 阻止触发绑定在外层标签上的事件处理函数。
e.preventDefault() 阻止少数事件的默认浏览器行为。

#### 事件处理函数可以包含副作用吗？

当然可以！事件处理函数是执行副作用的最佳位置。

与渲染函数不同，事件处理函数不需要是 纯函数，因此它是用来 更改 某些值的绝佳位置。例如，更改输入框的值以响应键入，或者更改列表以响应按钮的触发。但是，为了更改某些信息，你首先需要某种方式存储它。在 React 中，这是通过 state（组件的记忆） 来完成的。你将在下一章节了解所有相关信息。

### state

```jsx
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
```

> handleClick() 事件处理函数正在更新局部变量 index。但存在两个原因使得变化不可见：

局部变量无法在多次渲染中持久保存。 当 React 再次渲染这个组件时，它会从头开始渲染——不会考虑之前对局部变量的任何更改。
更改局部变量不会触发渲染。 React 没有意识到它需要使用新数据再次渲染组件。
要使用新数据更新组件，需要做两件事：

保留 渲染之间的数据。
触发 React 使用新数据渲染组件（重新渲染）。
useState Hook 提供了这两个功能：

State 变量 用于保存渲染间的数据。
State setter 函数 更新变量并触发 React 再次渲染组件。

在 React 中，useState 以及任何其他以“use”开头的函数都被称为 Hook。

Hook 是特殊的函数，只在 React 渲染时有效（我们将在下一节详细介绍）。它们能让你 “hook” 到不同的 React 特性中去。

Hooks ——以 use 开头的函数——只能在组件或自定义 Hook 的最顶层调用。 你不能在条件语句、循环语句或其他嵌套函数内调用 Hook。Hook 是函数，但将它们视为关于组件需求的无条件声明会很有帮助。在组件顶部 “use” React 特性，类似于在文件顶部“导入”模块。

惯例是将这对返回值命名为 const [thing, setThing]。你也可以将其命名为任何你喜欢的名称，但遵照约定俗成能使跨项目合作更易理解。

useState 的唯一参数是 state 变量的初始值。在这个例子中，index 的初始值被 useState(0)设置为 0。

每次你的组件渲染时，useState 都会给你一个包含两个值的数组：

state 变量 (index) 会保存上次渲染的值。
state setter 函数 (setIndex) 可以更新 state 变量并触发 React 重新渲染组件。
以下是实际发生的情况：

```jsx
const [index, setIndex] = useState(0);
```

组件进行第一次渲染。 因为你将 0 作为 index 的初始值传递给 useState，它将返回 [0, setIndex]。 React 记住 0 是最新的 state 值。

你更新了 state。当用户点击按钮时，它会调用 setIndex(index + 1)。 index 是 0，所以它是 setIndex(1)。这告诉 React 现在记住 index 是 1 并触发下一次渲染。

组件进行第二次渲染。React 仍然看到 useState(0)，但是因为 React 记住 了你将 index 设置为了 1，它将返回 [1, setIndex]。
以此类推！

赋予一个组件多个 state 变量

```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}
```

> 如果它们不相关，那么存在多个 state 变量是一个好主意，例如本例中的 index 和 showMore。但是，如果你发现经常同时更改两个 state 变量，那么最好将它们合并为一个。例如，如果你有一个包含多个字段的表单，那么有一个值为对象的 state 变量比每个字段对应一个 state 变量更方便。 选择 state 结构在这方面有更多提示。

#### React 如何知道返回哪个 state

你可能已经注意到，useState 在调用时没有任何关于它引用的是哪个 state 变量的信息。没有传递给 useState 的“标识符”，它是如何知道要返回哪个 state 变量呢？它是否依赖于解析函数之类的魔法？答案是否定的。

相反，为了使语法更简洁，在同一组件的每次渲染中，Hooks 都依托于一个稳定的调用顺序。这在实践中很有效，因为如果你遵循上面的规则（“只在顶层调用 Hooks”），Hooks 将始终以相同的顺序被调用。此外，linter 插件也可以捕获大多数错误。

在 React 内部，为每个组件保存了一个数组，其中每一项都是一个 state 对。它维护当前 state 对的索引值，在渲染之前将其设置为 “0”。每次调用 useState 时，React 都会为你提供一个 state 对并增加索引值。你可以在文章 [React Hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e) 中阅读有关此机制的更多信息。

#### State 是隔离且私有的

State 是屏幕上组件实例内部的状态。换句话说，如果你渲染同一个组件两次，每个副本都会有完全隔离的 state！改变其中一个不会影响另一个。

在这个例子中，之前的 Gallery 组件以同样的逻辑被渲染了两次。试着点击每个画廊内的按钮。你会注意到它们的 state 是相互独立的.

这就是 state 与声明在模块顶部的普通变量不同的原因。 State 不依赖于特定的函数调用或在代码中的位置，它的作用域“只限于”屏幕上的某块特定区域。你渲染了两个 <Gallery /> 组件，所以它们的 state 是分别存储的。

还要注意 Page 组件“不知道”关于 Gallery state 的任何信息，甚至不知道它是否有任何 state。与 props 不同，state 完全私有于声明它的组件。父组件无法更改它。这使你可以向任何组件添加或删除 state，而不会影响其他组件。

如果你希望两个画廊保持其 states 同步怎么办？在 React 中执行此操作的正确方法是从子组件中删除 state 并将其添加到离它们最近的共享父组件中。接下来的几节将专注于组织单个组件的 state，但我们将在组件间共享 state 中回到这个主题。

### 渲染和提交

一个 state 变量的值永远不会在一次渲染的内部发生变化， 即使其事件处理函数的代码是异步的。在 那次渲染的 onClick 内部，number 的值即使在调用 setNumber(number + 5) 之后也还是 0。它的值在 React 通过调用你的组件“获取 UI 的快照”时就被“固定”了。
