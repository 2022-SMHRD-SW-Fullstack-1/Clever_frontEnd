import axios from "axios";
import React, { useState } from "react";
import UpdateBoard from "../UpdateBoard";
import styles from "./BoardList.module.scss";

const DropDown = ({ item }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState({});
  const handleUpdate = (item) => {
    setUpdateItem(item.item);
    setShowUpdate(true);
  };
  const handleDelete = (notice_seq) => {
    axios
      .post("/board/delete", { notice_seq: notice_seq })
      .then((res) => {
        alert("삭제 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.setMenu}>
      {showUpdate && (
        <UpdateBoard setShowUpdate={setShowUpdate} updateItem={updateItem} />
      )}
      <ul className={styles.setContent}>
        <li onClick={() => handleUpdate({ item })}>수정</li>
        <li onClick={() => handleDelete(item.notice_seq)}>삭제</li>
      </ul>
    </div>
  );
};

export default DropDown;
