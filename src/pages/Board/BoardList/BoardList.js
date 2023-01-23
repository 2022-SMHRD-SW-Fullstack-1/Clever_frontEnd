import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./BoardList.module.scss";
const BoardList = ({ writerInfo }) => {
  const category = writerInfo.current.category;
  const [boardList, setBoardList] = useState([]);
  const listEmpty = boardList.length === 0;

  useEffect(() => {
    axios
      .post("board/list", { cate_seq: category })
      .then((res) => {
        setBoardList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, boardList]);
  return (
    <div className="container">
      {listEmpty ? (
        <div className={styles.emptyList}>게시물이 없습니다.</div>
      ) : (
        boardList &&
        boardList.map((item, idx) => {
          return (
            <div key={idx} className={styles.listItemContainer}>
              <div className={styles.contentArea}>
                <div>{item.notice_title}</div>
                <div>{item.notice_content}</div>
              </div>

              <div>{item.mem_id}</div>
              <div>{item.notice_dt}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BoardList;
