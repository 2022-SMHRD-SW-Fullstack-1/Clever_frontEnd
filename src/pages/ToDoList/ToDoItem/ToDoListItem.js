import axios from "axios";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "../ToDoItem/ToDoList.scss";
import Pagination from "../Pagination";

const ToDoListItem = ({
  todoList,
  doneList,
  detailId,
  setDetailId,
  setDoneMem,
  setDoneDate,
  setDoneMemo,
  setToDoCom,
  offset,
  limit,
  total,
  page,
  setPage,
  showModal,
  category,
}) => {
  //   console.log("listitem", todoList);

  const handleDelete = ({ item }) => {
    axios
      .post("/todolist/delete", { todo_seq: item.todo_seq })
      .then((res) => {
        alert("삭제 완료");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDetail = ({ item }) => {
    console.log("detailedItem", item);
    // setDetailList(item);
    setDetailId(item.todo_seq);
    // console.log("detailId", detailId);
    // setEditSeq(item.todo_seq);

    {
      doneList.map((item, idx) => {
        if (item.todo_seq === detailId) {
          console.log("doneList T/F", item.todo_seq === detailId);
          setDoneMem(item.mem_name);
          setDoneDate(item.cmpl_time);
          setDoneMemo(item.cmpl_memo);
          setToDoCom("완료");
        } else {
          setDoneMem("미");
          setDoneDate("");
          setDoneMemo("");
          setToDoCom("미완료");
        }
      });
    }
  };

  return (
    // <div className="todo-list">
    <div>
      {todoList.slice(offset, offset + limit).map((item, idx) => (
        <div className="todo-item">
          <div className="todo-container">
            <div
              className="todo-title"
              key={idx}
              onClick={() => {
                onDetail({ item });
              }}
            >
              {item.todo_title}
            </div>
            <span
              className="todo-content"
              key={idx}
              onClick={() => {
                onDetail({ item });
              }}
            >
              {item.todo_content}
            </span>
          </div>
          <div className="todo-repeat">{item.todo_repeat}</div>
          {/* <div className="todo-complete">미완료</div> */}

          <div className="todo-edit">
            <div>
              <MdEdit item={item} onClick={() => showModal({ item })} />
            </div>
            <div>
              <MdDelete item={item} onClick={() => handleDelete({ item })} />
            </div>
          </div>
        </div>
      ))}
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </div>
  );
};

export default ToDoListItem;
