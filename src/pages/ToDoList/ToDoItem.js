import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoDispatch } from "./ToDoContext";
import axios from "axios";

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
const ToDoItem = ({ id, done, text }) => {
  // console.log("done", done);

  const toDoId = [];

  const dispatch = useTodoDispatch();

  const onToggle = () => {
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
      id,
    });
  };

  // DB 할 일 가져오기
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .post("/todolist/todolist")
      .then((res) => {
        // console.log("db1", res.data);
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log("실패함", err);
      });
  }, []);

  todoList.map((item) => toDoId.push(item.todo_seq));
  // console.log("id", toDoId);

  return (
    // <TodoItemBlock>
    //   <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
    //   <Text done={done}>{text}</Text>
    //   <Remove>
    //     <MdDelete />
    //   </Remove>
    // </TodoItemBlock>

    <div>
      {todoList
        .filter((item, idx) => idx <= 6)
        .map((item) => (
          <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
              {done && <MdDone />}
            </CheckCircle>
            {/* {todoList.map((item) => ( */}
            <Text done={done}>{item.todo_title}</Text>
            {/* ))} */}
            <Remove onClick={onRemove}>
              <MdDelete />
            </Remove>
          </TodoItemBlock>
        ))}
    </div>
  );
};

export default React.memo(ToDoItem);
