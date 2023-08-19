import Counter from './component/counter';
import Logs from './component/logs';
import Tag from './component/condition';
import ListRender from './component/listrender';
import MyButton from './component/mybtn';

const App = () => {
  const clickHandler = (event) => {
    alert('123');
    event.preventDefault();
  };
  const data = [
    {
      month: '四月',
      day: '19',
      task: '学习React',
      time: '30分钟',
    },
    {
      month: '四月',
      day: '19',
      task: '学习React',
      time: '30分钟',
    },
    {
      month: '四月',
      day: '19',
      task: '学习React',
      time: '30分钟',
    },
  ];
  return (
    <>
      {/* 显示数据 */}
      {data.map((item, index) => (
        <Logs item={item} key={index} click={clickHandler} />
      ))}
      {/* 条件渲染 */}
      <Tag flag={'h2'}>text</Tag>
      {/* 列表渲染 */}
      <ListRender />
      {/* 事件处理 */}
      <MyButton />
      {/* 更新界面 */}
      <Counter />
      {/* 组件间共享数据 */}
    </>
  );
};

export default App;
