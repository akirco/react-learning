import Logs from "./component/logs";
import Counter from "./component/counter";

const App = () => {
  const clickHandler = (event) => {
    console.log(event);
    event.preventDefault();
  };
  const data = [
    {
      month: "四月",
      day: "19",
      task: "学习React",
      time: "30分钟",
    },
    {
      month: "四月",
      day: "19",
      task: "学习React",
      time: "30分钟",
    },
    {
      month: "四月",
      day: "19",
      task: "学习React",
      time: "30分钟",
    },
  ];
  return (
    <div>
      {data.map((item, index) => (
        <Logs test={item} key={index} />
      ))}
      <button onClick={clickHandler}>clickHandler</button>
      <button
        onClick={() => {
          console.log(123);
        }}
      >
        clickHandler
      </button>
      <Counter />
    </div>
  );
};

export default App;
