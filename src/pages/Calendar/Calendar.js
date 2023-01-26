import daygrid from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useState, useRef, useEffect } from "react";
// import "../../styles/calendar.css";
import googleCalendar from "@fullcalendar/google-calendar";
import interaction from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import ApiService from "../../ApiService";

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
  var copyWorkerInfo = [];
  const modificationAllInfo = useRef([]);
  const modificaionInfo = useRef([]);
  const workerInfo = useRef([]);

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
          title: "근무수정요청!!",
          date: item.ch_date,
          color: "red",
          textColor: "yellow",
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
    });
  };

  const getSchedule = (groupSeq) => {
    getModification(groupSeq);

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
            )}~${String(item.att_sche_end_time).substring(0, 5)}`,
            date: item.att_date,
            color: "gray",
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

  const deleteSchedul = (e) => {
    ApiService.deleteSchedul(e)
      .then((res) => {
        console.log("삭제 성공");

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
  // copyWorkerInfo = [...workerInfo.current];
  // console.log("워커인포 :", copyWorkerInfo);

  copyScheduleInfo = [scheduleInfo.current];

  // var workerList = copyScheduleInfo[0].filter(
  //   (arr, index, callback) =>
  //     index === callback.findIndex((t) => t.mem_name === arr.mem_name)
  // );
  // workerList.splice(0, 0, {
  //   mem_name: "선택",
  //   att_sche_start_time: "",
  //   att_sche_end_time: "",
  // });

  const clickDate = (e) => {
    selectedList.current = [];
    for (var i = 0; i < copyScheduleInfo[0].length; i++) {
      copyScheduleInfo[0][i].att_date === e
        ? selectedList.current.push({
            mem_name: copyScheduleInfo[0][i].mem_name,
            att_sche_start_time: copyScheduleInfo[0][i].att_sche_start_time,
            att_sche_end_time: copyScheduleInfo[0][i].att_sche_end_time,
            mem_id: copyScheduleInfo[0][i].mem_id,
          })
        : console.log();
    }

    arrAddList.current = [];
    setSelectedDate(String(e));
  };

  const planModification = () => {
    var result = copySelectedWorkerList.map((item, index) => {
      return (
        <tr key={`${item.mem_name}${index}`}>
          <select
            onChange={(e) => {
              copySelectedWorkerList[index].mem_name = e.target.value;
            }}
            defaultValue={item.mem_name}
          >
            {workerListRendering()}
          </select>
          <input
            type="time"
            defaultValue={item.att_sche_start_time}
            onChange={(e) => {
              copySelectedWorkerList[index].att_sche_start_ime = e.target.value;
            }}
          />
          ~
          <input
            type="time"
            defaultValue={item.att_sche_end_time}
            onChange={(e) => {
              copySelectedWorkerList[index].att_sche_end_time = e.target.value;
            }}
          />
          <button
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
        onChange={(e) => {
          workerSchedule.current = [];
          for (var i = 0; i < copyScheduleInfo[0].length; i++) {
            copyScheduleInfo[0][i].mem_name === e.target.value
              ? workerSchedule.current.push({
                  title: `${String(
                    copyScheduleInfo[0][i].att_sche_start_time
                  ).substring(0, 5)}-${String(
                    copyScheduleInfo[0][i].att_sche_end_time
                  ).substring(0, 5)}`,
                  date: `${copyScheduleInfo[0][i].att_date}`,
                  color: "gray",
                })
              : console.log();
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
    console.log("최종배열", updateInfo);
    arrAddList.current = [];

    if (updateInfo.length > 0) {
      deleteSchedul(selectedDate);
      updateSchedul(updateInfo);
    } else {
      deleteSchedul(selectedDate);
    }
  };

  const clickDetail = () => {
    for (var i = 0; i < copySchedule.length; i++) {
      if (copySchedule[i].date === selectedDate.replace(/-/gi, "")) {
        return copySchedule[i].mem_name;
      }
    }
  };

  const attendance = () => {
    if (selectedDate >= today) {
      var result = copySelectedWorkerList.map((item, index) => {
        return (
          <>
            <p> 이름 출근 퇴근</p>
            <tr key={uuidv4}>
              {" "}
              <td>
                {item.mem_name} {item.att_real_start_time}{" "}
                {item.att_real_end_time}
              </td>
            </tr>
          </>
        );
      });
      return result;
    } else {
      return;
    }
  };
  const planSchedule = () => {
    var result = copySelectedWorkerList.map((item, index) => {
      return (
        <>
          <tr key={uuidv4}>
            {" "}
            계획{" "}
            <td>
              {item.mem_name} {item.att_sche_start_time.substring(0, 5)}{" "}
              {item.att_sche_end_time.substring(0, 5)}
            </td>
          </tr>
          <tr key={uuidv4}>
            {" "}
            실제
            <td>
              {item.mem_name} {item.att_real_start_time}{" "}
              {item.att_real_end_time}
            </td>
          </tr>
        </>
      );
    });

    return result;
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
          type="submit"
          name="등록"
          value="등록"
          onClick={submitModification}
        ></input>
      );
    }
  };

  const modificationAnser = () => {
    listReject.current = [];
    listConfirmation.current = [];
    var result = copyModificationAllInfo.map((item, index) => {
      if (selectedDate === copyModificationAllInfo[index].ch_date) {
        return (
          <>
            <h3>근무변경요청</h3>
            <tr key={uuidv4}>
              {item.mem_name} :{item.ch_start_time.substring(0, 5)}~
              {item.ch_end_time.substring(0, 5)}
            </tr>
            <tr key={uuidv4}>
              <input
                type="text"
                onChange={(e) => {
                  rejectMemo.current = e.target.value;
                  console.log(rejectMemo.current);
                }}
              ></input>
            </tr>
            <tr>
              <button
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
                등록
              </button>
              <button
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
          </>
        );
      }
    });
    return result;
  };

  return (
    <div className="container">
      <div className="calendar">
        {selectWorker()}

        <FullCalendar
          dafaultView="dayGriMonth"
          plugins={[daygrid, googleCalendar, interaction]}
          googleCalendarApiKey={apiKey} // apiKey
          locale="ko" //한글 버전
          selectable={true}
          height={700}
          dayMaxEventRows={3}
          // timeGrid={1}
          // views={1}
          //이벤트
          eventSources={[
            {
              googleCalendarId:
                "ko.south_korea#holiday@group.v.calendar.google.com",

              textColor: "black",
            },
          ]}
          events={copyTodayWorkerList}
          eventRender={function (event, eventElement) {
            if (event.imageurl) {
              eventElement
                .find("div.fc-content")
                .prepend(
                  "<img src='" + event.imageurl + "' width='16' height='16'>"
                );
            }
          }}
          eventClick={function (info) {
            alert(info.date + info.event.title);
            info.el.style.borderColor = "yellow";
          }}
          dateClick={function (info) {
            clickDate(info.dateStr);
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
                {mem_name} {clickDetail()}
              </h3>
            </tr>
          </table>
        </div>
        <div>
          {showModificaion()}
          {addModification()}
          {addButton()}
          {registerButton()}

          <tr></tr>
        </div>
        <div>{attendance()}</div>

        <div className="special">{modificationAnser()}</div>
      </div>
      <a href="/calendarInput">등록하러가기</a>
    </div>
  );
};

export default Calendar;
