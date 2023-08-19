const Tag = ({ flag, children }) => {
  // let content;
  // if (flag === 'h1') {
  //   content = <h1>{children}</h1>;
  // } else {
  //   content = <h2>{children}</h2>;
  // }
  // return content;
  return <>{flag === 'h1' ? <h1>1</h1> : <h2>2</h2>}</>;
};

export default Tag;
