import axios from "axios";
import React, { useState } from "react";
import ToDoEdit from "./ToDoEdit";

const EditDelMenu = ({ item }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState({});

  const [detailSeq, setDetailSeq] = useState();

  const handleUpdate = (item) => {
    setUpdateItem(item.item);
    setShowUpdate(true);

    setDetailSeq(item.item.todo_seq);
  };

  const handleDelete = (detailSeq) => {
    axios
      .post("/todolist/delete", { todo_seq: detailSeq })
      .then((res) => {
        alert("삭제 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="todo-editSetMenu">
      {showUpdate && (
        <ToDoEdit setShowUpdate={setShowUpdate} updateItem={updateItem} />
      )}
      <ul className="todo-editSetContent">
        <li onClick={() => handleUpdate({ item })}>수정</li>
        <li onClick={() => handleDelete(item.todo_seq)}>삭제</li>
      </ul>
    </div>
  );
};

export default EditDelMenu;
