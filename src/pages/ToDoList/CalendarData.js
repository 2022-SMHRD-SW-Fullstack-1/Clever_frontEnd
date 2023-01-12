import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "./ToDoCalendar.scss";

const now = new Date();
const isFullSize = false;

const CalendarData = () => {
  //   const week = ["일", "월", "화", "수", "목", "금", "토"];

  const nowDay = now.getDay();
  const nowDate = now.getDate();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();

  const [today, setToday] = useState(nowDay);
  const [month, setMonth] = useState(nowMonth);
  const [year, setYear] = useState(nowYear);

  const lastDateOfThisMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const lastDayOfThisMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDay();

  const lastDateOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0
  ).getDate();

  const lastDayOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0
  ).getDay();

  // 페이지에 비춰질 날짜 배열 만들기 함수
  const changeDate = (month) => {
    // 이번 달 모든 날짜 배열
    let daysOfThisMonth = [];
    daysOfThisMonth = [...Array(lastDateOfThisMonth + 1).keys()].slice(1);

    // 저번 달 날짜 배열
    let daysOfLastMonth = [];
    if (lastDateOfLastMonth !== 6) {
      for (let i = 0; i < lastDayOfLastMonth + 1; i++) {
        daysOfLastMonth.unshift(lastDateOfLastMonth - i);
      }
    }

    // 다음 달 날짜 배열
    let daysOfNextMonth = [];
    for (let i = 1; i < 7 - lastDayOfThisMonth; i++) {
      if (i === 0) {
        return daysOfNextMonth;
      }
      daysOfNextMonth.push(i);
    }

    const final = daysOfLastMonth.concat(daysOfThisMonth, daysOfNextMonth);
    const result = [];
    for (let i = 0; i < final.length; i += 7) {
      result.push(final.slice(i, i + 7));
    }
    return result;
  };

  const [totalDate, setTotalDate] = useState(changeDate(month));

  useEffect(() => {
    setTotalDate(changeDate(month));
    console.log("month changed -> ", changeDate(month));
  }, [month]);

  const goToday = () => {
    setMonth(nowMonth);
    setToday(nowDay);
  };

  let arrIndex;

  {
    isFullSize
      ? totalDate.map((value, index) => <div key={index}>{value}</div>)
      : totalDate.forEach((arr) => {
          if (arr.indexOf(nowDate) !== -1) {
            arrIndex = totalDate.indexOf(arr);
            console.log(`arrIndex:${arrIndex}`);
          }
        });
    console.log("날짜 ->", totalDate[arrIndex][0]);
  }

  return (
    <div className="calendar-table">
      {/* <h2>
        {year}년 {todayMonth}월
      </h2> */}
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
            <AiOutlineLeft />
          </td>
          <td className="showday">
            <span>{totalDate[arrIndex][0]}</span>
          </td>
          <td className="showday">
            <span>{totalDate[arrIndex][1]}</span>
          </td>
          <td className="showday">
            <span>{totalDate[arrIndex][2]}</span>
          </td>
          <td className="showday">
            <span>{totalDate[arrIndex][3]}</span>
          </td>
          <td className="showday">
            <span>{totalDate[arrIndex][4]}</span>
          </td>
          <td className="showday">
            <span>{totalDate[arrIndex][5]}</span>
          </td>
          <td className="showday">
            <span>{totalDate[arrIndex][6]}</span>
          </td>
          <td className="arrow">
            <AiOutlineRight />
          </td>
        </tr>
      </tbody>
    </div>
  );
};

export default CalendarData;
