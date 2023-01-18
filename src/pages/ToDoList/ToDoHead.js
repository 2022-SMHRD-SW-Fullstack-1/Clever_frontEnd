import React, { useEffect, useState } from "react";
import { useTodoState } from "./ToDoContext";
import styled from "styled-components";
import ToDoToggle from "./ToDoToggle";

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
  color: #20c997;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

const ToggleContainer = styled.div`
  position: relative;
  //   margin-top: 8rem;
  left: 47%;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }
  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0, 200, 102);
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  }
  > .toggle--checked {
    left: 27px;
    transition: 0.5s;
  }
`;

const Desc = styled.div`
  //설명 부분의 CSS를 구현
  text-align: center;
  //   margin: 20px;
`;

const ToDoHead = () => {
  // console.log("toggle", isOn);

  const today = new Date();

  const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = today.toLocaleString("ko-KR", { weekday: "long" });
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done);

  // // 토글
  // const [isOn, setIsOn] = useState(false);

  // const toggleHandler = () => {
  //   //isOn의 상태를 변경하는 메소드
  //   setIsOn(!isOn);
  // };

  // console.log("토글", isOn);

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <TasksLeft>미완료 {undoneTasks.length}개 </TasksLeft>
      <div className="todoToggle">
        <ToDoToggle />
      </div>
    </TodoHeadBlock>
  );
};

export default ToDoHead;
