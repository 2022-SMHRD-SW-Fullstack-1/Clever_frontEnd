import axios from "axios";
import React, { useState } from "react";
import styles from "../Group/AddGroup.module.scss";

const EditGroupName = ({ setShowEditName, group_name, group_seq }) => {
  const [inputValue, setInputValue] = useState({
    group_seq: group_seq,
    group_name: group_name,
  });
  const closeModal = () => {
    setShowEditName(false);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleEditName = () => {
    axios
      .post("/group/edit", inputValue)
      .then((res) => {
        alert("그룹이름이 변경되었습니다.");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        alert("변경 실패");
      });
  };
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBlock}>
        <div className={styles.modalCloseArea}>
          <span className={styles.closeBtn} onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className={styles.addTitle}>
          <span>그룹 이름 변경</span>
        </div>
        <div>
          <div className={styles.addGroupInput}>
            <div className={styles.inputName}>
              <input
                type="text"
                placeholder=" 그룹 이름"
                name="group_name"
                defaultValue={group_name}
                onChange={handleInput}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <button className={styles.addGroupBtn} onClick={handleEditName}>
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGroupName;
