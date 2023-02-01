import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./AddGroup.module.scss";

const AddGroup = ({ setModalOpen, modalOpen }) => {
  const [inputValue, setInputValue] = useState({
    group_name: "",
    mem_id: sessionStorage.getItem("mem_id"),
  });

  const infoRef = useRef({});

  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const joinManager = () => {
    axios
      .post("/joinManager", infoRef.current)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleAddGroup = () => {
    axios
      .post("/addgroup", inputValue)
      .then((res) => {
        // console.log(res.data);
        const group_seq = res.data;
        const obj = {
          ...inputValue,
          group_seq,
        };
        infoRef.current = obj;
      })
      .then(() => {
        joinManager();
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
          <span className={styles.closeBtn} onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className={styles.addTitle}>
          <span>그룹 만들기</span>
        </div>
        <div>
          <div className={styles.addGroupInput}>
            <div className={styles.inputName}>
              <input
                type="text"
                placeholder=" 그룹 이름"
                name="group_name"
                onChange={handleInput}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <button className={styles.addGroupBtn} onClick={handleAddGroup}>
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
