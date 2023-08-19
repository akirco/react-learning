const logs = ({ item, click }) => {
  return (
    <div className="logs" onClick={click}>
      <div className="date">
        <div className="month">{item.month}</div>
        <div className="day">{item.day}</div>
      </div>
      <div className="content">
        <h2 className="desc">{item.task}</h2>
        <div className="time">{item.time}</div>
      </div>
    </div>
  );
};

export default logs;
