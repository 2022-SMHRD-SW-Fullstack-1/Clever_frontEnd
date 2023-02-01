import axios from "axios";
import React, { useState } from "react";
import styles from "../AddToDoCategory/AddToDoCate.module.scss";

const AddToDoCate = ({ setShowAddCategory }) => {
  const group_seq = sessionStorage.getItem("group_seq");

  const [inputValue, setInputValue] = useState({
    // group_seq: groupInfo.group_seq,
    group_seq: group_seq,
    cate_name: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const close = () => {
    setShowAddCategory(false);
  };

  const addCategory = () => {
    axios
      .post("/todolist/addcategory", inputValue)
      .then((res) => {
        alert("카테고리가 추가되었습니다.");
        setShowAddCategory(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalBlock}>
          <span className={styles.close} onClick={close}>
            &times;
          </span>
          <div className={styles.modalContents}>
            <span className={styles.description}>카테고리 추가</span>
            <input
              className={styles.cateNameInput}
              onChange={handleInput}
              name="cate_name"
              placeholder="카테고리명을 입력하세요."
            ></input>

            <button className={styles.addCateBtn} onClick={addCategory}>
              추가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToDoCate;
