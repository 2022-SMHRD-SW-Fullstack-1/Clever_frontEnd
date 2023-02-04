import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useState, useRef, useEffect } from "react";
import "./Calendar.scss";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";
import ApiService from "../../ApiService";
import CalendarInput from "./CalendarInput";
import CalendarChart from "./CalendarChart";
import CalendarDetail from "./CalendarDetail";

const Calendar = () => {
  var groupSeq = Number(sessionStorage.getItem("group_seq"));

  var copyTodayWorkerList = [];

  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  var today = year + "-" + month + "-" + day;

  const [mem_name, setmem_name] = useState("");
  const apiKey = "AIzaSyAHG8iIVB4i-q5o7KRjdvKcwVc67JzZEWc";
  const [selectedDate, setSelectedDate] = useState(today);
  const arrAddList = useRef([]);

  const [todayWorkerList, setTodayWorkerList] = useState([]);
  const selectedList = useRef([]);
  const workerSchedule = useRef([]);

  const scheduleInfo = useRef([]);
  var copyScheduleInfo = [];

  const modificationAllInfo = useRef([]);
  const modificaionInfo = useRef([]);
  const workerInfo = useRef([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const changeSchedul = useRef([]);
  const completeList = useRef({});
  const todoInfoList = useRef({});

  useEffect(() => {
    getSchedule(groupSeq);
  }, []);

  const getModification = (groupSeq) => {
    modificaionInfo.current = [];
    ApiService.getModification(groupSeq).then((res) => {
      changeSchedul.current = [];
      modificationAllInfo.current = [];
      res.data.map((item, index) => {
        if (res.data[index].ch_approve === null) {
          modificaionInfo.current.push({
            title: "🔴",
            date: item.ch_date,
            color: "transparent",
            textColor: "tramsparent",
          });

          modificationAllInfo.current.push(item);
        }
      });
      changeSchedul.current = res.data;
    });
    getWorkerList(groupSeq);
  };

  const getWorkerList = (e) => {
    ApiService.getWorkerList(e).then((res) => {
      workerInfo.current = res.data;
      workerInfo.current.unshift({ mem_name: "전체" });
    });
  };
  const getTodoInfo = () => {
    ApiService.getTodoInfo().then((res) => {
      todoInfoList.current = res.data;
      console.log("투두", todoInfoList.current);
    });
  };
  const getComplete = () => {
    ApiService.getComplete().then((res) => {
      completeList.current = res.data;
      console.log("컴플리트", completeList.current);
    });
  };
  const getSchedule = (e) => {
    getModification(e);
    setSelectedDate(today);
    getTodoInfo();
    getComplete();

    ApiService.getSchedule(groupSeq)
      .then((res) => {
        scheduleInfo.current = [...res.data];

        selectedList.current = [];
        var result = res.data.map((item, index) => {
          item.att_date === today
            ? selectedList.current.push({
                mem_name: item.mem_name,
                mem_id: item.mem_id,
                att_sche_start_time: item.att_sche_start_time.substring(0, 5),
                att_sche_end_time: item.att_sche_end_time.substring(0, 5),
                att_real_start_time: item.att_real_start_time,
                att_real_end_time: item.att_real_end_time,
                att_seq: item.att_seq,
                group_seq: item.group_seq,
              })
            : console.log();

          return {
            title: `${item.mem_name} ${item.att_sche_start_time.substring(
              0,
              5
            )}-${String(item.att_sche_end_time).substring(0, 5)}`,
            date: item.att_date,
            color: "whitesmoke",
            textColor: "black",
            beforeAll: "false",
          };
        });

        setTodayWorkerList(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  workerSchedule.current.length > 0
    ? (copyTodayWorkerList = [...workerSchedule.current])
    : (copyTodayWorkerList = [...todayWorkerList]);

  for (var i = 0; i < modificaionInfo.current.length; i++) {
    copyTodayWorkerList.push(modificaionInfo.current[i]);
  }

  copyScheduleInfo = [scheduleInfo.current];

  const clickDate = (e) => {
    selectedList.current = [];
    if (mem_name === "전체" || mem_name === "") {
      for (var i = 0; i < copyScheduleInfo[0].length; i++) {
        copyScheduleInfo[0][i].att_date === e
          ? selectedList.current.push({
              mem_name: copyScheduleInfo[0][i].mem_name,
              att_sche_start_time: copyScheduleInfo[0][i].att_sche_start_time,
              att_sche_end_time: copyScheduleInfo[0][i].att_sche_end_time,
              mem_id: copyScheduleInfo[0][i].mem_id,
              group_seq: groupSeq,
              att_real_start_time: copyScheduleInfo[0][i].att_real_start_time,
              att_real_end_time: copyScheduleInfo[0][i].att_real_end_time,
              att_seq: copyScheduleInfo[0][i].att_seq,
            })
          : console.log();
      }
    } else {
      for (var i = 0; i < copyScheduleInfo[0].length; i++) {
        copyScheduleInfo[0][i].att_date === e &&
        copyScheduleInfo[0][i].mem_name === mem_name
          ? selectedList.current.push({
              mem_name: copyScheduleInfo[0][i].mem_name,
              att_sche_start_time: copyScheduleInfo[0][i].att_sche_start_time,
              att_sche_end_time: copyScheduleInfo[0][i].att_sche_end_time,
              mem_id: copyScheduleInfo[0][i].mem_id,
              group_seq: groupSeq,
              att_real_start_time: copyScheduleInfo[0][i].att_real_start_time,
              att_real_end_time: copyScheduleInfo[0][i].att_real_end_time,
              att_seq: copyScheduleInfo[0][i].att_seq,
            })
          : console.log();
      }
    }

    arrAddList.current = [];
    setSelectedDate(String(e));
  };

  const workerListRendering = () => {
    var result = workerInfo.current.map((item, index) => {
      return <option key={index}>{item.mem_name}</option>;
    });
    return result;
  };

  const selectWorker = () => {
    return (
      <select
        id="selectworker"
        onChange={(e) => {
          workerSchedule.current = [];

          for (var i = 0; i < copyScheduleInfo[0].length; i++) {
            if (copyScheduleInfo[0][i].mem_name === e.target.value) {
              workerSchedule.current.push({
                title: `${String(
                  copyScheduleInfo[0][i].att_sche_start_time
                ).substring(0, 5)}-${String(
                  copyScheduleInfo[0][i].att_sche_end_time
                ).substring(0, 5)}`,
                date: `${copyScheduleInfo[0][i].att_date}`,
                color: "whitesmoke",
                textColor: "black",
              });
            } else if (e.target.value !== "전체") {
              workerSchedule.current.push({
                title: "",
                date: "",
                color: "whitesmoke",
                textColor: "black",
              });
            }

            // copyScheduleInfo[0][i].mem_name === e.target.value
            //   ? workerSchedule.current.push({
            //       title: `${String(
            //         copyScheduleInfo[0][i].att_sche_start_time
            //       ).substring(0, 5)}-${String(
            //         copyScheduleInfo[0][i].att_sche_end_time
            //       ).substring(0, 5)}`,
            //       date: `${copyScheduleInfo[0][i].att_date}`,
            //       color: "whitesmoke",
            //       textColor: "black",
            //     })
            //   : workerSchedule.current.push({
            //       title: "",
            //       date: "",
            //       color: "whitesmoke",
            //       textColor: "black",
            //     });
          }
          selectedList.current = [];
          if (e.target.value === "전체") {
            for (var i = 0; i < copyScheduleInfo[0].length; i++) {
              copyScheduleInfo[0][i].att_date === selectedDate
                ? selectedList.current.push({
                    mem_name: copyScheduleInfo[0][i].mem_name,
                    att_sche_start_time:
                      copyScheduleInfo[0][i].att_sche_start_time,
                    att_sche_end_time: copyScheduleInfo[0][i].att_sche_end_time,
                    mem_id: copyScheduleInfo[0][i].mem_id,
                    group_seq: groupSeq,
                    att_real_start_time:
                      copyScheduleInfo[0][i].att_real_start_time,
                    att_real_end_time: copyScheduleInfo[0][i].att_real_end_time,
                    att_seq: copyScheduleInfo[0][i].att_seq,
                  })
                : console.log();
            }
          } else {
            for (var i = 0; i < copyScheduleInfo[0].length; i++) {
              copyScheduleInfo[0][i].att_date === selectedDate &&
              copyScheduleInfo[0][i].mem_name === e.target.value
                ? selectedList.current.push({
                    mem_name: copyScheduleInfo[0][i].mem_name,
                    att_sche_start_time:
                      copyScheduleInfo[0][i].att_sche_start_time,
                    att_sche_end_time: copyScheduleInfo[0][i].att_sche_end_time,
                    mem_id: copyScheduleInfo[0][i].mem_id,
                    group_seq: groupSeq,
                    att_real_start_time:
                      copyScheduleInfo[0][i].att_real_start_time,
                    att_real_end_time: copyScheduleInfo[0][i].att_real_end_time,
                    att_seq: copyScheduleInfo[0][i].att_seq,
                  })
                : console.log();
            }
          }

          setmem_name(e.target.value);
        }}
      >
        {workerListRendering()}
      </select>
    );
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const showChart = () => {
    setChartOpen(true);
  };

  return (
    <div className="container">
      <div className="fullcalendarContainer">
        {selectWorker()}
        <button id="moveButton" onClick={showModal}>
          일정등록
        </button>
        {modalOpen && (
          <CalendarInput
            todayYear={date.getFullYear()}
            todayMonth={date.getMonth() + 1}
            todayDay={date.getDate()}
            setModalOpen={setModalOpen}
            getWorkerList={workerInfo.current}
            getSchedule={getSchedule}
          />
        )}

        <button id="chartButton" onClick={showChart}>
          차트보기
        </button>
        {chartOpen && (
          <CalendarChart
            setChartOpen={setChartOpen}
            getWorkerList={workerInfo.current}
            getSchedule={[...scheduleInfo.current]}
            changeSchedul={[...changeSchedul.current]}
            workerListRendering={workerListRendering}
            today={today}
            getComplete={completeList.current}
            getTodoInfo={todoInfoList.current}
          />
        )}
        <FullCalendar
          dafaultView="dayGriMonth"
          plugins={[daygrid, googleCalendar, interaction]}
          googleCalendarApiKey={apiKey} // apiKey
          locale=""
          selectable={true}
          height={700}
          dayMaxEventRows={3}
          fixedWeekCount={false}
          eventSources={[
            {
              googleCalendarId:
                "ko.south_korea#holiday@group.v.calendar.google.com",
              color: "orange",
              textColor: "white",
              defaultAllDay: true,
            },
          ]}
          events={copyTodayWorkerList}
          eventOrderStrict={false}
          dateClick={function (info) {
            clickDate(info.dateStr);
          }}
          dayHeaderContent={function (date) {
            let weekList = ["일", "월", "화", "수", "목", "금", "토"];
            return weekList[date.dow];
          }}
          titleFormat={function (date) {
            return `${date.date.year}년 ${date.date.month + 1}월`;
          }}
        />
      </div>
      <CalendarDetail
        today={today}
        selectedList={selectedList.current}
        getSchedule={getSchedule}
        groupSeq={groupSeq}
        modificationAllInfo={modificationAllInfo.current}
        selectedDate={selectedDate}
        workerListRendering={workerListRendering}
        workerInfo={workerInfo.current}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default Calendar;
