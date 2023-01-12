import React from "react";
import "./ToDoCreate.scss";

const ToDoCreate = () => {
  return (
    <div className="todoCreate">
      <div className="todoCreateBtn">
        <button>추가</button>
        <button>취소</button>
      </div>
      <div className="todoContent">
        {/* <input className="todo-title" placeholder="할 일 제목"></input>
        <input className="todo-content" placeholder="할 일 내용"></input> */}
        <form>
          <table>
            <tr>
              <td>
                <input
                  type="text"
                  className="todo-title"
                  placeholder="할 일 제목"
                  size="70"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <textarea
                  cols="56"
                  rows="5"
                  className="todo-content"
                  placeholder="할 일 내용"
                ></textarea>
              </td>
            </tr>
          </table>
        </form>
      </div>

      <div className="todoOption">
        <tr>
          <td>필수</td>
        </tr>
      </div>
    </div>
  );
};

export default ToDoCreate;
