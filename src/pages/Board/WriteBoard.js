import React, { useState } from "react";
import styles from "./WriteBoard.module.scss";

const WriteBoard = ({ setShowWriteModal, writerInfo }) => {
  const close = () => {
    setShowWriteModal(false);
  };
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalBlock}>
          <span className={styles.close} onClick={close}>
            &times;
          </span>
          <div className={styles.modalContents}>
            <span className={styles.description}>글쓰기</span>
            <input
              className={styles.titleInput}
              // onChange={handleInput}
              name="cate_name"
              placeholder="제목을 입력하세요"
            ></input>
            <textarea
              className={styles.contentInput}
              placeholder="내용을 입력하세요"
            ></textarea>
            <button className={styles.addBtn}>올리기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteBoard;
