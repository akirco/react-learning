const MyButton = () => {
  const handler = () => {
    alert('hello');
  };
  return <button onClick={handler}>hello</button>;
};

export default MyButton;
