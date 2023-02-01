import React from "react";
import "./ToDoCalendar.scss";

const CalendarItem = ({ item }) => {
  return (
    <td className="showday">
      <div className="calDate">{item.getDate()}</div>
    </td>
  );
};

export default CalendarItem;
