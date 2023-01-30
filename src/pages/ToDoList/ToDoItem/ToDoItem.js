import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import add from "../../../image/add.png";
import "../ToDoItem/ToDoDetail.scss";
import "../ToDoItem/ToDoList.scss";
import Pagination from "../Pagination";

const ToDoItem = ({ category, cateName, doneList }) => {
  console.log("category", category);
  // console.log("doneList", doneList);

  const [todoCount, setTodoCount] = useState();
  const [doneSeq, setDoneSeq] = useState();
  const [doneMem, setDoneMem] = useState();
  const [doneDate, setDoneDate] = useState();
  const [doneMemo, setDoneMemo] = useState();

  const [todoList, setTodoList] = useState([]);

  const navigate = useNavigate();

  const gotoToDoCreate = () => {
    navigate("/todolistcreate");
  };

  // 할 일 리스트 불러오기
  useEffect(() => {
    axios
      .post("/todolist/todolist", { cate_seq: category })
      .then((res) => {
        setTodoList(res.data);
        setTotal(res.data.length);
        setTodoCount(res.data.length);
      })
      .catch((err) => {
        console.log("리스트 실패함", err);
      });
  }, [category]);

  // 할일 페이지네이션
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [total, setTotal] = useState(todoList.length);

  // 할 일 상세보기
  const [detailId, setDetailId] = useState();
  const [detailLIst, setDetailList] = useState([]);
  const [toDoRep, setToDoRep] = useState();

  const [toDoCom, setToDoCom] = useState("미완료");

  const onDetail = (item, e) => {
    console.log("item", item);
    setDetailList(item);
    setDetailId(item.todo_seq);
    setToDoRep(item.todo_repeat);

    {
      doneList
        // .find((item) => item.todo_seq === detailId)
        .map((item, idx) => {
          console.log("doneList", item);

          if (item.todo_seq === detailId) {
            console.log("t/f", item.todo_seq === detailId);
            setDoneMem(item.mem_name);
            setDoneDate(item.cmpl_time);
            setDoneMemo(item.cmpl_memo);
            setToDoCom("완료");
          } else {
            setDoneMem("미");
            setDoneDate("");
            setDoneMemo("");
            setToDoCom("미완료");
          }
        });
    }
  };

  return (
    <div>
      <div>
        <div className="todo-list">
          {todoList
            // .filter((item, idx) => idx <= 6)
            .slice(offset, offset + limit)
            .map((item, idx) => (
              <div className="todo-item">
                <div>
                  <div
                    className="todo-title"
                    key={idx}
                    onClick={(e) => {
                      onDetail(item, e);
                    }}
                  >
                    {item.todo_title}
                  </div>
                  <div
                    className="todo-content"
                    key={idx}
                    onClick={(e) => {
                      onDetail(item, e);
                    }}
                  >
                    {item.todo_content}
                  </div>
                </div>
                <div>
                  <div>{toDoRep}</div>
                  <div className="todo-complete">{toDoCom}</div>
                </div>
              </div>
            ))}
          <Pagination
            total={total}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
        <div className="todoCreate-Img">
          <img
            src={add}
            className="todoCreateImg"
            onClick={gotoToDoCreate}
          ></img>
        </div>
      </div>

      <div className="todoDetail">
        <div>
          <div className="todoCom-mem">{doneMem} 완료</div>
          <div className="todoCom-img">{detailId}</div>
          <div className="todoCom-time">완료 : {doneDate}</div>
          <div className="todoCom-memo">메모 {doneMemo}</div>
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
