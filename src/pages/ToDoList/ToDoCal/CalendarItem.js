import React from "react";
import "./ToDoCalendar.scss";

const CalendarItem = ({ item, setSelectDate }) => {
  const handleSelect = () => {
    setSelectDate(item);
  };
  return (
    <td className="showday" onClick={handleSelect}>
      <div className="calDate">{item.getDate()}</div>
    </td>
  );
};

export default CalendarItem;
