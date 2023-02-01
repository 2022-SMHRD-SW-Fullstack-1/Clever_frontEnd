import React, { useState } from "react";
import ToDoMapItem from "./ToDoMapItem";
import "./ToDoList.scss";

const ToDoNotEmpty = ({
  doneList,
  offset,
  limit,
  menu,
  setShowUpdate,
  setMenu,
  showUpdate,
}) => {
  console.log("notEmpty", doneList);

  const [doneMem, setDoneMem] = useState();
  const [doneDate, setDoneDate] = useState();
  const [doneMemo, setDoneMemo] = useState();

  const [todoList, setTodoList] = useState([]);

  const [detailId, setDetailId] = useState();
  const [detailLIst, setDetailList] = useState([]);
  const [toDoRep, setToDoRep] = useState();

  const [editSeq, setEditSeq] = useState([]);

  const [toDoCom, setToDoCom] = useState("");

  const onDetail = (item) => {
    // setDetailItem(item.item);
    // setShowUpdate(true);

    setDetailList(item);
    setDetailId(item.todo_seq);

    setEditSeq(item.todo_seq);

    // {
    //   doneList.map((item, idx) => {
    //     if (item.todo_seq === detailId) {
    //       setDoneMem(item.mem_name);
    //       setDoneDate(item.cmpl_time);
    //       setDoneMemo(item.cmpl_memo);
    //       // setToDoCom(item.filter((item) => item.todo_seq === detailId));
    //     } else {
    //       setDoneMem("미");
    //       setDoneDate("");
    //       setDoneMemo("");
    //       // setToDoCom("미완료");
    //     }
    //   });
    // }
  };

  return (
    <>
      {todoList
        // .filter((item, idx) => idx <= 6)
        .slice(offset, offset + limit)
        .map((item, idx) => (
          <ToDoMapItem
            doneList={doneList}
            item={item}
            todoList={todoList}
            // onDetail={onDetail}
            toDoCom={toDoCom}
            menu={menu}
            setShowUpdate={setShowUpdate}
            setMenu={setMenu}
            showUpdate={showUpdate}
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
