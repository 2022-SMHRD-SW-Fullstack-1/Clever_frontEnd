import React, { useEffect, useState } from "react";
import { AiOutlineBorder, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CalendarItem from "./CalendarItem";
import "./ToDoCalendar.scss";

const CalendarData = () => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nowDate = now.getDate();

  const [selected, setSelected] = useState();

  const makeWeekArr = (date) => {
    let day = date.getDay();
    let week = [];
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(date.valueOf() + 86400000 * (i - day));
      week.push(newDate);
    }
    return week;
  };
  const [week, setWeek] = useState(makeWeekArr(date));
  const [state, setState] = useState({
    date,
    week,
  });

  const onClickArrowLeft = () => {
    let newDate = new Date(state.date.valueOf() - 86400000 * 7);
    let newWeek = makeWeekArr(newDate);

    setState({
      date: newDate,
      week: newWeek,
    });
  };
};

// 오늘 날짜 표시
useEffect(() => {
  // const calToday = "calToday";
  const dateClassName = document.querySelectorAll(".calDate");

  for (let i = 0; i <= 6; i++) {
    if (state.week[i].getDate() === nowDate) {
      dateClassName[i].classList.add("calToday");
    }
  }
}, [week]);

return (
  <div className="calendar-table">
    <thead className="calendar-head">
      <tr className="todo-calendar">
        <th>&nbsp;</th>
        <th className="sun">일</th>
        <th className="mon">월</th>
        <th className="tue">화</th>
        <th className="wed">수</th>
        <th className="thu">목</th>
        <th className="fri">금</th>
        <th className="sat">토</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody className="calendar-body">
      <tr className="todo-calendar">
        <td className="arrow">
          <AiOutlineLeft className="WeekArrow" onClick={onClickArrowLeft} />
        </td>
        {state.week &&
          state.week.map((item, idx) => {
            return <CalendarItem key={idx} item={item} />;
          })}

        <td className="arrow">
          <AiOutlineRight className="WeekArrow" onClick={onClickArrowRight} />
        </td>
      </tr>
    </tbody>
  </div>
);

export default CalendarData;
