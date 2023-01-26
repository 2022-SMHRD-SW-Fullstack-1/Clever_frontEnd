import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import "./ToDoCreate.scss";

const ToDoCreate = () => {
  let user = sessionStorage.getItem("mem_id");
  // console.log("로그인", user);

  const todoTitleRef = useRef();
  const todoContentRef = useRef();
  const todoMethodRef = useRef();
  const todoCategoryRef = useRef();
  const todoRepeatRef = useRef();
  const todoMemRef = useRef();
  const todoImgRef = useRef();

  const navigate = useNavigate();

  const date = new Date();

  const submitCk = (e) => {
    e.preventDefault();

    axios
      .post("/todolist/addtodo", {
        todo_seq: "",
        cate_seq: todoCategoryRef.current.value,
        cate_name: todoCategoryRef.current.value,
        todo_title: todoTitleRef.current.value,
        todo_content: todoContentRef.current.value,
        todo_dt: date,
        todo_repeat: repeatValue,
        mem_id: todoMemRef.current.value,
        todo_method: todoMethodRef.current.value,
      })
      .then((res) => {
        console.log(res.data);
        alert("등록되었습니다.");
        navigate("/todolist");
      })
      .catch((err) => {
        console.log("실패함", err);
        console.log("mem_id", todoMemRef.current.value);
      });
  };

  // 반복설정
  const [repeatValue, setRepeatValue] = useState("");
  const todoRepeat = (e) => {
    // console.log("C", e.target.value);
    setRepeatValue(e.target.value);
  };

  // DB 카테고리 가져오기
  const [cateList, setCateList] = useState([]);

  useEffect(() => {
    axios
      .post("/todolist/getcategory")
      .then((res) => {
        setCateList(res.data);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  // 담당자 가져오기
  const [memList, setMemList] = useState([]);

  useEffect(() => {
    axios
      .post("/todolist/getmember")
      .then((res) => {
        // console.log("mem", res.data);
        setMemList(res.data);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

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
              <table className="todo-table">
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
                      cols="45"
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
                value="체크"
              ></input>
              <label>체크만 </label>
              <input
                ref={todoMethodRef}
                type="radio"
                name="method"
                value="사진"
              ></input>
              <label>인증샷 </label>
            </tr>
            <tr className="todo-method">
              <td className="todo-head">카테고리</td>
              <td>
                <select name="todo-category" ref={todoCategoryRef}>
                  {cateList.map((item) => (
                    <option value={item.cate_seq}>{item.cate_name}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr className="todo-method">
              <td className="todo-head">반복설정</td>
              <input
                className="todo-repeat"
                ref={todoRepeatRef}
                type="radio"
                name="repeat"
                value="매일"
                onChange={(e) => {
                  setRepeatValue(e.target.value);
                }}
                onClick={todoRepeat}
              ></input>
              <label>매일 </label>
              <input
                className="todo-repeat"
                ref={todoRepeatRef}
                type="radio"
                name="repeat"
                value="주간"
                onClick={todoRepeat}
              ></input>
              <label>주간</label>
              <input
                className="todo-repeat"
                ref={todoRepeatRef}
                type="radio"
                name="repeat"
                value="월간"
                onClick={todoRepeat}
              ></input>
              <label>월간</label>
            </tr>

            <tr className="todo-option">
              <td className="todoMenu">선택</td>
            </tr>
            <tr className="todo-method">
              <td className="todo-head">담당자</td>

              <select name="todoMem" ref={todoMemRef}>
                <option value="null">------</option>
                {memList.map((item) => (
                  <option key={item.mem_id} value={item.mem_id}>
                    {item.mem_name}
                  </option>
                ))}
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
