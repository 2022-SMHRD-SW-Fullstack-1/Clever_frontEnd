import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ToDoDetail.scss";

const ToDoDetail = ({ item }) => {
  console.log("item", item);
  const [detailId, setDetailId] = useState(item);

  useEffect(() => {
    // setDetailId(item);
    axios
      .post("/todolist/tododetail", {
        todo_seq: detailId,
      })
      .then((res) => {
        console.log("res", res.data);
        console.log(detailId);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  });

  return (
    <div className="todoDetail">
      <div className="todoCom-mem">담당자 완료</div>
      <div className="todoCom-img">{detailId}</div>
      <div className="todoCom-time">완료 : 완료 시간</div>
      <div className="todoCom-memo"> 메모</div>
    </div>
  );
};

export default ToDoDetail;
