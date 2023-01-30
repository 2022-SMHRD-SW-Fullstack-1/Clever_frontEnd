import React, { useEffect, useRef, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
const CalendarChart = ({ getWorkerList }) => {
  console.log("스케줄인포", getWorkerList);
  return (
    <>
      <PieChart
        data={[
          {
            value: 15.7,
            color: "#F6CB44",
            name: "name1",
          },
        ]}
        reveal={15.7} //퍼센트 치수
        lineWidth={18} //도넛 두께
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        label={({ dataEntry }) => dataEntry.value + "%"}
        labelStyle={{
          fontSize: "26px",
          fill: "#33333",
        }}
        labelPosition={0}
        id="chart"
      />
      <PieChart
        data={[
          {
            value: 15.7,
            color: "#F6CB44",
            name: "name1",
          },
        ]}
        reveal={15.7} //퍼센트 치수
        lineWidth={18} //도넛 두께
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        label={({ dataEntry }) => dataEntry.value + "%"}
        labelStyle={{
          fontSize: "26px",
          fill: "#33333",
        }}
        labelPosition={0}
        id="chart"
      />
    </>
  );
};

export default CalendarChart;
