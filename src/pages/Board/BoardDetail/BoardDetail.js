import React from "react";
import styles from "./BoardDetail.module.scss";

const BoardDetail = () => {
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalBlock}>
          <span className={styles.close}>&times;</span>
          <div className={styles.modalContents}>
            <span className={styles.description}></span>

            <div className={styles.fileArea}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
