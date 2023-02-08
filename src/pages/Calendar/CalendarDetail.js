import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ApiService from "../../ApiService";
import "./CalendarDetail.scss";
import add from "../../image/add.png";

const CalendarDetail = ({
  today,

  selectedList,
  getSchedule,
  groupSeq,
  modificationAllInfo,
  selectedDate,
  workerListRendering,
  workerInfo,
}) => {
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
  const updateInfo = useRef([]);

  useEffect(() => {
    planModification();
    setRendering(0);
  }, [selectedList]);

  const updateSchedul = (e) => {
    ApiService.updateSchedul(e)
      .then((res) => {
        alert("등록이 완료되었습니다.");
        getSchedule(groupSeq);
        planModification();
        setRendering(0);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const render = () => {
    setRendering(0);
  };

  const submitModification = () => {
    updateInfo.current = selectedList.concat(copyArrAddList.current);

    for (var i = 0; i < updateInfo.current.length; i++) {
      updateInfo.current[i]["att_date"] = selectedDate;
    }

    copyArrAddList.current = [];

    console.log("길이", updateInfo.current.length);
    if (updateInfo.current.length > 0) {
      var checkForm = 0;
      for (var i = 0; i < updateInfo.current.length; i++) {
        if (
          updateInfo.current[i].mem_name === "" ||
          updateInfo.current[i].mem_name === "전체" ||
          updateInfo.current[i].att_sche_start_time === "" ||
          updateInfo.current[i].att_sche_end_time === ""
        )
          checkForm += 1;
      }
      if (checkForm > 0) {
        alert("양식에 맞추어 다시 작성 해 주세요.");
      } else {
        updateSchedul(updateInfo.current);
      }
    } else {
      updateInfo.current = [
        {
          att_date: selectedDate,
          group_seq: groupSeq,
          mem_id: "010",
          att_sche_start_time: "10:00",
          att_sche_end_time: "10:00",
        },
      ];

      updateSchedul(updateInfo.current);
    }
    console.log("최종", updateInfo.current);
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
                승인
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
              selectedList[index].att_sche_start_time = e.target.value;
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
            <th>{item.mem_name}</th>{" "}
            <th>{item.att_real_start_time.substring(0, 5)}</th>
            <th>{item.att_real_end_time.substring(0, 5)}</th>
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
  const addModification = () => {
    let result = copyArrAddList.current.map((item, index) => {
      return (
        <tr key={uuidv4()}>
          <select
            id="select"
            defaultValue={item.mem_name}
            onChange={(e) => {
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
        // <button
        //   id="addButton"
        //   onClick={() => {
        //     pushArrAddList();
        //     setArrAddListState([copyArrAddList.current]);
        //   }}
        // >
        //   +
        // </button>

        <div
          className="addButton"
          onClick={() => {
            pushArrAddList();
            setArrAddListState([copyArrAddList.current]);
          }}
        >
          <img src={add} id="addButton" alt="add btn" />
          <div className="add">근무자 추가</div>
        </div>
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
            <h3>{clickDetail()}</h3>
          </tr>
        </table>
      </div>
      <div className="scheduleModification">
        {addButton()}
        {showModificaion()}
        {addModification()}

        <div> {registerButton()}</div>

        <tr></tr>
      </div>
      <div className="special">{modificationAnser()}</div>
    </div>
  );
};

export default CalendarDetail;
