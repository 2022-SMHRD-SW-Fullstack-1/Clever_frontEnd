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

import add from "../../image/add.png";

import styled from "styled-components";
import ToDoDetail from "./ToDoDetail";
import AddToDoCate from "./AddToDoCate";
import { useLocation } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body.globalStyle {
    background: #e9ecef
  }
`;

const Todo = () => {
  const user = sessionStorage.getItem("mem_id");
  const group_seq = sessionStorage.getItem("group_seq");
  // console.log("user", sessionStorage);
  console.log("group_seq", group_seq);

  // db 에 있는 카테고리 가져오기
  const [cateList, setCateList] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    axios
      .post("/todolist/getcategory")
      .then((res) => {
        setCateList(res.data);
        setCategory(res.data[0].cate_seq);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  // 카테고리 추기하기
  // const location = useLocation();
  // console.log("location", location.state);

  const [groupInfo, setGroupInfo] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);

  const addToDoCate = () => {
    setShowAddCategory(true);
  };

  // 그룹 정보 가져오기
  axios
    .post("/todolist/getgroup", {
      mem_id: user,
      group_seq: group_seq,
    })
    .then((res) => {
      console.log("그룹", res.data);
    })
    .catch((err) => {
      console.log("그룹 실패", err);
    });

  // 일일 특이사항 가져오기
  const [noticeList, setNoticeList] = useState("");
  useEffect(() => {
    axios.post("/todolist/todaynotice").then((res) => {
      console.log("notice", res);
    });
  }, []);

  // 카테고리에 해당하는 할일만 보여주기
  const [selectCate, setSelectCate] = useState([]);
  useEffect(() => {
    axios.post("/todolist/selectcate").then((res) => {
      console.log("selectCate", res.data);
    });
  });

  return (
    <div className="container">
      <Header />
      <CalendarData />
      <div className="todoNotice">
        <div className="todoNotice-head">일일 특이사항</div>
        <TbMessageReport IoIosClose size="100" color="#3A4CA8" />
        <div className="todo-notice">공지사항</div>
      </div>
      <div className="todoCate">
        <div className="todo-category">
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

        <div className="todo-add" onClick={addToDoCate}>
          <img className="todo-addCate" src={add}></img>
        </div>
        {showAddCategory && (
          <AddToDoCate
            setShowAddCategory={setShowAddCategory}
            groupInfo={groupInfo}
          />
        )}
      </div>
      <div className="globalStyle">
        <GlobalStyle />
      </div>
      <div className="show-todo">
        <div className="toDoTemplate">
          <ToDoList />
        </div>
      </div>
    </div>
  );
};

export default Todo;
