import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../../../layout/Header";
import "../ToDoEdit/ToDoEdit.scss";
import styles from "../ToDoEdit/EditToDo.module.scss";

const ToDoEdit = ({ setShowUpdate, updateItem }) => {
  const groupInfo = sessionStorage.getItem("group_seq");

  const [inputValue, setInputValue] = useState({
    todo_seq: updateItem.todo_seq,
    cate_seq: updateItem.cate_seq,
    cate_name: updateItem.cate_name,
    todo_title: updateItem.todo_title,
    todo_content: updateItem.todo_content,
    todo_dt: updateItem.todo_dt,
    todo_repeat: updateItem.todo_repeat,
    mem_id: updateItem.mem_id,
    todo_method: updateItem.todo_method,
  });

  const close = () => {
    setShowUpdate(false);
  };

  const todoTitleRef = useRef();
  const todoContentRef = useRef();
  const todoMethodRef = useRef();
  const todoCategoryRef = useRef();
  const todoRepeatRef = useRef();
  const todoMemRef = useRef();
  const todoImgRef = useRef();

  const todoWeeklyRef = useRef();
  const todoMonthlyRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();

  const todo_item = location.state;

  // const todo_seq = location.state.id;
  // console.log("seq", todo_seq);
  // const todo_title = location.state.text;
  // console.log("title", todo_title);

  const date = new Date();

  // 할 일 수정하기
  const submitCk = (e) => {
    e.preventDefault();

    axios
      .post("/todolist/edit", {
        // todo_seq: updateItem.todo_seq,
        // cate_seq: todoCategoryRef.current.value,
        // cate_name: todoCategoryRef.current.value,
        // todo_title: todoTitleRef.current.value,
        // todo_content: todoContentRef.current.value,
        // todo_dt: date,
        // todo_repeat: value,
        // mem_id: todoMemRef.current.value,
        // todo_method: todoMethodRef.current.value,
        inputValue,
      })
      .then((res) => {
        console.log(res.data);
        alert("게시글 수정 완료!");
        close();
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  };

  // 반복설정
  const [value, setValue] = useState("");
  const todoRepeat = (e) => {
    console.log("C", e.target.value);
    setValue(e.target.value);
  };

  // DB 카테고리 가져오기
  const [cateList, setCateList] = useState([]);

  useEffect(() => {
    axios
      .post("/todolist/getcategory", { group_seq: groupInfo })
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
      .post("/todolist/getmember", { group_seq: groupInfo })
      .then((res) => {
        console.log("mem", res.data);
        setMemList(res.data);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  return (
    <div>
      <Header />
      <>
        <div className={styles.modalContainer}>
          <div className={styles.modalBlock}>
            <span className={styles.close} onClick={close}>
              &times;
            </span>
            <div className="container">
              <div className="todoCreateBtn">
                <input
                  type="submit"
                  className="todo-add"
                  onClick={submitCk}
                  value="수정"
                ></input>
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
                            size="40"
                            defaultValue={updateItem.todo_title}
                            // onChange={submitCk}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td className="todoText">
                          <textarea
                            cols="50"
                            rows="10"
                            ref={todoContentRef}
                            className="todo-content"
                            placeholder="할 일 내용"
                            defaultValue={updateItem.todo_content}
                            // onChange={submitCk}
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
                          <option value={item.cate_seq}>
                            {item.cate_name}
                          </option>
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
                        setValue(e.target.value);
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
                      <option value={null}>------</option>
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
        </div>
      </>
    </div>
  );
};

export default ToDoEdit;
