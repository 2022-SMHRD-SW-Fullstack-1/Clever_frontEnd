import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useState, useRef, useEffect } from "react";
import "../../styles/calendar.css";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import ApiService from "../../ApiService";

const Calendar = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const today = year + "-" + month + 1 + "-" + day;
  const [workerName, setWorkerName] = useState("");
  const apiKey = "AIzaSyAHG8iIVB4i-q5o7KRjdvKcwVc67JzZEWc";
  const [selectedDate, setSelectecDate] = useState(today);
  let arrAddList = useRef([]);
  const [thisDayListState, setThisDayListState] = useState([]);
  const [arrAddListState, setArrAddListState] = useState([]);
  const workingTime = [{ arrive: "07:00", live: "18:00" }];
  const arrSchedule = [];
  const scheduleList = useRef([]);
  var copySchedule = [];
  console.log("count0");

  ApiService.getSchedule()
    .then((res) => {
      console.log("count2");
      res.data.map((item, index) => {
        scheduleList.current.push({
          title: `${item.mem_name}${item.att_sche_start_time}~${item.att_sche_end_time}`,
          date: item.att_date,
        });
      });
    })

    .catch((err) => {
      alert(err);
    });

  arrSchedule.push({ title: "15:00:00~16:00:00", date: "2023-01-18" });
  arrSchedule.push({ title: "15:00:00~16:00:00", date: "2023-01-18" });

  copySchedule = [...scheduleList.current];
  scheduleList.current = [];
  console.log("카피", copySchedule);
  console.log("받아온 일정", scheduleList.current);
  console.log("scheduleList", scheduleList[0]);
  console.log("arrSchedule", arrSchedule);
  console.log("비교결과 :", arrSchedule[0] === scheduleList[0]);

  var workerList = [
    { workerName: "선택", startTime: "16:10", endTime: "21:10" },
    {
      workerName: "박진형",
      startTime: "16:10",
      endTime: "21:10",
    },
    {
      workerName: "박형주",
      startTime: "09:10",
      endTime: "16:10",
    },
    {
      workerName: "나소연",
      startTime: "21:10",
      endTime: "04:10",
    },
    {
      workerName: "임아해",
      startTime: "04:10",
      endTime: "09:10",
    },
  ];

  const workerListRendering = () => {
    var result = workerList.map((item, index) => {
      return <option key={index}>{item.workerName}</option>;
    });
    return result;
  };

  console.log(arrSchedule);
  console.log("유저 : ", workerName);
  var thisDayList = useRef([
    {
      workerName: "박진형",
      startTime: "16:10",
      endTime: "21:10",
    },
    {
      workerName: "박형주",
      startTime: "09:10",
      endTime: "16:10",
    },
    {
      workerName: "나소연",
      startTime: "21:10",
      endTime: "04:10",
    },
  ]);

  const planModification = () => {
    var result = thisDayList.current.map((item, index) => {
      return (
        <tr key={`${item.workerName}${index}`}>
          <select
            onChange={(e) => {
              thisDayList.current[index].workerName = e.target.value;
            }}
            defaultValue={item.workerName}
          >
            {workerListRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.startTime}
            onChange={(e) => {
              thisDayList.current[index].startTime = e.target.value;
            }}
          />
          ~
          <input
            type="time"
            defaultValue={item.endTime}
            onChange={(e) => {
              thisDayList.current[index].endTime = e.target.value;
              console.log("투데이배열", thisDayList.current);
            }}
          />
          <button
            onClick={() => {
              thisDayList.current.splice(index, 1);
              setThisDayListState([thisDayList.current]);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });

    return result;
  };

  const addModification = () => {
    let result = arrAddList.current.map((item, index) => {
      return (
        <tr key={uuidv4()}>
          <select
            defaultValue={item.workerName}
            onChange={(e) => {
              arrAddList.current[index].workerName = e.target.value;
            }}
          >
            {workerListRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.startTime}
            onChange={(e) => {
              arrAddList.current[index].startTime = e.target.value;
            }}
          />
          ~
          <input
            defaultValue={item.endTime}
            type="time"
            onChange={(e) => {
              arrAddList.current[index].endTime = e.target.value;
            }}
          />
          <button
            onClick={() => {
              arrAddList.current.splice(index, 1);
              setArrAddListState([arrAddList.current]);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });
    return result;
  };

  const pushArrAddList = () => {
    arrAddList.current.push({
      workerName: "",
      startTime: "",
      endTime: "",
    });
  };

  const submitModification = () => {
    console.log("최종배열", thisDayList.current.concat(arrAddList.current));
  };
  console.log("상태 :", arrAddListState);

  const clickDetail = () => {
    for (var i = 0; i < arrSchedule.length; i++) {
      console.log("date", arrSchedule[i].date);
      console.log("selectedDate", selectedDate.replace(/-/gi, ""));
      if (arrSchedule[i].date === selectedDate.replace(/-/gi, "")) {
        return arrSchedule[i].title;
      }
    }
  };
  return (
    <div className="container">
      <div className="calendar">
        <select
          onChange={(e) => {
            setWorkerName(e.target.value);
          }}
        >
          {workerListRendering()}
        </select>
        <FullCalendar
          dafaultView="dayGriMonth"
          plugins={[daygrid, googleCalendar, interaction]}
          googleCalendarApiKey={apiKey} // apiKey
          locale="ko" //한글 버전
          selectable={true}
          height={700}
          //이벤트
          eventSources={[
            {
              googleCalendarId:
                "ko.south_korea#holiday@group.v.calendar.google.com",
              color: "red",
              textColor: "yellow",
            },
          ]}
          events={copySchedule}
          eventClick={function (info) {
            alert(info.date + info.event.title);
            info.el.style.borderColor = "red";
          }}
          dateClick={function (info) {
            setSelectecDate(info.dateStr);
          }}
          businessHours={[
            {
              daysOfWeek: [1, 2, 3],
            },
            {
              daysOfWeek: [4, 5], // Thursday, Friday
            },
          ]}
          titleFormat={[
            {
              // will produce something like "Tuesday, September 18, 2018"
              month: "long",
              year: "numeric",
              day: "numeric",
              weekday: "long",
            },
          ]}
        />
      </div>
      <div className="calendarDetail">
        <div className="table">
          <table>
            <tr align="center">
              <h1>{selectedDate}</h1>
            </tr>
            <tr align="left">
              <h3>
                {workerName} {clickDetail()}
              </h3>
            </tr>
            <button id="button1">수정하기</button>
          </table>
        </div>
        <div>
          {planModification()}
          {addModification()}

          <button
            onClick={() => {
              pushArrAddList();
              setArrAddListState([arrAddList.current]);
            }}
          >
            +추가
          </button>

          <input
            type="submit"
            name="등록"
            value="등록"
            onClick={submitModification}
          ></input>
          <tr></tr>
        </div>

        <div className="special">
          <h3>여기에 특이사항</h3>
          <br></br>
          <tr>
            <td>근무수정 : </td>
            <td> 08:00 </td>
            <td>~</td>
            <td>16:00</td>
          </tr>
        </div>
      </div>
      <a href="/calendarInput">등록하러가기</a>
      {console.log("count1")}
    </div>
  );
};

export default Calendar;
