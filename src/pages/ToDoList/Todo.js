import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

import { TodoProvider } from "./ToDoItem/ToDoContext";
import ToDoList from "./ToDoItem/ToDoList";
// import ToDoTemplate from "./ToDoTemplate";

import CalendarData from "./ToDoCal/CalendarData";
import Header from "../../layout/Header";
import "./ToDo.scss";
import { TbMessageReport } from "react-icons/tb";
import { BiCheck } from "react-icons/bi";
import axios from "axios";

import add from "../../image/add.png";

import "./ToDoItem/ToDoDetail.scss";
import AddToDoCate from "./ToDoCategory/AddToDoCate";

const GlobalStyle = createGlobalStyle`
  body.globalStyle {
    background: #e9ecef
  }
`;

const Todo = () => {
  const user = sessionStorage.getItem("mem_id");
  const userGroup = sessionStorage.getItem("group_seq");

  const [showWriteModal, setShowWriteModal] = useState(false);

  // 그룹 정보 가져오기
  const [joinGroup, setJoinGroup] = useState();
  useEffect(() => {
    axios.post("/todolist/getgroup", { mem_id: user }).then((res) => {
      console.log(("groupInfo", res));
    });
  }, [joinGroup]);

  // db 에 있는 카테고리 가져오기
  const [cateList, setCateList] = useState([]);
  const [category, setCategory] = useState("");
  const [cateName, setCateName] = useState("");

  useEffect(() => {
    axios
      .post("/todolist/getcategory", {
        group_seq: userGroup,
        // mem_id: user,
      })
      .then((res) => {
        setCateList(res.data);
        setCategory(res.data[0].cate_seq);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  // 카테고리 추가하기

  const [groupInfo, setGroupInfo] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);

  const addToDoCate = () => {
    setShowAddCategory(true);
  };

  // 일일 특이사항 가져오기
  const [todoMemoList, setTodoMemoList] = useState("");

  useEffect(() => {
    axios.post("/todolist/todaymemo").then((res) => {
      // console.log("notice", res.data);
      setTodoMemoList(res.data);
    });
  }, []);

  // 카테고리에 해당하는 할일만 보여주기
  const [selectCate, setSelectCate] = useState([]);
  useEffect(() => {
    axios.post("/todolist/selectcate").then((res) => {
      // console.log("selectCate", res.data);
    });
  }, []);

  return (
    <div className="container">
      <Header />
      <CalendarData />
      <div className="todoNotice">
        <div className="todoNotice-head">일일 특이사항</div>
        <div className="todoMemo">
          <TbMessageReport IoIosClose size="100" color="#3A4CA8" />
          <div className="todo-notice">
            {/* {todoMemoList.map((item) => (
              <div className="todo-memo">
                <BiCheck />
                {item.cmpl_memo}
              </div> */}
            {/* ))} */}
          </div>
        </div>
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
                  onClick={() => {
                    setCategory(item.cate_seq);
                    setCateName(item.cate_name);
                  }}
                >
                  {item.cate_name}
                </div>
              );
            })}
        </div>

        <div className="todoCateadd" onClick={() => addToDoCate()}>
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
          <ToDoList
            cateName={cateName}
            cateList={cateList}
            category={category}
            setShowWriteModal={setShowWriteModal}
            showWriteModal={showWriteModal}
            key={category}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
