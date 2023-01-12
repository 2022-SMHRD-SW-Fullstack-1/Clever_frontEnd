import React from "react";
import styled from "styled-components";
import { useTodoState } from "./ToDoContext";
import ToDoItem from "./ToDoItem";
import "./ToDoList.scss";

// const TodoListBlock = styled.div`
//   flex: 1;
//   padding: 20px 32px;
//   padding-bottom: 48px;
//   overflow-y: auto;
// `;

const ToDoList = () => {
  const todos = useTodoState();

  return (
    <div className="todo-list">
      {/* <TodoListBlock> */}
      {todos.map((todos) => (
        <ToDoItem
          id={todos.id}
          text={todos.text}
          done={todos.done}
          key={todos.id}
        />
      ))}
      {/* </TodoListBlock> */}
      <button className="todo-create">할 일 추가</button>
    </div>
  );
};

export default ToDoList;
