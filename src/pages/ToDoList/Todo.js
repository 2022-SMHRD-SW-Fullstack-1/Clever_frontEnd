import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

import { TodoProvider } from "./ToDoContext";
import ToDoHead from "./ToDoHead";
import ToDoList from "./ToDoList";
import ToDoTemplate from "./ToDoTemplate";

import CalendarData from "./CalendarData";
import Header from "../../layout/Header";
import "./ToDo.scss";
import { TbMessageReport } from "react-icons/tb";
import axios from "axios";

import styled from "styled-components";
import ToDoDetail from "./ToDoDetail";

const GlobalStyle = createGlobalStyle`
  body.globalStyle {
    background: #e9ecef
  }
`;
// const cateCk = styled.div`
//   // background: #3a4ca8;
// `;

const Todo = () => {
  // db 에 있는 카테고리 가져오기
  const [cateList, setCateList] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    axios
      .post("/todolist/getcategory")
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data[0].cate_seq);
        setCateList(res.data);
        setCategory(res.data[0].cate_seq);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  // 일일 특이사항 가져오기
  const [noticeList, setNoticeList] = useState("");
  useEffect(() => {
    axios.post("/todolist/todaynotice").then((res) => {
      console.log("notice", res);
    });
  }, []);

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
        <div className="todo-category">
          {/* {cateList.map((item) => (
            <button className="todo-cateName" onChange={cateCk}>
              {item.cate_name}
            </button>
          ))} */}
          {cateList &&
            cateList.map((item, idx) => {
              return (
                <div
                  className={
                    item.cate_seq === category ? "selected" : "categoryName"
                  }
                  key={idx}
                  onClick={() => setCategory(item.cate_seq)}
                >
                  {item.cate_name}
                </div>
              );
            })}
        </div>
      </div>
      <div className="globalStyle">
        <GlobalStyle />
      </div>
      <div className="show-todo">
        <TodoProvider>
          <div className="todoTemplate">
            <ToDoTemplate>
              <ToDoHead />
            </ToDoTemplate>
          </div>
          <ToDoList />
        </TodoProvider>
      </div>
    </div>
  );
};

export default Todo;
