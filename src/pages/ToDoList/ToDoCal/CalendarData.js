import React, { useEffect, useState } from "react";
import { AiOutlineBorder, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "./ToDoCalendar.scss";

const CalendarData = () => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const nowDay = now.getDay();
  const nowDate = now.getDate();
  const nowMonth = now.getMonth() + 1;
  const nowYear = now.getFullYear();

  const [week, setWeek] = useState([]);

  const makeWeekArr = (date) => {
    let day = date.getDay();
    let week = [];
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(date.valueOf() + 86400000 * (i - day));
      week.push([i, newDate]);
    }
    setWeek(week);
  };

  const onPressArrowLeft = () => {
    let newDate = new Date(date.valueOf() - 86400000 * 7);
    let newWeek = makeWeekArr(newDate);
    console.log("preweek", newWeek);
    // this.setState({
    //   date: newDate,
    //   week: newWeek,
    // });
  };

  const onPressArrowRight = () => {
    let newDate = new Date(date.valueOf() + 86400000 * 7);
    let newWeek = makeWeekArr(newDate);
    console.log("newWeek", newWeek);
    // this.setState({
    //   date: newDate,
    //   week: newWeek,
    // });
  };

  useEffect(() => {
    makeWeekArr(date);
  }, []);

  const [leftArrow, setLeftArrow] = useState(false);
  const [RightArrow, setRightArrow] = useState(false);
  const [eventIndex, setEventIndex] = useState();

  // 오늘 날짜 표시
  useEffect(() => {
    // const calToday = "calToday";
    const dateClassName = document.querySelectorAll(".calDate");
    // console.log(dateClassName);

    for (let i = 0; i <= 6; i++) {
      if (week[i] === nowDate) {
        dateClassName[i].classList.add("calToday");
      }
    }
  }, []);

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
            <AiOutlineLeft className="WeekArrow" onClick={onPressArrowLeft} />
          </td>
          {week &&
            week.map((item, idx) => {
              return (
                <td className="showday" key={idx}>
                  <div className="calDate">{item[idx].getDate}</div>
                </td>
              );
            })}

          <td className="arrow">
            <AiOutlineRight className="WeekArrow" onClick={onPressArrowRight} />
          </td>
        </tr>
      </tbody>
    </div>
  );
};

export default CalendarData;
