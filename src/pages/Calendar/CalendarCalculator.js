import { set } from "immutable";
import React, { useRef, useState } from "react";
import "./CalendarCalculator.scss";

const CalendarCalculator = ({ thisMonthWorkTime }) => {
  const payment = useRef(0);
  const workHr = useRef(thisMonthWorkTime);
  const [totalPayment, setTotalPayment] = useState();
  return (
    <div className="chartCalculator">
      <input
        type="number"
        placeholder="시급"
        onChange={(e) => {
          payment.current = e.target.value;
          setTotalPayment(e.target.value * workHr.current);
        }}
      />
      <p>x</p>
      <input
        onChange={(e) => {
          workHr.current = e.target.value;
          setTotalPayment(payment.current * e.target.value);
        }}
        type="number"
        defaultValue={Number(thisMonthWorkTime)}
      />
      <p>=</p>
      <input type="number" defaultValue={totalPayment} width="250px" />
    </div>
  );
};

export default CalendarCalculator;
