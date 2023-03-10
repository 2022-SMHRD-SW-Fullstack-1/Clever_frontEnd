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
import ToDoListItem from "./ToDoListItem";
import ToDoDoneListItem from "./ToDoDoneListItem";
import temp from "../../../image/temp.jpeg";

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
  todoMemoList,
  item,
  cateRef,
  cateObj,
  isOn,
  setIsOn,
  selectDate,
}) => {
  // console.log("itemObj", cateRef);
  // console.log("cateList", cateList);
  // console.log("itemToggle", isOn);
  console.log("memo", todoMemoList);

  // setIsOn(false);

  const [cateType, setCateType] = useState();
  useEffect(() => {
    cateList
      .filter((item, idx) => idx === 0)
      .map((item) => {
        console.log("cate", item.cate_seq);
        setCateType(item.cate_seq);
        console.log("cat", cateType);
      });
    if (cateType == category) {
      axios
        .post("/todolist/alltodo", {
          group_seq: joinGroup,
          // cate_seq: category,
          cate_seq: cateType,
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
  }, [cateType]);

  // console.log("obj", cateObj);
  const cateDefault = cateRef.category;

  const joinGroup = sessionStorage.getItem("group_seq");

  const [showWriteModal, setShowWriteModal] = useState(false);

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

  // 할일 페이지네이션
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [total, setTotal] = useState(todoList.length);

  // 할 일 상세보기
  const [detailId, setDetailId] = useState();
  const [detailLIst, setDetailList] = useState([]);
  const [toDoRep, setToDoRep] = useState();

  const [toDoCom, setToDoCom] = useState("");

  const onDetail = ({ item }) => {
    console.log("detailedItem", item);

    // setDetailList(item);
    setDetailId(item.todo_seq);
    // console.log("detailId", detailId);
    // setEditSeq(item.todo_seq);

    {
      doneList.map((item, idx) => {
        if (item.todo_seq === detailId) {
          // console.log("doneList T/F", item.todo_seq === detailId);
          setDoneMem(item.mem_name);
          setDoneDate(item.cmpl_time);
          // setDoneMemo(item.cmpl_memo);
          console.log("memo", todoMemoList);
          setDoneMemo(todoMemoList);
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
          {isOn === false ? (
            <ToDoListItem
              todoList={todoList}
              doneList={doneList}
              category={category}
              setDetailId={setDetailId}
              detailId={detailId}
              setDoneMem={setDoneMem}
              setDoneDate={setDoneDate}
              setDoneMemo={setDoneMemo}
              setToDoCom={setToDoCom}
              offset={offset}
              limit={limit}
              total={total}
              page={page}
              setPage={setPage}
              showModal={showModal}
            />
          ) : (
            <ToDoDoneListItem
              todoList={todoList}
              doneList={doneList}
              category={category}
              detailId={detailId}
              setDetailId={setDetailId}
              setDoneMem={setDoneMem}
              setDoneDate={setDoneDate}
              setDoneMemo={setDoneMemo}
              setToDoCom={setToDoCom}
              offset={offset}
              limit={limit}
              total={total}
              page={page}
              setPage={setPage}
              showModal={showModal}
            />
          )}

          {/* <Pagination
            total={total}
            limit={limit}
            page={page}
            setPage={setPage}
          /> */}
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
          {/* <div className="todoCom-img"></div> */}
          <div className="todoCom-img">
            <img src={temp} className="todo_img"></img>
          </div>
          <div className="todoCom-time">완료일시 : {doneDate}</div>
          <div className="todoCom-memo">{doneMemo}</div>
          {/* <div className="todoCom-memo">{todoMemoList[0].cmpl_memo}</div> */}
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
