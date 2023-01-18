import React from "react";
import { useNavigate } from "react-router-dom";
import { useTodoState } from "./ToDoContext";

import add from "./add.png";

import ToDoItem from "./ToDoItem";
import "./ToDoList.scss";

const ToDoList = () => {
  const todos = useTodoState();

  const navigate = useNavigate();

  const gotoToDoCreate = () => {
    navigate("/todolistcreate");
  };

  return (
    <div className="todo-list">
      {todos.map((todos) => (
        <ToDoItem
          id={todos.id}
          text={todos.text}
          done={todos.done}
          key={todos.id}
        />
      ))}
      <div className="todoCreate-Img">
        <img src={add} className="todoCreateImg" onClick={gotoToDoCreate}></img>
      </div>
    </div>
  );
};

export default ToDoList;
