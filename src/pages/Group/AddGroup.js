import axios from "axios";
import React, { useState } from "react";
import styles from "./AddGroup.module.scss";

const AddGroup = ({ setModalOpen, modalOpen }) => {
  const [inputValue, setInputValue] = useState({
    group_name: "",
    mem_id: sessionStorage.getItem("mem_id"),
  });

  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
    console.log(modalOpen);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    console.log(inputValue);
  };
  const handleAddGroup = () => {
    axios
      .post("/addgroup", inputValue)
      .then((res) => {
        console.log(res.data);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBlock}>
        <div className={styles.modalCloseArea}>
          <button className={styles.closeBtn} onClick={closeModal}>
            X
          </button>
        </div>
        <div className={styles.addTitle}>
          <h1>그룹 추가</h1>
        </div>
        <div>
          <form>
            <span>그룹이름</span>
            <input
              type="text"
              placeholder="그룹이름"
              name="group_name"
              onChange={handleInput}
            ></input>
          </form>
        </div>
        <div>
          <button onClick={handleAddGroup}>추가하기</button>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
