import { useState } from "react";
const UseCounter = () => {
  const [count, setCount] = useState(1);
  const add = () => {
    setCount(count + 1);
  };
  const sub = () => {
    setCount(count - 1);
  };
  return (
    <div className="counter">
      <div> {count}</div>
      <div>
        <button onClick={add}>add</button>
        <button onClick={sub}>sub</button>
      </div>
    </div>
  );
};

export default UseCounter;
