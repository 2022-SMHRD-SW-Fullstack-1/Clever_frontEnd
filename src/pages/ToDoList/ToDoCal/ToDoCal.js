import React, { useState } from "react";

const ToDoCal = () => {
  let now = new Date();
  let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const makeWeekArr = (date) => {
    let day = date.getDay();
    let week = [];
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(date.valueOf() + 86400000 * (i - day));
      week.push([i, newDate]);
    }
    return week;
  };

  let week = makeWeekArr(date);
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
  onPressArrowRight();
  onPressArrowLeft();
  return (
    <div>
      <table></table>
    </div>
  );
};

export default ToDoCal;
