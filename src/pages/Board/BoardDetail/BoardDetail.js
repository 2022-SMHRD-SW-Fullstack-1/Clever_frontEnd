import axios from "axios";
import React, { useState } from "react";
import styles from "./BoardDetail.module.scss";

const BoardDetail = ({ setShowDetail, detailItem, category }) => {
  const [isValid, setIsValid] = useState(false);
  const [commContent, setCommContent] = useState("");
  const [inputValue, setInputValue] = useState({
    mem_id: detailItem.mem_id,
    notice_seq: detailItem.notice_seq,
    com_content: commContent,
  });

  const handleClose = () => {
    setShowDetail(false);
  };
  const handlePostComm = () => {
    axios
      .post("/board/comment/post", inputValue)
      .then((res) => {
        alert("댓글 작성 완료!");
        setCommContent("");
      })
      .catch((err) => {
        alert("작성 실패");
        console.log(err);
      });
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
                  alt="board attach"
                  src={
                    process.env.PUBLIC_URL + "/image/" + detailItem.notice_photo
                  }
                ></img>
              )}

              <div className={styles.content}>{detailItem.notice_content}</div>
            </div>
            <div className={styles.commContainer}>
              <div className={styles.commCount}>댓글 0</div>
              <div>댓글목록</div>

              <textarea
                className={styles.commInput}
                type="text"
                placeholder="댓글을 입력하세요."
                name="com_content"
                value={commContent}
                onChange={(e) => setCommContent(e.target.value)}
                onKeyUp={(e) => {
                  e.target.value.length > 0
                    ? setIsValid(true)
                    : setIsValid(false);
                }}
              ></textarea>

              <button
                className={styles.commPostBtn}
                disabled={isValid ? false : true}
                onClick={handlePostComm}
              >
                등록
              </button>
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
