import axios from "axios";
import React, { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import "./ToDoCreate.scss";

const ToDoCreate = () => {
  const todoTitleRef = useRef();
  const todoContentRef = useRef();
  const todoMethodRef = useRef();
  const todoRepeatRef = useRef();
  const todoMemRef = useRef();
  const todoImgRef = useRef();

  const navigate = useNavigate();

  const date = new Date();

  const submitCk = (e) => {
    e.preventDefault();

    axios
      .post("/todolist", {
        todo_seq: "",
        cate_seq: "",
        todo_title: todoTitleRef.current.value,
        todo_dt: date,
        todo_content: todoContentRef.current.value,
        todo_repeat: todoRepeatRef.current.value,
        mem_id: todoMemRef.current.value,
        todo_method: todoMethodRef.current.value,
      })
      .then((res) => {
        console.log(res.data);
        alert("등록되었습니다.");
        navigate("/todolist");
      })
      .catch(() => {
        console.log("실패함");
      });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="todoCreateBtn">
          <input
            type="submit"
            className="todo-add"
            onClick={submitCk}
            value="추가"
          ></input>
          <button className="todo-cancel">취소</button>
        </div>
        <div className="todo-list">
          <div className="todoContent">
            <form>
              <table>
                <tr>
                  <td className="todoTitle">
                    <input
                      type="text"
                      className="todo-title"
                      ref={todoTitleRef}
                      placeholder="할 일 제목"
                      size="50"
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className="todoText">
                    <textarea
                      cols="65"
                      rows="10"
                      ref={todoContentRef}
                      className="todo-content"
                      placeholder="할 일 내용"
                    ></textarea>
                  </td>
                </tr>
              </table>
            </form>
          </div>

          <div className="todoOption">
            <tr className="todo-option">
              <td className="todoMenu">필수</td>
            </tr>
            <tr className="todo-method">
              <td className="todo-head">체크방법</td>
              <input
                ref={todoMethodRef}
                type="radio"
                name="method"
                value="1"
              ></input>
              <label>체크만 </label>
              <input
                ref={todoMethodRef}
                type="radio"
                name="method"
                value="2"
              ></input>
              <label>인증샷 </label>
            </tr>
            <tr className="todo-method">
              <td className="todo-head">카테고리</td>
            </tr>
            <tr className="todo-method">
              <td className="todo-head">반복설정</td>
              <input
                ref={todoRepeatRef}
                type="radio"
                name="repeat"
                value="daily"
              ></input>
              <label>매일 </label>
              <input
                ref={todoRepeatRef}
                type="radio"
                name="repeat"
                value="weekly"
              ></input>
              <label>주간 </label>
              <input
                ref={todoRepeatRef}
                type="radio"
                name="repeat"
                value="monthly"
              ></input>
              <label>월간 </label>
            </tr>

            <tr className="todo-option">
              <td className="todoMenu">선택</td>
            </tr>
            <tr className="todo-method">
              <td className="todo-head">담당자</td>
              <select name="todoMem" ref={todoMemRef}>
                <option value="A">클레버</option>
              </select>
            </tr>
            <tr className="todo-method">
              <td className="todo-head">사진</td>
              <input type="image" ref={todoImgRef}></input>
            </tr>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoCreate;
