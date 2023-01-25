import React from "react";
import styles from "./BoardDetail.module.scss";

const BoardDetail = ({ setShowDetail, detailItem, category }) => {
  const handleClose = () => {
    setShowDetail(false);
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalBlock}>
          <span className={styles.close} onClick={handleClose}>
            &times;
          </span>
          <div className={styles.modalContents}>
            <span className={styles.description}>{category}</span>
            <div className={styles.titleInput}>
              <div className={styles.title}>{detailItem.notice_title}</div>
              <div className={styles.writerInfo}>
                <div className={styles.writer}>{detailItem.mem_name}</div>
                <div>{detailItem.notice_dt}</div>
              </div>
            </div>
            <div className={styles.contentInput}>
              {detailItem.notice_photo !== null && (
                <img
                  className={styles.attachImage}
                  src={
                    process.env.PUBLIC_URL + "/image/" + detailItem.notice_photo
                  }
                ></img>
              )}

              <div>{detailItem.notice_content}</div>
            </div>
          </div>
          <button className={styles.backBtn} onClick={handleClose}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
