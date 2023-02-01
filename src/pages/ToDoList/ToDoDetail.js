import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ToDoDetail.scss";

const ToDoDetail = ({ item, changeDone }) => {
  // console.log("todoDetail", item2);

  const today = new Date();

  const [detailId, setDetailId] = useState([]);
  const [toDoDone, setToDoDone] = useState();
  const [doneMem, setDoneMem] = useState();
  const [doneDate, setDoneDate] = useState();

  useEffect(() => {
    setDetailId(item.todo_seq);

    axios
      .post("/todolist/tododetail", {
        todo_seq: detailId,
      })
      .then((res) => {
        // console.log("완료", res.data);
        // if (res.data.length >= 1) {
        //   // console.log("detailId", detailId);
        //   setDoneMem(item.mem_id);
        //   setDoneDate(item.todo_dt);
        //   // changeDone("완료");
        //   // console.log(detailId);
        // } else if (res.data.length === 0) {
        //   alert("미완료된 할 일 입니다.");
        // }
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  });

  // console.log("done", changeDone());

  return (
    <div>
      <div className="todoDetail">
        <div className="todoCom-mem">{doneMem} 완료</div>
        <div className="todoCom-img">{detailId}</div>
        <div className="todoCom-time">완료 : {doneDate}</div>
        <div className="todoCom-memo"> 메모</div>
      </div>
    </div>
  );
};

export default ToDoDetail;
