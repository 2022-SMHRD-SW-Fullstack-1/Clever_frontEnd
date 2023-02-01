import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import add from "../../../image/add.png";
import menu from "../../../image/menu.png";
import "../ToDoItem/ToDoDetail.scss";
import "../ToDoItem/ToDoList.scss";
import Pagination from "../Pagination";
import { MdEdit } from "react-icons/md";
import ToDoEdit from "../ToDoEdit/ToDoEdit";
import EditDelMenu from "../ToDoEdit/EditDelMenu";

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

  const gotoToDoEdit = () => {
    navigate("/todolistedit");
    <ToDoEdit detailId={detailId} />;
  };

  // 할 일 리스트 불러오기
  useEffect(() => {
    axios
      .post("/todolist/todolist", { cate_seq: category })
      .then((res) => {
        setTodoList(res.data);
        setToDoRep(res.data.todo_repeat);
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

  const [editSeq, setEditSeq] = useState([]);

  const [toDoCom, setToDoCom] = useState("");

  const onDetail = (item, e) => {
    console.log("detail", item);
    setDetailList(item);
    setDetailId(item.todo_seq);

    setEditSeq(item.todo_seq);

    console.log("target", e.currentTarget);

    {
      doneList.map((item, idx) => {
        if (item.todo_seq === detailId) {
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

  // 할 일 수정 삭제
  const [setMenu, setSetMenu] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState({});

  const handleUpdate = (item) => {
    // console.log("menu", item.item);
    setUpdateItem(item.item);
    setShowUpdate(true);
  };

  const handleDelete = (todo_seq) => {
    axios
      .post("/todolist/delete", { todo_seq: detailId })
      .then((res) => {
        alert("삭제 완료");
      })
      .catch((err) => {
        console.log(err);
      });
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
                  <div className="todo-edit">
                    <img
                      src={menu}
                      className="todo-editMenu"
                      alt="setting button"
                      onClick={() => setShowUpdate(!setMenu)}
                    />
                    {/* {showUpdate && (
                      <div className="todo-editSetMenu">
                        <ul className="todo-editSetContent">
                          <li onClick={() => handleUpdate({ item })}>수정</li>
                          <li onClick={() => handleDelete(item.notice_seq)}>
                            삭제
                          </li>
                        </ul>
                      </div>
                    )} */}
                    {setMenu && <EditDelMenu item={item} />}
                  </div>
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
