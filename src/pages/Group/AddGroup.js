import React from "react";
import styles from "./AddGroup.module.scss";
const AddGroup = ({ setModalhandle }) => {
  const close = () => {
    setModalhandle(true);
  };
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBlock}>
        <div className={styles.modalCloseArea}>
          <button className={styles.closeBtn} onClick={close}>
            X
          </button>
        </div>
        <div className={styles.addTitle}>
          <h1>그룹 추가</h1>
        </div>
        <div>
          <span>그룹이름</span>
          <input type="text" placeholder="그룹이름"></input>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
