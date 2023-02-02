import React, { useEffect, useState } from "react";
import ToDoMapItem from "./ToDoMapItem";
import "./ToDoList.scss";

const ToDoNotEmpty = ({
  doneList,
  todoList,
  offset,
  limit,

  // menu,
  // setShowUpdate,
  // setMenu,
  // showUpdate,
}) => {
  console.log("notEmpty", todoList);

  const [detailId, setDetailId] = useState();

  const [doneMem, setDoneMem] = useState();
  const [doneDate, setDoneDate] = useState();
  const [doneMemo, setDoneMemo] = useState();

  useEffect(() => {
    setDetailId(todoList.todo_seq);
  });

  return (
    <>
      {todoList
        // .filter((item, idx) => idx <= 6)
        .slice(offset, offset + limit)
        .map((item, idx) => (
          <ToDoMapItem
            doneList={doneList}
            item={item}
            // todoList={todoList}
            // onDetail={onDetail}
            // toDoCom={toDoCom}
            // menu={menu}
            // setShowUpdate={setShowUpdate}
            // setMenu={setMenu}
            // showUpdate={showUpdate}
            key={idx}
          />
        ))}
      <div className="todoDetail">
        <div>
          <div className="todoCom-mem">{doneMem} 완료</div>
          <div className="todoCom-img">{detailId}</div>
          <div className="todoCom-time">완료 : {doneDate}</div>
          <div className="todoCom-memo">메모 {doneMemo}</div>
        </div>
      </div>
    </>
  );
};

export default ToDoNotEmpty;
