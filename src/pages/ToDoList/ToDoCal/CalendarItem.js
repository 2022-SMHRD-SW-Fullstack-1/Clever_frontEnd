import React from "react";
import "./ToDoCalendar.scss";

const CalendarItem = ({ item }) => {
  const handleSelect = () => {
    console.log("selected Item : ", item);
  };
  return (
    <td className="showday" onClick={handleSelect}>
      <div className="calDate">{item.getDate()}</div>
    </td>
  );
};

export default CalendarItem;
