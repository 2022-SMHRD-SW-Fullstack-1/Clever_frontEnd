import React, { useEffect, useState } from "react";
import EditDelMenu from "../ToDoEdit/EditDelMenu";
import "../ToDoItem/ToDoDetail.scss";

const ToDoMapItem = ({
  item,
  idx,
  menu,
  setShowUpdate,
  doneList,
  showUpdate,
}) => {
  console.log("mapItemDoneList", doneList);
  console.log("mapItem", item);

  const [doneSeq, SetDoneSeq] = useState();

  useEffect(() => {
    SetDoneSeq(doneList.todo_seq);
  });

  const [setMenu, setSetMenu] = useState(false);
  const [detailItem, setDetailItem] = useState({});

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
    console.log("mapItem", item);
    // setDetailItem(item.item);
    // setShowUpdate(true);

    setDetailList(item);
    setDetailId(item.todo_seq);

    setEditSeq(item.todo_seq);

    // {
    //   doneList.map((item, idx) => {
    //     if (item.todo_seq === doneSeq) {
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
    <div className="todo-item">
      <div>
        <div
          className="todo-title"
          key={idx}
          onClick={(e) => {
            onDetail(item, e);
          }}
        >
          {item.todo_title}
        </div>
        <div
          className="todo-content"
          key={idx}
          onClick={(e) => {
            onDetail(item, e);
          }}
        >
          {item.todo_content}
        </div>
      </div>
      <div>
        <div>{toDoRep}</div>
        <div className="todo-complete">{toDoCom}</div>
        <div className="todo-edit">
          <img
            src={menu}
            className="todo-editMenu"
            alt="setting button"
            onClick={() => setShowUpdate(!setMenu)}
          />
          {/* {setShowUpdate && <EditDelMenu item={item} />} */}
        </div>
      </div>
    </div>
  );
};

export default ToDoMapItem;
