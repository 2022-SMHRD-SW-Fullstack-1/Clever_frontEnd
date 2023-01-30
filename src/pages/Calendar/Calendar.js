import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useState, useRef, useEffect } from "react";
import "./Calendar.scss";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import ApiService from "../../ApiService";
import CalendarInput from "./CalendarInput";
import CalendarChart from "./CalendarChart";

const Calendar = () => {
  var groupSeq = Number(sessionStorage.getItem("group_seq"));

  var copyTodayWorkerList = [];
  var copySelectedWorkerList = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  var today = String(year + "-" + month + 1 + "-" + day);
  const [mem_name, setmem_name] = useState("");
  const apiKey = "AIzaSyAHG8iIVB4i-q5o7KRjdvKcwVc67JzZEWc";
  const [selectedDate, setSelectedDate] = useState(today);
  const arrAddList = useRef([]);
  const [thisDayListState, setThisDayListState] = useState([]);
  const [arrAddListState, setArrAddListState] = useState([]);
  const [todayWorkerList, setTodayWorkerList] = useState([]);
  const selectedList = useRef([]);
  const workerSchedule = useRef([]);
  const listConfirmation = useRef([]);
  const listReject = useRef([]);
  const rejectMemo = useRef();
  const scheduleInfo = useRef([]);
  var copyScheduleInfo = [];
  var copySchedule = [];
  var copyModificationAllInfo = [];
  const modificationAllInfo = useRef([]);
  const modificaionInfo = useRef([]);
  const workerInfo = useRef([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  useEffect(() => {
    getSchedule(groupSeq);
  }, []);

  const confirmModification = (e) => {
    ApiService.confirmModification(e).then(() => {
      getSchedule(groupSeq);
    });
  };
  const rejectModification = (e) => {
    ApiService.rejectModification(e).then(() => {
      getSchedule(groupSeq);
    });
  };

  const getModification = (groupSeq) => {
    modificaionInfo.current = [];
    ApiService.getModification(groupSeq).then((res) => {
      res.data.map((item) => {
        modificaionInfo.current.push({
          title: "🔴",
          date: item.ch_date,
          color: "transparent",
          textColor: "tramsparent",
        });
      });
      modificationAllInfo.current = [];
      modificationAllInfo.current = res.data;
    });
    getWorkerList(groupSeq);
  };

  const getWorkerList = (e) => {
    workerInfo.current = [];
    ApiService.getWorkerList(e).then((res) => {
      workerInfo.current = res.data;
      workerInfo.current.unshift({ mem_name: "전체" });

      console.log(workerInfo.current);
    });
  };

  const getSchedule = (e) => {
    getModification(e);
    setSelectedDate(today);
    console.log("겟쉐줄");

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
            title: `${item.mem_name}${item.att_sche_start_time.substring(
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

  const updateSchedul = (e) => {
    ApiService.updateSchedul(e)
      .then(() => {
        console.log("업데이트성공");
        getSchedule(groupSeq);
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

  copyModificationAllInfo = [...modificationAllInfo.current];

  copySelectedWorkerList = [...selectedList.current];

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
            })
          : console.log();
      }
    }

    arrAddList.current = [];
    setSelectedDate(String(e));
  };

  const planModification = () => {
    var result = copySelectedWorkerList.map((item, index) => {
      return (
        <tr key={`${item.mem_name}${index}`}>
          <select
            id="select"
            onChange={(e) => {
              copySelectedWorkerList[index].mem_name = e.target.value;
              copySelectedWorkerList[index].group_seq = groupSeq;
            }}
            defaultValue={item.mem_name}
          >
            {workerListRendering()}
          </select>
          <input
            id="inputTime"
            type="time"
            defaultValue={item.att_sche_start_time}
            onChange={(e) => {
              copySelectedWorkerList[index].att_sche_start_ime = e.target.value;
            }}
          />
          -
          <input
            id="inputTime"
            type="time"
            defaultValue={item.att_sche_end_time}
            onChange={(e) => {
              copySelectedWorkerList[index].att_sche_end_time = e.target.value;
            }}
          />
          <button
            id="delete"
            onClick={() => {
              selectedList.current.splice(index, 1);
              setThisDayListState([selectedList.current]);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });

    return result;
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
          // selectedList.current = [];
          for (var i = 0; i < copyScheduleInfo[0].length; i++) {
            copyScheduleInfo[0][i].mem_name === e.target.value
              ? workerSchedule.current.push({
                  title: `${String(
                    copyScheduleInfo[0][i].att_sche_start_time
                  ).substring(0, 5)}-${String(
                    copyScheduleInfo[0][i].att_sche_end_time
                  ).substring(0, 5)}`,
                  date: `${copyScheduleInfo[0][i].att_date}`,
                  color: "whitesmoke",
                  textColor: "black",
                })
              : console.log();
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

  const addModification = () => {
    let result = arrAddList.current.map((item, index) => {
      return (
        <tr key={uuidv4()}>
          <select
            id="select"
            defaultValue={item.mem_name}
            onChange={(e) => {
              console.log(e.target.value);
              for (var i = 0; i < workerInfo.current.length; i++) {
                if (e.target.value === workerInfo.current[i].mem_name) {
                  arrAddList.current[index].mem_name = e.target.value;
                  arrAddList.current[index].mem_id =
                    workerInfo.current[i].mem_id;
                }
              }
            }}
          >
            {workerListRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.att_sche_start_time}
            onChange={(e) => {
              arrAddList.current[index].att_sche_start_time = e.target.value;
            }}
          />
          ~
          <input
            defaultValue={item.att_sche_end_time}
            type="time"
            onChange={(e) => {
              arrAddList.current[index].att_sche_end_time = e.target.value;
            }}
          />
          <button
            id="delete"
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
      mem_name: "",
      att_sche_start_time: "",
      att_sche_end_time: "",
      mem_id: "",
      group_seq: groupSeq,
    });
  };

  const submitModification = () => {
    var updateInfo = copySelectedWorkerList.concat(arrAddList.current);

    for (var i = 0; i < updateInfo.length; i++) {
      updateInfo[i]["att_date"] = selectedDate;
    }

    arrAddList.current = [];

    if (updateInfo.length > 0) {
      updateSchedul(updateInfo);
    } else {
      updateInfo = [
        {
          att_date: selectedDate,
          group_seq: groupSeq,
          mem_id: "010",
          att_sche_start_time: "10:00",
          att_sche_end_time: "10:00",
        },
      ];

      updateSchedul(updateInfo);
    }
    console.log("최종배열", updateInfo);
  };

  const clickDetail = () => {
    for (var i = 0; i < copySchedule.length; i++) {
      if (copySchedule[i].date === selectedDate.replace(/-/gi, "")) {
        return copySchedule[i].mem_name;
      }
    }
  };

  const planSchedule = () => {
    var result = copySelectedWorkerList.map((item, index) => {
      return (
        <>
          <tr key={uuidv4}>
            <th> 계획</th>
            <th>{item.mem_name}</th>
            <th>{item.att_sche_start_time.substring(0, 5)}</th>
            <th>{item.att_sche_end_time.substring(0, 5)}</th>
          </tr>

          <tr key={uuidv4}>
            <th> 실제 </th>
            <th>{item.mem_name}</th> <th>{item.att_real_start_time}</th>
            <th>{item.att_real_end_time}</th>
          </tr>
          <br></br>
        </>
      );
    });

    return (
      <>
        <table width="100%">
          <tr>
            <th>
              <h2>구분</h2>
            </th>
            <th>
              <h2>이름</h2>
            </th>
            <th>
              <h2>출근</h2>
            </th>
            <th>
              <h2>퇴근</h2>
            </th>
          </tr>

          {result}
        </table>
      </>
    );
  };

  const showModificaion = () => {
    if (selectedDate < today) return planSchedule();
    else {
      return planModification();
    }
  };

  const addButton = () => {
    if (selectedDate < today) {
      return;
    } else {
      return (
        <button
          id="registerButton"
          onClick={() => {
            pushArrAddList();
            setArrAddListState([arrAddList.current]);
          }}
        >
          추가
        </button>
      );
    }
  };

  const registerButton = () => {
    if (selectedDate < today) {
      return;
    } else {
      return (
        <input
          id="registerButton"
          type="submit"
          name="등록"
          value="등록"
          onClick={submitModification}
        />
      );
    }
  };

  const modificationAnser = () => {
    listReject.current = [];
    listConfirmation.current = [];
    var result = copyModificationAllInfo.map((item, index) => {
      if (selectedDate === copyModificationAllInfo[index].ch_date) {
        return (
          <table width="100%">
            <br />
            <br />
            <h2 style={{ color: "red" }}>근무변경요청</h2>
            <tr key={uuidv4} width="100%">
              <th>
                {" "}
                {item.mem_name} :{item.ch_start_time.substring(0, 5)}-
                {item.ch_end_time.substring(0, 5)}
              </th>
            </tr>
            <tr key={uuidv4} width="100%">
              <th>
                <input
                  id="inputText"
                  width="100%"
                  type="textArea"
                  placeholder="거절시 사유를 적어주세요."
                  onChange={(e) => {
                    rejectMemo.current = e.target.value;
                    console.log(rejectMemo.current);
                  }}
                ></input>
              </th>
            </tr>
            <tr>
              <button
                id="registerButton"
                onClick={() => {
                  listConfirmation.current.push({
                    ch_seq: item.ch_seq,
                    att_seq: item.att_seq,
                    ch_approve: "Y",
                    mem_id: item.mem_id,
                    ch_start_time: item.ch_start_time,
                    ch_end_time: item.ch_end_time,
                    ch_date: item.ch_date,
                    group_seq: item.group_seq,
                  });

                  confirmModification(listConfirmation.current);
                }}
              >
                승락
              </button>
              <button
                id="registerButton"
                onClick={() => {
                  listReject.current.push({
                    ch_seq: item.ch_seq,
                    ch_approve: "N",
                    ch_reject_memo: rejectMemo.current,
                  });
                  rejectModification(listReject.current);
                }}
              >
                거절
              </button>
            </tr>
          </table>
        );
      }
    });
    return result;
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
            setModalOpen={setModalOpen}
            getWorkerList={workerInfo.current}
            getSchedule={getSchedule}
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

      <div className="calendarDetailContainer">
        <div className="modification">
          <table style={{ width: "100%" }}>
            <tr>
              <h1>{selectedDate}</h1>
            </tr>
            <tr align="left">
              <h3>
                {/* {mem_name} */}
                {clickDetail()}
              </h3>
            </tr>
          </table>
        </div>
        <div className="scheduleModification">
          {showModificaion()}
          {addModification()}
          {addButton()}
          {registerButton()}
          <tr></tr>
        </div>
        <div className="special">{modificationAnser()}</div>
        <button onClick={showChart}>직원차트</button>
      </div>
      <div className="calendarchart">
        <CalendarChart
          setModalOpen={setModalOpen}
          getWorkerList={workerInfo.current}
          getSchedule={getSchedule}
        />
      </div>
    </div>
  );
};

export default Calendar;
