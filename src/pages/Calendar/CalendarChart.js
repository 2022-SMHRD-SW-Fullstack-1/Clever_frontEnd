import React, { useEffect, useRef, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./CalendarChart.scss";
import { v4 as uuidv4 } from "uuid";
import CalendarCalculator from "./CalendarCalculator";
const CalendarChart = ({
  getWorkerList,
  getSchedule,
  today,
  setChartOpen,
  changeSchedul,
}) => {
  // const payment = useRef(0);
  // const workHr = 0;
  var year = today.substring(0, 4);
  var month = today.substring(5, 7);
  var date = today.substring(8, 10);

  var numToday = Number(year + month + date);
  const chartinfo = [];
  console.log("투데이", today);
  console.log("스케줄인포", getWorkerList);
  console.log("겟쉐줄", getSchedule);
  console.log("체인지 :", changeSchedul);
  const workerName = [];
  const dateData = new Date();
  const yearData = Number(
    dateData.toLocaleDateString("en-US", {
      year: "numeric",
    })
  );

  const monthData = Number(
    dateData.toLocaleDateString("en-US", {
      month: "2-digit",
    })
  );
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedWorker, setSelectedWorker] = useState();

  for (var i = 1; i < getWorkerList.length; i++) {
    workerName.push(getWorkerList[i].mem_name);
  }

  const group_name = sessionStorage.getItem("group_name");

  for (var i = 0; i < workerName.length; i++) {
    var totalWorkDay = 0;
    var totalWorkTime = 0;
    var lateTime = 0;
    var lateCount = 0;
    var changeSchedulCount = 0;
    var thisMonthWorkTime = 0;
    for (var j = 0; j < getSchedule.length; j++) {
      if (workerName[i] === getSchedule[j].mem_name) {
        var attYear = getSchedule[j].att_date.substring(0, 4);
        var attMonth = getSchedule[j].att_date.substring(5, 7);
        var attDay = getSchedule[j].att_date.substring(8, 10);
        var attDate = Number(attYear + attMonth + attDay);

        //이번달 누적 근무 시간
        //이번달 누적 근무 시간
        getSchedule[j].att_date.substring(0, 7) === today.substring(0, 7)
          ? getSchedule[j].total_work_time < 0
            ? (thisMonthWorkTime += getSchedule[j].total_work_time + 1440)
            : (thisMonthWorkTime += getSchedule[j].total_work_time)
          : console.log();

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
    for (var k = 0; k < changeSchedul.length; k++) {
      if (workerName[i] === changeSchedul[k].mem_name) {
        changeSchedulCount += 1;
      }
    }
    var latePercent = (lateCount * 100) / totalWorkDay;
    var changeSchedulCountPercent = (changeSchedulCount * 100) / totalWorkDay;
    console.log(latePercent);
    chartinfo.push({
      mem_name: workerName[i],
      total_work_day: totalWorkDay,
      total_work_time: totalWorkTime,
      late_time: lateTime,
      late_Count: lateCount,
      late_percent: latePercent,
      change_schedule: changeSchedulCountPercent,
      change_count: changeSchedulCount,
      this_month_work_time: thisMonthWorkTime,
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
            <h2>지각</h2>
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
            <h2>근무수정</h2>
            <PieChart
              data={[
                {
                  value: item.change_schedule.toFixed(1),
                  color: "#3a4ca8",
                  name: "name1",
                },
              ]}
              reveal={item.change_schedule} //퍼센트 치수
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
            <tr>
              <th>누적근무 일 </th>
              <th>{item.total_work_day} 일</th>
            </tr>

            <tr>
              <th>누적근무 시간 </th>
              <th>{(item.total_work_time / 60).toFixed(0)}시간</th>
            </tr>

            <tr>
              <th>누적지각 </th> <th>{item.late_Count} 번</th>
            </tr>

            <tr>
              <th>누적지각 시간 </th> <th>{item.late_time} 분</th>
            </tr>

            <tr>
              <th>누적근무변경 </th> <th>{item.change_count} 번</th>
            </tr>
            <tr>
              <th>이번달 누적 </th>{" "}
              <th>{(item.this_month_work_time / 60).toFixed(0)} 시간</th>
            </tr>
          </div>
          <div className="chartCalculatorContainer">
            {/* <h1>급여 예측</h1> */}
            <h3>
              {item.mem_name}님의 급여예측
              <br />
            </h3>

            <CalendarCalculator
              thisMonthWorkTime={(item.this_month_work_time / 60).toFixed(0)}
            />
          </div>
        </div>
      );
    });
    return result;
  };

  const closeModal = () => {
    setChartOpen(false);
  };
  const workerListRendering = () => {
    var result = getWorkerList.map((item, index) => {
      return <option key={index}>{item.mem_name}</option>;
    });
    return result;
  };
  const selectYear = () => {
    const arrYear = [];
    for (var i = 0; i < 11; i++) {
      arrYear.push(yearData - i);
    }
    let arrYears = arrYear.map((item, index) => {
      return (
        <>
          {item}
          <option key={index} value={item}>
            {item}년
          </option>
        </>
      );
    });

    return arrYears;
  };
  const selectMonth = () => {
    const arrMonth = [];
    for (var i = monthData; i < 13; i++) {
      arrMonth.push(i);
    }
    let optionMonth = arrMonth.map((item, index) => {
      return (
        <>
          {item}
          <option key={index} value={item}>
            {item}월
          </option>
        </>
      );
    });
    return optionMonth;
  };
  const chooseYear = (e) => {
    setSelectedYear(e.target.value);
  };
  const chooseMonth = (e) => {
    setSelectedMonth(e.target.value);
  };
  const searchData = (e) => {
    setSelectedWorker(e.target.value);
  };

  return (
    <div className="chartModelContainer">
      <div className="modalBox">
        <h1 id="title">{group_name} 직원차트</h1>
        <select onChange={chooseYear} value={selectedYear}>
          {selectYear()}
        </select>
        <span> </span>
        <select onChange={chooseMonth} value={selectedMonth}>
          {selectMonth()}
        </select>
        <select onChange={selectedWorker}>{workerListRendering()}</select>
        <button className="searchButton" onClick={searchData}>
          검색
        </button>
        <p>※2023년 최저임금은 9,620원 입니다</p>
        <button className="close" onClick={closeModal}>
          차트닫기
        </button>
        {workerList()}
        <div id="space">공백 </div>
      </div>
    </div>
  );
};

export default CalendarChart;
