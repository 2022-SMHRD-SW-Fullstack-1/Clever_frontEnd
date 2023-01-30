import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoDispatch, useTodoState } from "./ToDoContext";
import styled from "styled-components";

import add from "../../../image/add.png";

import "./ToDoList.scss";
import axios from "axios";
// import { MdDelete, MdDone, MdEdit } from "react-icons/md";
import ToDoDetail from "../ToDoDetail/ToDoDetail";
import ToDoItem from "../ToDoItem/ToDoItem";

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

const ToDoList = ({ cateName, category }) => {
  // const todos = useTodoState();
  const today = new Date();

  const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = today.toLocaleString("ko-KR", { weekday: "long" });

  // const undoneTasks = todos.filter((todo) => !todo.done);

  // const dispatch = useTodoDispatch();

  // const navigate = useNavigate();

  // const gotoToDoCreate = () => {
  //   navigate("/todolistcreate");
  // };

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .post("/todolist/todolist")
      .then((res) => {
        const newData = res.data.map((i) => ({
          id: i.todo_seq,
          text: i.todo_title,
          done: false,
        }));
        // dispatch({
        //   type: "CREATE",
        //   todo: newData,
        // });
        console.log("할일 불러오기 res", res.data);
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  // 할 일 상세보기
  const [todoDetail, setTodoDetail] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [toDoDone, setToDoDone] = useState("미완료");

  const onDetail = (item, e) => {
    setTodoDetail(item);
    const { detailId } = item.todo_seq;
  };

  const changeDone = (value) => {
    setToDoDone(value);
  };

  // 이미지 미리보기 https://nukw0n-dev.tistory.com/30

  return (
    <div className="todoContent">
      <div className="todo-template">
        <TodoHeadBlock>
          <h1>{dateString}</h1>
          <div className="day">{dayName}</div>
          {/* <TasksLeft>미완료 {undoneTasks.length}개 </TasksLeft> */}
        </TodoHeadBlock>
        {/* <div className="todo-list">
          {todoList.map((item) => (
            <div className="todo-item">
              <div>
                <div
                  className="todo-title"
                  key={item.todo_title}
                  onClick={(e) => {
                    onDetail(item, e);
                  }}
                >
                  {item.todo_title}
                </div>
                <div
                  className="todo-content"
                  key={item.todo_content}
                  onClick={(e) => {
                    onDetail(item, e);
                  }}
                >
                  {item.todo_content}
                </div>
              </div>
              <div className="todo-complete">{toDoDone}</div>
            </div>
          ))}
        </div> */}
        {/* <div className="todoCreate-Img">
          <img
            src={add}
            className="todoCreateImg"
            onClick={gotoToDoCreate}
          ></img>
        </div> */}
        <ToDoItem cateName={cateName} category={category} />
      </div>

      {/* <div className="todo-detail">
        <ToDoDetail item={todoDetail} changeDone={changeDone} />
      </div> */}
      {/* <ToDoItem /> */}
    </div>
    // </div>
  );
};

export default ToDoList;
