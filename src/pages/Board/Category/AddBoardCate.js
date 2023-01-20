import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./AddBoardCate.module.scss";

const AddBoardCate = ({ setShowAddCategory, groupInfo }) => {
  const [inputValue, setInputValue] = useState({
    group_seq: groupInfo.group_seq,
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

  const handleAddCate = () => {
    axios
      .post("/board/countcategory", inputValue)
      .then((res) => {
        if (res.data < 5) {
          addCategory();
        } else {
          alert("한 그룹당 카테고리는 5개만 생성할 수 있습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addCategory = () => {
    axios
      .post("/board/addcategory", inputValue)
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
            <button className={styles.addCateBtn} onClick={handleAddCate}>
              추가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBoardCate;
