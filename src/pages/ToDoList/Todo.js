import React from "react";
import { TodoProvider } from "./ToDoContext";
import ToDoCreate from "./ToDoCreate";
import ToDoHead from "./ToDoHead";
import ToDoList from "./ToDoList";
import ToDoTemplate from "./ToDoTemplate";
import { createGlobalStyle } from "styled-components";
import CalendarData from "./CalendarData";

const GlobalStyle = createGlobalStyle`
  body.globalStyle {
    background: #e9ecef
  }
`;
const Todo = () => {
  return (
    <div>
      <CalendarData />
      <TodoProvider>
        <div className="globalStyle">
          <GlobalStyle />
        </div>
        <ToDoTemplate>
          <ToDoHead />
          <ToDoList />
          <ToDoCreate />
        </ToDoTemplate>
      </TodoProvider>
    </div>
  );
};

export default Todo;
