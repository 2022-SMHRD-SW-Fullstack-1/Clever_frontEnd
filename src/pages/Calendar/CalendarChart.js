import React, { useEffect, useRef, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./CalendarChart.scss";
const CalendarChart = ({ getWorkerList, setModalOpen, getSchedule }) => {
  console.log("스케줄인포", getWorkerList);
  console.log("겟쉐줄", getSchedule);
  const workerName = [];
  for (var i = 1; i < getWorkerList.length; i++) {
    workerName.push(getWorkerList[i].mem_name);
  }

  const workerList = () => {};

  return (
    <>
      <div className="calendarChartTop">
        <th>이름</th>
      </div>
      <div className="calendarchart1">
        <h1>지각</h1>
        <PieChart
          data={[
            {
              value: 15.7,
              color: "#3a4ca8",
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
      </div>

      <div className="calendarchart2">
        <h1>근무수정</h1>
        <PieChart
          data={[
            {
              value: 0,
              color: "#3a4ca8",
              name: "name1",
            },
          ]}
          reveal={0} //퍼센트 치수
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
      </div>

      <div className="chartinfo">
        <table>
          <br />
          <tr>
            <th>누적근무 일 수 :</th>
          </tr>
          <br />
          <tr>
            <th>누적근무 시간 :</th>
          </tr>
          <br />
          <tr>
            <th>누적지각 횟수 :</th>
          </tr>
          <br />
          <tr>
            <th>누적지각 시간 :</th>
          </tr>
          <tr></tr>
        </table>
      </div>
    </>
  );
};

export default CalendarChart;
