import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Comment.module.scss";
import CommentItem from "./CommentItem";

const Comment = ({ detailItem }) => {
  const [isValid, setIsValid] = useState(false);
  const [commText, setCommText] = useState("");
  const [inputValue, setInputValue] = useState({
    mem_id: sessionStorage.getItem("mem_id"),
    mem_name: sessionStorage.getItem("mem_name"),
    notice_seq: detailItem.notice_seq,
    com_content: commText,
  });
  const [commList, setCommList] = useState([]);
  const listEmpty = commList.length === 0;

  const handleChange = (e) => {
    const com_content = e.target.value;
    setCommText(com_content);
    setInputValue({
      ...inputValue,
      com_content: com_content,
    });
  };
  const handlePostComm = () => {
    axios
      .post("/board/comment/post", inputValue)
      .then((res) => {
        alert("댓글 작성 완료!");
        setCommText("");
      })
      .catch((err) => {
        alert("작성 실패");
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post("/board/comment/list", { notice_seq: detailItem.notice_seq })
      .then((res) => {
        setCommList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [commList]);

  return (
    <div className={styles.commContainer}>
      <div className={styles.commCount}>
        댓글 <span className={styles.count}>{commList.length}</span>
      </div>
      {listEmpty ? (
        <div>댓글이 없습니다.</div>
      ) : (
        commList &&
        commList.map((item, idx) => {
          return (
            <CommentItem
              key={idx}
              mem_name={item.mem_name}
              com_time={item.com_time}
              com_content={item.com_content}
              item={item}
            />
          );
        })
      )}
      <div className={styles.commInputArea}>
        <div>
          <textarea
            className={styles.commInput}
            type="text"
            placeholder="댓글을 입력하세요."
            name="com_content"
            onChange={handleChange}
            value={commText}
            onKeyUp={(e) => {
              e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
            }}
          ></textarea>
        </div>
        <div>
          <button
            className={styles.commPostBtn}
            disabled={isValid ? false : true}
            onClick={handlePostComm}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
