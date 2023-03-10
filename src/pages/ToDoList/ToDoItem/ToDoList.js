import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoDispatch, useTodoState } from "./ToDoContext";
import styled from "styled-components";

import add from "../../../image/add.png";

import "./ToDoList.scss";
import axios from "axios";
// import { MdDelete, MdDone, MdEdit } from "react-icons/md";

import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoToggle from "../ToDoToggle";

const TodoHeadBlock = styled.div`
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const TasksLeft = styled.div`
  // color: #20c997;
  color: #3a4ca8;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

const ToDoList = ({
  cateName,
  category,
  cateList,
  todoMemoList,
  setShowWriteModal,
  showWriteModal,
  selectDate,
  cateRef,
  cateObj,
}) => {
  // console.log("cateObj", cateObj);
  const user = sessionStorage.getItem("mem_id");
  console.log("user", user);
  // const todos = useTodoState();
  const today = new Date();

  const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = today.toLocaleString("ko-KR", { weekday: "long" });
  let date = new Date(selectDate);
  const selectDateString =
    selectDate &&
    selectDate.getFullYear() +
      "년 " +
      (selectDate.getMonth() + 1) +
      "월 " +
      selectDate.getDate() +
      "일";

  const selectDayName = selectDate.toLocaleString("ko-KR", { weekday: "long" });

  // const undoneTasks = todos.filter((todo) => !todo.done);

  // const dispatch = useTodoDispatch();

  // 완료된 할 일 불러오기

  const [doneList, setDoneList] = useState([]);
  const [doneCount, setDoneCount] = useState();

  useEffect(() => {
    axios.post("/todolist/todocom", { cate_seq: category }).then((res) => {
      // console.log("완료할일", res.data);
      setDoneList(res.data);
      // setDoneCount(res.data.length);
    });
  }, [category]);

  // console.log("count", doneCount);

  // 이미지 미리보기 https://nukw0n-dev.tistory.com/30

  const [isOn, setIsOn] = useState(false);

  return (
    <div className="todoContent">
      <div className="todo-template">
        <TodoHeadBlock>
          <h1>{selectDate === "" ? dateString : selectDateString}</h1>
          <div className="day">
            {selectDate === "" ? dayName : selectDayName}
          </div>
          {/* <TasksLeft>미완료 {undoneTasks.length}개 </TasksLeft> */}
          <ToDoToggle doneList={doneList} isOn={isOn} setIsOn={setIsOn} />
        </TodoHeadBlock>
        <ToDoItem
          todoMemoList={todoMemoList}
          cateName={cateName}
          category={category}
          isOn={isOn}
          setIsOn={setIsOn}
          doneList={doneList}
          cateList={cateList}
          key={category}
          cateRef={cateRef}
          cateObj={cateObj}
          selectDate={selectDate}
        />
      </div>
    </div>
  );
};

export default ToDoList;
