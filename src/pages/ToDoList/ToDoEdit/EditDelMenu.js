import axios from "axios";
import React, { useState } from "react";
import ToDoEdit from "./ToDoEdit";

const EditDelMenu = ({ item }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState({});

  const handleUpdate = (item) => {
    console.log("edmenu", item);
    setUpdateItem(item.item);
    setShowUpdate(true);
  };

  const handleDelete = (todo_seq) => {
    axios
      .post(
        "/todolist/delete"
        //   { todo_seq: detailId }
      )
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
