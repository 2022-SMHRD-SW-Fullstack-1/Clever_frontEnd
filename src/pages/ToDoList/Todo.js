import React from "react";
import { createGlobalStyle } from "styled-components";

import { TodoProvider } from "./ToDoContext";
import ToDoCreate from "./ToDoCreate";
import ToDoHead from "./ToDoHead";
import ToDoList from "./ToDoList";
import ToDoTemplate from "./ToDoTemplate";

import CalendarData from "./CalendarData";
import Header from "../../layout/Header";
import "./ToDo.scss";
import { TbMessageReport } from "react-icons/tb";

const GlobalStyle = createGlobalStyle`
  body.globalStyle {
    background: #e9ecef
  }
`;
const Todo = () => {
  return (
    <div>
      <Header />
      <CalendarData />
      <div className="todoNotice">
        <div className="todoNotice-head">일일 특이사항</div>
        <TbMessageReport IoIosClose size="100" color="#3A4CA8" />
        <div className="todo-notice">공지사항</div>
      </div>
      <div className="todoCate">
        <div className="todo-category">카테고리</div>
      </div>
      <TodoProvider>
        <div className="globalStyle">
          <GlobalStyle />
        </div>
        <ToDoTemplate>
          <ToDoHead />
          <ToDoList />
        </ToDoTemplate>
      </TodoProvider>
    </div>
  );
};

export default Todo;
