import axios from "axios";
import React, { useEffect, useState } from "react";
import ToDoContext from "./ToDoContext";

const ToDoDB = () => {
  // DB 할 일 가져오기
  //   const [todoList, setTodoList] = useState([]);
  const [initialToDos, setInitialToDos] = useState([]);

  useEffect(() => {
    axios
      .post("/todolist/todolist")
      .then((res) => {
        console.log("db1", res.data);
        setInitialToDos(res.data);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  return (
    <div>
      {initialToDos.map((item) => (
        <div value={item.todo_title}>{item.todo_title}</div>
      ))}
    </div>
  );
};

export default ToDoDB;
