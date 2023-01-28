import { Calendar } from "@fullcalendar/core";
import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../ApiService";
import "./CalendarInput.scss";

let checkOn = [];
const CalendarInput = ({ getWorkerList, setModalOpen, getSchedule }) => {
  console.log(sessionStorage.getItem("group_seq"));
  const groupSeq = sessionStorage.getItem("group_seq");
  const date = new Date();
  const year = Number(
    date.toLocaleDateString("en-US", {
      year: "numeric",
    })
  );
  const month = Number(
    date.toLocaleDateString("en-US", {
      month: "2-digit",
    })
  );
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [Worker, setWorker] = useState("선택");
  const [PlanYear, setPlanYear] = useState(year);
  const [PlanMonth, setPlanMonth] = useState(month);
  const [Day, setDay] = useState([]);
  const [finalDate, setFinalDate] = useState([]);
  const workerList = useRef(getWorkerList);
  const [workerListState, setWorkerListState] = useState();
  const [workerScheduleState, setWorkerScheduleState] = useState();
  console.log(getWorkerList);
  const getDayOfWeek = (yyyy, mm, arrChoiceDay) => {
    let lastDate = new Date(yyyy, mm, 0).getDate();

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

    setFinalDate([...selectedDate]);

    console.log(
      yyyy + "년 " + mm + "월에 선택한 요일이 있는날짜",
      selectedDate
    );
  };
  // useEffect(() => [getWorkerList(groupSeq)], []);
  // const getWorkerList = (e) => {
  //   workerList.current = [];
  //   ApiService.getWorkerList(e).then((res) => {
  //     console.log("인풋목록 :", res.data);
  //     workerList.current = res.data;
  //     setWorkerListState(res.data);
  //   });
  // };

  const saveArrSchedule = (e) => {
    ApiService.saveArrScheduleInfo(e)
      .then((res) => {
        alert("일정이 등록되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
    setWorkerListState(0);
  };

  const workerListRendering = () => {
    var result = workerList.current.map((item, index) => {
      return (
        <option value={workerList.current[index].mem_name}>
          {workerList.current[index].mem_name}
        </option>
      );
    });
    return result;
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
        <td>
          <tr>{item}</tr>
          <tr>
            <input
              key={index}
              onChange={day}
              type="checkbox"
              name="days"
              value={index}
            />
          </tr>
        </td>
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
    for (var i = month; i < 13; i++) {
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

  const registerSchedule = () => {
    var dateLength = [...finalDate];
    var saveArrScheduleInfo = [];
    var getId;
    for (var i = 0; i < workerList.current.length; i++) {
      if (Worker === workerList.current[i].mem_name) {
        getId = workerList.current[i].mem_id;
      }
    }
    for (var i = 0; i < finalDate.length; i++) {
      finalDate[i] >= 10
        ? saveArrScheduleInfo.push({
            mem_name: String(Worker),
            att_date: `${PlanYear}-${PlanMonth}-${finalDate[i]}`,
            att_sche_start_time: String(startTime),
            att_sche_end_time: String(endTime),
            group_seq: groupSeq,
            mem_id: getId,
          })
        : saveArrScheduleInfo.push({
            mem_name: String(Worker),
            att_date: `${PlanYear}-${PlanMonth}-0${finalDate[i]}`,
            att_sche_start_time: String(startTime),
            att_sche_end_time: String(endTime),
            group_seq: groupSeq,
            mem_id: getId,
          });
    }
    console.log("보낼배열", saveArrScheduleInfo);
    saveArrSchedule(saveArrScheduleInfo);
  };
  // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
  const closeModal = () => {
    setModalOpen(false);
    getSchedule(groupSeq);
  };

  return (
    <div className="calendarInputContainer">
      <button className="close" onClick={closeModal}>
        X
      </button>
      <tr>{checkBoxDay()}</tr>
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
      </tr>

      <button onClick={registerSchedule}>등록하기</button>
    </div>
  );
};

export default CalendarInput;
