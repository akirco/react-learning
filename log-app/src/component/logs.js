const logs = (props) => {
  const data = props.test;
  return (
    <div className="logs">
      <div className="date">
        <div className="month">{data.month}</div>
        <div className="day">{data.day}</div>
      </div>
      <div className="content">
        <h2 className="desc">{data.task}</h2>
        <div className="time">{data.time}</div>
      </div>
    </div>
  );
};

export default logs;
