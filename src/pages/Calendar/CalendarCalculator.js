import { set } from "immutable";
import React, { useEffect, useRef, useState } from "react";
import "./CalendarCalculator.scss";

const CalendarCalculator = ({ thisMonthWorkTime, workerName }) => {
  const [payment, setPayment] = useState(0);
  const workHr = useRef(thisMonthWorkTime);
  const [totalPayment, setTotalPayment] = useState();
  const copyThisMonthWorkTime = useRef();
  copyThisMonthWorkTime.current = 0;
  copyThisMonthWorkTime.current = thisMonthWorkTime;
  var copyDefault = copyThisMonthWorkTime.current;

  useEffect(() => {
    console.log("네임", workerName);
    setPayment("");
    setTotalPayment(0);
  }, [workerName]);
  const inputReset = (e) => {
    setPayment(e.target.value);
    setTotalPayment(e.target.value * copyDefault);
  };
  return (
    <div className="chartCalculator">
      <input
        id="inputWage"
        type="number"
        placeholder="시급"
        value={payment}
        onChange={inputReset}
      />
      <p>x</p>
      <input
        key={`${thisMonthWorkTime}`}
        id="inputTime"
        onChange={(e) => {
          workHr.current = e.target.value;
          setTotalPayment(payment.current * e.target.value);
        }}
        type="number"
        defaultValue={Number(copyDefault)}
      />
      <p>=</p>
      <input type="number" defaultValue={totalPayment} id="calculateResult" />
    </div>
  );
};

export default CalendarCalculator;
