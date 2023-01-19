import React, { useState } from "react";
import ApiService from "../../ApiService";

let checkOn = [];
const CalendarInput = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [Worker, setWorker] = useState("선택");
  const [PlanYear, setPlanYear] = useState(2023);
  const [PlanMonth, setPlanMonth] = useState("02");
  const [Day, setDay] = useState([]);
  const [finalDate, setFinalDate] = useState([]);
  const date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  const getDayOfWeek = (yyyy, mm, arrChoiceDay) => {
    console.log("1번");
    console.log("받아온것 :", arrChoiceDay);
    // console.log("요일", [arrChoiceDay]);
    //특정date1의 마지막날        년, monday
    let lastDate = new Date(yyyy, mm, 0).getDate();
    //Monday monday Wednesday Thursday Friday Saturday Sunday

    var sunday;
    var monday;
    var tuesday;
    var wednesday;
    var thursday;
    var friday;
    var saturday;

    var arrSunday = [];
    var arrMonday = [];
    var arrTuesday = [];
    var arrWednesday = [];
    var arrThursday = [];
    var arrFriday = [];
    var arrSaturday = [];

    const week = [0, 1, 2, 3, 4, 5, 6];

    var stringYear = String(yyyy);
    var stringMonth = String(mm);

    const dayOfWeek =
      week[new Date(stringYear + "-" + stringMonth + "-" + "1").getDay()];
    var sequenceDay = [
      arrSunday,
      arrMonday,
      arrTuesday,
      arrWednesday,
      arrThursday,
      arrFriday,
      arrSaturday,
    ];
    if (dayOfWeek === 0) {
      sunday = 1;
      monday = 2;
      tuesday = 3;
      wednesday = 4;
      thursday = 5;
      friday = 6;
      saturday = 7;
    } else if (dayOfWeek === 1) {
      monday = 1;
      tuesday = 2;
      wednesday = 3;
      thursday = 4;
      friday = 5;
      saturday = 6;
      sunday = 7;
    } else if (dayOfWeek === 2) {
      tuesday = 1;
      wednesday = 2;
      thursday = 3;
      friday = 4;
      saturday = 5;
      sunday = 6;
      monday = 7;
    } else if (dayOfWeek === 3) {
      wednesday = 1;
      thursday = 2;
      friday = 3;
      saturday = 4;
      sunday = 5;
      monday = 6;
      tuesday = 7;
    } else if (dayOfWeek === 4) {
      thursday = 1;
      friday = 2;
      saturday = 3;
      sunday = 4;
      monday = 5;
      tuesday = 6;
      wednesday = 7;
    } else if (dayOfWeek === 5) {
      friday = 1;
      saturday = 2;
      sunday = 3;
      monday = 4;
      tuesday = 5;
      wednesday = 6;
      thursday = 7;
    } else if (dayOfWeek === 6) {
      saturday = 1;
      sunday = 2;
      monday = 3;
      tuesday = 4;
      wednesday = 5;
      thursday = 6;
      friday = 7;
    }

    for (let i = 0; i < lastDate; i += 7) {
      arrSunday.push(sunday + i);
      arrMonday.push(monday + i);
      arrTuesday.push(tuesday + i);
      arrWednesday.push(wednesday + i);
      arrThursday.push(thursday + i);
      arrFriday.push(friday + i);
      arrSaturday.push(saturday + i);
    }

    if (arrSunday[arrSunday.length - 1] > lastDate) {
      arrSunday.splice(arrSunday.length - 1);
    }

    if (arrMonday[arrMonday.length - 1] > lastDate) {
      arrMonday.splice(arrMonday.length - 1);
    }
    if (arrTuesday[arrTuesday.length - 1] > lastDate) {
      arrTuesday.splice(arrTuesday.length - 1);
    }
    if (arrWednesday[arrWednesday.length - 1] > lastDate) {
      arrWednesday.splice(arrWednesday.length - 1);
    }
    if (arrThursday[arrThursday.length - 1] > lastDate) {
      arrThursday.splice(arrThursday.length - 1);
    }
    if (arrFriday[arrFriday.length - 1] > lastDate) {
      arrFriday.splice(arrFriday.length - 1);
    }
    if (arrSaturday[arrSaturday.length - 1] > lastDate) {
      arrSaturday.splice(arrSaturday.length - 1);
    }

    let selectedDate = [];
    for (var i = 0; i < arrChoiceDay.length; i++) {
      for (var j = 0; j < 7; j++) {
        if (Number(arrChoiceDay[i]) === j) {
          for (var k = 0; k < sequenceDay[j].length; k++) {
            selectedDate.push(sequenceDay[j][k]);
          }
        }
      }
    }
    // selectedDate.sort((a, b) => b - a);
    setFinalDate([...selectedDate]);

    console.log(
      yyyy + "년 " + mm + "월에 선택한 요일이 있는날짜",
      selectedDate
    );
  };

  //임시용 나중에 back에서 받아올예정
  const workerList = [
    { 0: "박진형" },
    { 1: "임아해" },
    { 2: "나소연" },
    { 3: "박형주" },
  ];

  const workerListRendering = () => {
    console.log("2번");
    const arrWorker = [];
    for (let i = 0; i < workerList.length; i++) {
      arrWorker.push(
        <option value={Object.keys(workerList[i]).value}>
          {workerList[i][i]}
        </option>
      );
    }
    return arrWorker;
  };

  const planYear = (e) => {
    console.log("5번");
    getDayOfWeek(e.target.value, PlanMonth, checkOn);
    setPlanYear(e.target.value);
  };
  const planMonth = (e) => {
    console.log("6번");
    getDayOfWeek(PlanYear, e.target.value, checkOn);
    setPlanMonth(e.target.value);
  };

  const saveStartTime = (e) => {
    console.log("7번");
    setStartTime(e.target.value);
  };

  const saveEndTime = (e) => {
    console.log("9번");
    setEndTime(e.target.value);
  };

  const worker = (e) => {
    console.log("11번");
    setWorker(e.target.value);
  };

  // 선택한 요일값 setDay하기
  const day = (e) => {
    console.log("11번");
    if (e.target.checked && !checkOn.includes(e.target.value)) {
      checkOn.push(e.target.value);
    } else if (!e.target.checked && checkOn.includes(e.target.value)) {
      for (let i = 0; i < checkOn.length; i++) {
        if (checkOn[i] === e.target.value) {
          checkOn.splice(i, 1);
          i--;
        }
      }
    }
    setDay([...checkOn]);
    console.log(" 체크온 :", checkOn);
    getDayOfWeek(PlanYear, PlanMonth, checkOn);
  };

  const checkBoxDay = () => {
    console.log("12번");
    const arrDay = ["일", "월", "화", "수", "목", "금", "토"];
    let arrDays = arrDay.map((item, index) => {
      return (
        <>
          {item}
          <input
            key={index}
            onChange={day}
            type="checkbox"
            name="days"
            value={index}
          />
        </>
      );
    });
    return arrDays;
  };

  const selectYear = () => {
    console.log("13번");
    const arrYear = [];
    for (var i = 0; i < 11; i++) {
      arrYear.push(year + i);
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
    console.log("14번");
    const arrMonth = [];
    for (var i = 1; i < 13; i++) {
      i > 10 ? arrMonth.push(i) : arrMonth.push("0" + i);
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

  const registerSchedule = () => {
    var dateLength = [...finalDate];

    var saveArrScheduleInfo = [];

    for (var i = 0; i < dateLength.length; i++) {
      dateLength[i] >= 10
        ? saveArrScheduleInfo.push({
            mem_id: String(Worker),
            // mem_id: "01075780324",
            att_date: `${PlanYear}-${PlanMonth}-${dateLength[i]}`,
            att_sche_start_time: String(startTime),
            att_sche_end_time: String(endTime),
          })
        : saveArrScheduleInfo.push({
            mem_id: String(Worker),
            // mem_id: "01075780324",

            att_date: `${PlanYear}-${PlanMonth}-0${dateLength[i]}`,
            att_sche_start_time: String(startTime),
            att_sche_end_time: String(endTime),
          });
    }
    console.log("보낼배열", saveArrScheduleInfo);

    ApiService.saveArrScheduleInfo(saveArrScheduleInfo)
      .then((res) => {
        alert("등록성공");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <form>
        {checkBoxDay()}
        <br />
        <tr>
          <br />
          <select onChange={planYear} value={PlanYear}>
            {selectYear()}
          </select>
          <span> </span>
          <select onChange={planMonth} value={PlanMonth}>
            {selectMonth()}
          </select>
        </tr>
        <br />
        <tr>
          <td>
            근무자 :{" "}
            <select onChange={worker} value={Worker}>
              <option name="선택" value="미선택">
                선택
              </option>
              {workerListRendering()}
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td>
            {" "}
            근무시간 :{" "}
            <input type="time" name="startTime" onChange={saveStartTime} />~
            <input type="time" name="endTime" onChange={saveEndTime} />
          </td>
          <br />
          <br />

          <br />
          {/* <p>
            직원: {Worker}
            <br />
            요일 : {Day}
            <br />년 : {PlanYear}
            <br />월 : {PlanMonth}
            <br />
            근무시간 : {startTime}~{endTime}
            <br />
            날짜 : {finalDate}
          </p> */}
        </tr>
      </form>
      <button
        onClick={() => {
          registerSchedule();
        }}
      >
        등록
      </button>
    </div>
  );
};

export default CalendarInput;
