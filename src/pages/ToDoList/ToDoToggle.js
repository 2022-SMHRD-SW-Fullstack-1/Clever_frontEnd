import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "./ToDoToggle.scss";

const ToggleContainer = styled.div`
  position: relative;
    margin-top: 0.5rem;
  // left: 47%;
  left : 40%
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }
  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color:#3A4CA8;
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
  // float: left;
  // text-align: left;
  margin: 10px;
`;

const ToDoToggle = ({ doneList, isOn, setIsOn }) => {
  console.log("doneList", doneList);

  // console.log("doneList", doneList);
  // const [isOn, setIsOn] = useState(false);

  const toggleHandler = () => {
    //isOn의 상태를 변경하는 메소드
    console.log("isOn", isOn);
    // false -> 미완료!
    setIsOn(!isOn);
  };

  //   console.log("토글", isOn);

  return (
    <div className="todoToggle">
      <ToggleContainer
        // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
        onClick={toggleHandler}
      >
        <div
          className={`toggle-container ${isOn ? "toggle--checked" : null}`}
        ></div>
        <div
          className={`toggle-circle ${isOn ? "toggle--checked" : null}`}
        ></div>
      </ToggleContainer>
      <div className="todo-toggle">
        {isOn === false ? (
          <Desc>
            <div className="todoDone">완료</div>
          </Desc>
        ) : (
          <Desc>
            <div className="todoDone">미완료</div>
          </Desc>
        )}
      </div>
    </div>
  );
};

export default ToDoToggle;
