import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "../ToDoItem/ToDoList.scss";

const ToDoDoneListItem = ({
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
  showModal,
  category,
}) => {
  //   console.log("listItem", doneList);
  //   console.log("listItemId", detailId);

  const [comList, setComList] = useState([]);
  useEffect(() => {
    axios
      .post("/todolist/donelist", {
        cate_seq: category,
        //   todo_seq: item.todo_seq,
      })
      .then((res) => {
        console.log("res", res.data);
        setComList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("comList", comList);

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
      {comList.slice(offset, offset + limit).map((item, idx) => (
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
            <div
              className="todo-content"
              key={idx}
              onClick={() => {
                onDetail({ item });
              }}
            >
              {item.todo_content}
            </div>
          </div>
          <div className="todo-repeat">{item.todo_repeat}</div>
          <div className="todo-complete">미완료</div>

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
    </div>
  );
};

export default ToDoDoneListItem;
