import React, { useEffect, useRef, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./CalendarChart.scss";
import { v4 as uuidv4 } from "uuid";
const CalendarChart = ({ getWorkerList, getSchedule, today }) => {
  var year = today.substring(0, 4);
  var month = today.substring(5, 7);
  var date = today.substring(8, 10);
  var numToday = Number(year + month + date);
  const chartinfo = [];
  console.log("투데이", today);
  console.log("스케줄인포", getWorkerList);
  console.log("겟쉐줄", getSchedule);
  const workerName = [];
  for (var i = 1; i < getWorkerList.length; i++) {
    workerName.push(getWorkerList[i].mem_name);
  }

  for (var i = 0; i < workerName.length; i++) {
    var totalWorkDay = 0;
    var totalWorkTime = 0;
    var lateTime = 0;
    var lateCount = 0;

    for (var j = 0; j < getSchedule.length; j++) {
      if (workerName[i] === getSchedule[j].mem_name) {
        var attYear = getSchedule[j].att_date.substring(0, 4);
        var attMonth = getSchedule[j].att_date.substring(5, 7);
        var attDay = getSchedule[j].att_date.substring(8, 10);
        var attDate = Number(attYear + attMonth + attDay);

        //누적근무일수
        numToday > attDate ? totalWorkDay++ : console.log();

        //누적 지각시간
        getSchedule[j].late_time > 0
          ? (lateTime += getSchedule[j].late_time)
          : console.log();
        //누적지각횟수
        getSchedule[j].late_time > 0 ? (lateCount += 1) : console.log();
        //누적근무시간
        getSchedule[j].total_work_time < 0
          ? (totalWorkTime += getSchedule[j].total_work_time + 1440)
          : (totalWorkTime += getSchedule[j].total_work_time);
      }
    }
    var latePercent = (lateCount * 100) / totalWorkDay;
    console.log(latePercent);
    chartinfo.push({
      mem_name: workerName[i],
      total_work_day: totalWorkDay,
      total_work_time: totalWorkTime,
      late_time: lateTime,
      late_Count: lateCount,
      late_percent: latePercent,
    });
  }
  console.log("객체", chartinfo);

  const workerList = () => {
    var result = chartinfo.map((item, index) => {
      console.log("아이템", item);

      return (
        <div className="calendarChardContent">
          <div className="calendarChartTop" key={uuidv4}>
            <th>{item.mem_name}</th>
          </div>
          <div className="calendarchart1">
            <h1>지각</h1>
            <PieChart
              data={[
                {
                  value: item.late_percent.toFixed(1),
                  color: "#3a4ca8",
                  name: "name1",
                },
              ]}
              reveal={item.late_percent} //퍼센트 치수
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
                <th>누적근무 일 수 : {item.total_work_day} 일</th>
              </tr>
              <br />
              <tr>
                <th>누적근무 시간 :{item.total_work_time} 분</th>
              </tr>
              <br />
              <tr>
                <th>누적지각 횟수 :{item.late_Count} 번</th>
              </tr>
              <br />
              <tr>
                <th>누적지각 시간 : {item.late_time} 분</th>
              </tr>
              <tr></tr>
            </table>
          </div>
        </div>
      );
    });
    return result;
  };

  return <>{workerList()}</>;
  // <>
  //   <div className="calendarChartTop">
  //     <th>이름</th>
  //   </div>
  //   <div className="calendarchart1">
  //     <h1>지각</h1>
  //     <PieChart
  //       data={[
  //         {
  //           value: 15.7,
  //           color: "#3a4ca8",
  //           name: "name1",
  //         },
  //       ]}
  //       reveal={15.7} //퍼센트 치수
  //       lineWidth={18} //도넛 두께
  //       background="#f3f3f3"
  //       lengthAngle={360}
  //       rounded
  //       animate
  //       label={({ dataEntry }) => dataEntry.value + "%"}
  //       labelStyle={{
  //         fontSize: "26px",
  //         fill: "#33333",
  //       }}
  //       labelPosition={0}
  //       id="chart"
  //     />
  //   </div>

  //   <div className="calendarchart2">
  //     <h1>근무수정</h1>
  //     <PieChart
  //       data={[
  //         {
  //           value: 0,
  //           color: "#3a4ca8",
  //           name: "name1",
  //         },
  //       ]}
  //       reveal={0} //퍼센트 치수
  //       lineWidth={18} //도넛 두께
  //       background="#f3f3f3"
  //       lengthAngle={360}
  //       rounded
  //       animate
  //       label={({ dataEntry }) => dataEntry.value + "%"}
  //       labelStyle={{
  //         fontSize: "26px",
  //         fill: "#33333",
  //       }}
  //       labelPosition={0}
  //       id="chart"
  //     />
  //   </div>

  //   <div className="chartinfo">
  //     <table>
  //       <br />
  //       <tr>
  //         <th>누적근무 일 수 :</th>
  //       </tr>
  //       <br />
  //       <tr>
  //         <th>누적근무 시간 :</th>
  //       </tr>
  //       <br />
  //       <tr>
  //         <th>누적지각 횟수 :</th>
  //       </tr>
  //       <br />
  //       <tr>
  //         <th>누적지각 시간 :</th>
  //       </tr>
  //       <tr></tr>
  //     </table>
  //   </div>
  // </>
};

export default CalendarChart;
