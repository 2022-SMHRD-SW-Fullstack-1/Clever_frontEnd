import React from "react";
import styles from "./WriteBoard.module.scss";

const ModifyBoard = ({ setShowModify, modifyItem }) => {
  const close = () => {
    setShowModify(false);
  };
  const handleChange = (e) => {};
  const handleUpdate = () => {};
  const handleChangeFile = () => {};

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modalBlock}>
          <span className={styles.close} onClick={close}>
            &times;
          </span>
          <div className={styles.modalContents}>
            <span className={styles.description}>게시글 수정</span>
            <input
              className={styles.titleInput}
              // onChange={handleInput}
              name="notice_title"
              value={modifyItem.notice_title}
              onChange={handleChange}
            ></input>
            <textarea
              className={styles.contentInput}
              name="notice_content"
              value={modifyItem.notice_content}
              onChange={handleChange}
            ></textarea>
            <div className={styles.fileArea}>
              <div>
                {modifyItem.notice_photo
                  ? "첨부파일 :" + modifyItem.notice_photo.substring(36)
                  : "첨부파일이 없습니다."}
              </div>

              <input
                className={styles.fileInput}
                type="file"
                name="inputFile"
                onChange={handleChangeFile}
              ></input>
            </div>
            <button className={styles.addBtn} onClick={handleUpdate}>
              수정하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyBoard;
