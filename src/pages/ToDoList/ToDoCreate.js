import React from "react";
import "./ToDoCreate.scss";

const ToDoCreate = () => {
  return (
    <div className="todoCreate">
      <div className="todoCreateBtn">
        <button className="todo-add">추가</button>
        <button className="todo-cancel">취소</button>
      </div>
      <div className="todo-list">
        <div className="todoContent">
          <form>
            <table>
              <tr>
                <td>
                  <input
                    type="text"
                    className="todo-title"
                    placeholder="할 일 제목"
                    size="50"
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <textarea
                    cols="65"
                    rows="10"
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
            <td>필수</td>
          </tr>
          <tr className="todo-method">
            <td className="todo-head">체크방법</td>
            <input type="radio" name="method" value="1"></input>
            <label>체크만 </label>
            <input type="radio" name="method" value="2"></input>
            <label>인증샷 </label>
          </tr>
          <tr className="todo-method">
            <td className="todo-head">카테고리</td>
          </tr>
          <tr className="todo-method">
            <td className="todo-head">반복설정</td>
            <input type="radio" name="repeat" value="everyday"></input>
            <label>매일 </label>
            <input type="radio" name="repeat" value="everyweek"></input>
            <label>주간 </label>
            <input type="radio" name="repeat" value="everymon"></input>
            <label>월간 </label>
          </tr>

          <tr className="todo-option">
            <td>선택</td>
          </tr>
          <tr className="todo-method">
            <td className="todo-head">담당자</td>
            <select>
              <option></option>
            </select>
          </tr>
          <tr className="todo-method">
            <td className="todo-head">사진</td>
            <input type="image"></input>
          </tr>
        </div>
      </div>
    </div>
  );
};

export default ToDoCreate;
