import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import add from "../../../image/add.png";
import menu from "../../../image/menu.png";
import "../ToDoItem/ToDoDetail.scss";
import "../ToDoItem/ToDoList.scss";
import Pagination from "../Pagination";
import { MdEdit, MdDelete } from "react-icons/md";
import ToDoEdit from "../ToDoEdit/ToDoEdit";
import EditDelMenu from "../ToDoEdit/EditDelMenu";
import ToDoNotEmpty from "./ToDoNotEmpty";
import styled from "styled-components";
import ToDoToggle from "../ToDoToggle";
import Toggle from "./Toggle";

const TasksLeft = styled.div`
  // color: #20c997;
  color: #3a4ca8;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
`;

const ToDoItem = ({
  category,
  cateName,
  cateList,
  doneList,
  item,
  cateRef,
  // setShowWriteModal,
  // showWriteModal,
}) => {
  // console.log("category", cateList);
  // console.log("doneList", doneList);
  const joinGroup = sessionStorage.getItem("group_seq");

  const [showWriteModal, setShowWriteModal] = useState(false);

  const [todoCount, setTodoCount] = useState();

  const [doneSeq, setDoneSeq] = useState();
  const [doneMem, setDoneMem] = useState();
  const [doneDate, setDoneDate] = useState();
  const [doneMemo, setDoneMemo] = useState();

  const [todoList, setTodoList] = useState([]);

  // 남은 할일 개수

  const navigate = useNavigate();

  const gotoToDoCreate = () => {
    navigate("/todolistcreate");
  };

  // 전체 할일 리스트 불러오기
  const [allTodoList, setAllTodoList] = useState([]);
  useEffect(() => {
    if (category === cateRef) {
      axios
        .post("/todolist/alltodo", {
          group_seq: joinGroup,
          cate_seq: category,
        })
        .then((res) => {
          setTodoList(res.data);
          setToDoRep(res.data.todo_repeat);
          setTotal(res.data.length);
          setTodoCount(res.data.length);
        })
        .catch((err) => {
          console.log("리스트 실패함", err);
        });
    } else {
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
    }
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

  const onDetail = ({ item, e }) => {
    // console.log("detailedItem", item);
    // setDetailList(item);
    setDetailId(item.todo_seq);
    // console.log("detailId", detailId);
    setEditSeq(item.todo_seq);

    {
      doneList.map((item, idx) => {
        if (item.todo_seq === detailId) {
          console.log("doneList T/F", item.todo_seq === detailId);
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

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = (item) => {
    setModalOpen(true);

    console.log("edit", item.item);
    setUpdateItem(item.item);
    setShowWriteModal(true);

    setDetailSeq(item.item.todo_seq);
  };

  const [setMenu, setSetMenu] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState({});

  const [detailSeq, setDetailSeq] = useState();

  const handleDelete = ({ item }) => {
    axios
      .post("/todolist/delete", { todo_seq: item.todo_seq })
      .then((res) => {
        alert("삭제 완료");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCom = ({ item, doneList }) => {
    console.log("comItem", item.todo_seq);
    console.log("conDoneItem", doneList);
    if (doneList.todo_seq === item.todo_seq) {
      setToDoCom("완료");
    } else {
      setToDoCom("미완료");
    }
  };

  return (
    <div>
      {modalOpen && (
        <ToDoEdit
          setShowUpdate={setShowUpdate}
          updateItem={updateItem}
          setModalOpen={setModalOpen}
        />
      )}

      <div>
        <div className="todo-list">
          {todoList.slice(offset, offset + limit).map((item, idx) => (
            <div className="todo-item">
              <div className="todo-container">
                <div
                  className="todo-title"
                  key={idx}
                  onClick={() => {
                    onDetail({ item });
                  }}
                >
                  {item.todo_title}
                </div>
                <div
                  className="todo-content"
                  key={idx}
                  onClick={() => {
                    onDetail({ item });
                  }}
                >
                  {item.todo_content}
                </div>
              </div>
              <div className="todo-repeat">{item.todo_repeat}</div>
              {doneList.todo_seq === todoList.todo_seq ? (
                <div
                  className="todo-complete"
                  onClick={() => handleCom({ item, doneList })}
                >
                  완료
                </div>
              ) : (
                <div
                  className="todo-complete"
                  onClick={() => handleCom({ item, doneList })}
                >
                  미완료
                </div>
              )}
              <div className="todo-edit">
                <div>
                  <MdEdit item={item} onClick={() => showModal({ item })} />
                </div>
                <div>
                  <MdDelete
                    item={item}
                    onClick={() => handleDelete({ item })}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* <ToDoNotEmpty
            todoList={todoList}
            doneList={doneList}
            offset={offset}
            limit={limit}
            toDoCom={toDoCom}
            menu={menu}
            setShowUpdate={setShowUpdate}
            setMenu={setMenu}
            showUpdate={showUpdate}
            key={todoList.todo_seq}
            // onDetail={onDetail}
          /> */}

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
            onClick={() => gotoToDoCreate()}
          ></img>
        </div>
      </div>

      <div className="todoDetail">
        <div>
          <div className="todoCom-mem">{doneMem} 완료</div>
          <div className="todoCom-img">{detailId}</div>
          <div className="todoCom-time">완료일시 : {doneDate}</div>
          <div className="todoCom-memo">메모 {doneMemo}</div>
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
