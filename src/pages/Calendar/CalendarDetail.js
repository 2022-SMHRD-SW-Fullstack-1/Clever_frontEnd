import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ApiService from "../../ApiService";
import "./CalendarDetail.scss";

const CalendarDetail = ({
  today,
  modificationInfo,
  selectedList,
  getSchedule,
  groupSeq,
  modificationAllInfo,
  arrAddList,
  selectedDate,
  workerListRendering,
  workerInfo,
}) => {
  //   console.log("today", today);
  console.log("selectedList", selectedList);
  //   console.log("groupSeq", groupSeq);
  //   console.log("modificationAllInfo", modificationAllInfo);
  //   console.log("arrAddList", arrAddList);
  //   console.log("selectedDate", selectedDate);
  //   console.log("workerListRendering", workerListRendering);
  //   console.log("workerInfo", workerInfo);

  var copySchedule = [];
  const renderObject = useRef([]);
  const listConfirmation = useRef([]);
  const listReject = useRef([]);
  const rejectMemo = useRef();
  var copySelectedWorkerList = [];
  var copyModificationAllInfo = [];
  const [thisDayListState, setThisDayListState] = useState([]);
  const [arrAddListState, setArrAddListState] = useState([]);
  const [rendering, setRendering] = useState([]);
  const renderRef = useRef(0);
  copyModificationAllInfo = [...modificationAllInfo];
  copySelectedWorkerList = [...selectedList];
  renderObject.current = [...selectedList];
  const copyArrAddList = useRef([]);
  console.log("카피셀렉티드", copySelectedWorkerList);

  useEffect(() => {
    console.log("유스이펙트", selectedList);
    planModification();
    setRendering(0);
  }, [selectedList]);

  const updateSchedul = (e) => {
    ApiService.updateSchedul(e)
      .then(() => {
        console.log("업데이트성공");
        getSchedule(groupSeq);
        planModification();
        setRendering(0);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const render = () => {
    console.log("렌더링");
    setRendering(0);
  };

  const submitModification = () => {
    var updateInfo = selectedList.concat(copyArrAddList.current);

    for (var i = 0; i < updateInfo.length; i++) {
      updateInfo[i]["att_date"] = selectedDate;
    }

    copyArrAddList.current = [];

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
  const planModification = () => {
    console.log("플랜", renderObject.current);

    var result = renderObject.current.map((item, index) => {
      return (
        <tr
          key={`${item.mem_name}+${index}+${item.mem_id}+${item.att_sche_start_time}+${item.att_sche_end_time}`}
        >
          <select
            defaultValue={item.mem_name}
            id="select"
            onChange={(e) => {
              renderObject.current[index].mem_name = e.target.value;
              renderObject.current[index].group_seq = groupSeq;
            }}
          >
            {workerListRendering()}
          </select>
          <input
            id="inputTime"
            type="time"
            defaultValue={`${item.att_sche_start_time}`}
            onChange={(e) => {
              selectedList[index].att_sche_start_ime = e.target.value;
            }}
          />
          -
          <input
            id="inputTime"
            type="time"
            defaultValue={`${item.att_sche_end_time}`}
            onChange={(e) => {
              selectedList[index].att_sche_end_time = e.target.value;
            }}
          />
          <button
            id="delete"
            onClick={() => {
              selectedList.splice(index, 1);
              setThisDayListState([selectedList]);
            }}
          >
            삭제
          </button>
        </tr>
      );
    });

    return result;
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
    console.log("오늘", today);
    console.log("선택", selectedDate);
    console.log("결과", selectedDate < today);
    if (selectedDate < today) return planSchedule();
    else {
      return planModification();
    }
  };
  const addModification = () => {
    console.log("에드", renderObject.current);
    let result = copyArrAddList.current.map((item, index) => {
      return (
        <tr key={uuidv4()}>
          <select
            id="select"
            defaultValue={item.mem_name}
            onChange={(e) => {
              console.log(e.target.value);
              for (var i = 0; i < workerInfo.length; i++) {
                if (e.target.value === workerInfo[i].mem_name) {
                  copyArrAddList.current[index].mem_name = e.target.value;
                  copyArrAddList.current[index].mem_id = workerInfo[i].mem_id;
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
              copyArrAddList.current[index].att_sche_start_time =
                e.target.value;
            }}
          />
          ~
          <input
            defaultValue={item.att_sche_end_time}
            type="time"
            onChange={(e) => {
              copyArrAddList.current[index].att_sche_end_time = e.target.value;
            }}
          />
          <button
            id="delete"
            onClick={() => {
              copyArrAddList.current.splice(index, 1);
              setArrAddListState([copyArrAddList.current]);
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
    copyArrAddList.current.push({
      mem_name: "",
      att_sche_start_time: "",
      att_sche_end_time: "",
      mem_id: "",
      group_seq: groupSeq,
    });
  };
  const clickDetail = () => {
    for (var i = 0; i < copySchedule.length; i++) {
      if (copySchedule[i].date === selectedDate.replace(/-/gi, "")) {
        return copySchedule[i].mem_name;
      }
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
            setArrAddListState([copyArrAddList.current]);
          }}
        >
          +
        </button>
      );
    }
  };
  return (
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
        {addButton()}
        {showModificaion()}
        {addModification()}

        {registerButton()}

        <tr></tr>
      </div>
      <div className="special">{modificationAnser()}</div>
    </div>
  );
};

export default CalendarDetail;
