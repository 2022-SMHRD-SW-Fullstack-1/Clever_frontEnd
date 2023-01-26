import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdEdit } from "react-icons/md";
import { useTodoDispatch } from "./ToDoContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
      border: 1px solid #38d9a9;
      color: #38d9a9;
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

// 할일 목록
const ToDoItem = ({ todos }) => {
  // console.log("done", done);

  const toDoId = [];

  const navigate = useNavigate();

  const dispatch = useTodoDispatch();

  const onToggle = () => {
    dispatch({
      type: "TOGGLE",
      // id: toDoId,
      id: todos.id,
    });
  };

  const onRemove = () => {
    dispatch({
      type: "REMOVE",
      // id: toDoId,
      id: todos.id,
    });
  };

  const [todoSelect, setTodoSelect] = useState("");

  // 할 일 수정 페이지로 이동
  const onEdit = (item, e) => {
    setTodoSelect(item.todo_seq);
    navigate("/todolistedit", { state: todoSelect });
  };

  // DB 할 일 가져오기
  // const [todoList, setTodoList] = useState([]);

  // useEffect(() => {
  //   axios
  //     .post("/todolist/todolist")
  //     .then((res) => {
  //       // dispatch({
  //       //   type: "CREATE"
  //       // });
  //       // console.log("asdf", res.data);
  //     })
  //     .catch((err) => {
  //       console.log("실패함", err);
  //     });
  // }, []);

  // todoList.map((item) => toDoId.push(item.todo_seq));
  // console.log("id", toDoId);
  // console.log("state : ", todoSelect);

  return (
    // <TodoItemBlock>
    //   <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
    //   <Text done={done}>{text}</Text>
    //   <Remove>
    //     <MdDelete />
    //   </Remove>
    // </TodoItemBlock>

    <div>
      {/* {todos
        .filter((item, idx) => idx <= 6)
        .map((item, idx) => (
          <TodoItemBlock key={item + idx}>
            <CheckCircle done={todos.done} onClick={onToggle}>
              {todos.done && <MdDone />}
            </CheckCircle>
            <Text done={todos.done}>{item.todo_title}</Text>
            <Remove
              key={item.todo_seq}
              onClick={(e) => {
                onEdit(item, e);
              }}
              value={item.todo_seq}
            >
              <MdEdit />
            </Remove>
            <Remove onClick={onRemove}>
              <MdDelete />
            </Remove>
          </TodoItemBlock>
        ))} */}
    </div>
  );
};

export default React.memo(ToDoItem);
