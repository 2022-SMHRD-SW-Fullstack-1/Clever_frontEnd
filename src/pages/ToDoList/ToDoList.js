import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoDispatch, useTodoState } from "./ToDoContext";
import styled, { css } from "styled-components";

import add from "./add.png";

import "./ToDoList.scss";
import axios from "axios";
import { MdDelete, MdDone, MdEdit } from "react-icons/md";
import ToDoDetail from "./ToDoDetail";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 0px;

  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

left : 500px

  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
  &:hover {
    ${Edit} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #3a4ca8;
      color: #3a4ca8;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const ToDoList = () => {
  const todos = useTodoState();

  const dispatch = useTodoDispatch();

  const navigate = useNavigate();

  const gotoToDoCreate = () => {
    navigate("/todolistcreate");
  };

  useEffect(() => {
    axios
      .post("/todolist/todolist")
      .then((res) => {
        const newData = res.data.map((i) => ({
          id: i.todo_seq,
          text: i.todo_title,
          done: false,
        }));
        dispatch({
          type: "CREATE",
          todo: newData,
        });
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  const onToggle = (id) => {
    dispatch({
      type: "TOGGLE",
      // id: toDoId,
      id,
    });
  };

  const onRemove = () => {
    dispatch({
      type: "REMOVE",
      // id: toDoId,
      id: todos.id,
    });
  };

  // 할 일 수정 페이지로 이동
  const [todoSelect, setTodoSelect] = useState("");

  const onEdit = (item, e) => {
    console.log("item", item);
    setTodoSelect(item.id);
    navigate("/todolistedit", { state: item });
  };

  // 할 일 상세보기
  const [todoDetail, setTodoDetail] = useState();
  const [todoTitle, setTodoTitle] = useState("");

  const onDetail = (item, e) => {
    // console.log("e", e.target.innerText);
    setTodoTitle(e.target.innerText);
    setTodoDetail(item.id);
    // console.log("detail", item.id);
    const { detailId } = item.id;
  };

  // 이미지 미리보기 https://nukw0n-dev.tistory.com/30

  return (
    <div className="todoContent">
      <div className="todoCreate-Img">
        <img src={add} className="todoCreateImg" onClick={gotoToDoCreate}></img>
      </div>
      <div className="todo-list">
        <div className="todoListBlock">
          {todos
            .filter((item, idx) => idx <= 6)
            .map(
              (item, idx) => (
                <div>
                  <div
                    className="todoItemText"
                    onClick={(e) => {
                      onDetail(item, e);
                    }}
                    value={item.text}
                  >
                    {item.text}
                  </div>
                  <div className="todoItemComplete">미완료</div>
                </div>
              )

              // <TodoItemBlock key={item + idx}>
              // <CheckCircle done={item.done} onClick={() => onToggle(item.id)}>
              //   {item.done && <MdDone />}
              // </CheckCircle>
              // <Text
              //   done={item.done}
              //   key={item + idx}
              // onClick={(e) => {
              //   onDetail(item, e);
              // }}
              // value={item.text}
              // >
              //   {item.text}
              // </Text>
              // <Edit
              //   key={item.id}
              //   onClick={(e) => {
              //     onEdit(item, e);
              //   }}
              //   value={item.id}
              // >
              //   <MdEdit />
              // </Edit>
              // <Remove onClick={onRemove}>
              //   <MdDelete />
              // </Remove>
              // ({
              /* <img src="./add.png" alt="image" className="todoComImg" /> */
              // })
              // </TodoItemBlock>
            )}
        </div>
        {/* </TodoListBlock> */}
      </div>

      <div className="todo-detail">
        <ToDoDetail item={todoDetail} />
      </div>
    </div>
  );
};

export default ToDoList;
