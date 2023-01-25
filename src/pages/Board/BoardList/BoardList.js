import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./BoardList.module.scss";
import Pagination from "./Pagination";
import BoardDetail from "../BoardDetail/BoardDetail";
const BoardList = ({ writerInfo, cateName }) => {
  const category = writerInfo.current.category;
  const [boardList, setBoardList] = useState([]);
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [total, setTotal] = useState(boardList.length);
  const listEmpty = boardList.length === 0;
  const [showDetail, setShowDetail] = useState(false);

  const [detailItem, setDetailItem] = useState({});
  const handleDetail = (item) => {
    setDetailItem(item.item);
    setShowDetail(true);
  };
  useEffect(() => {
    axios
      .post("board/list", { cate_seq: category })
      .then((res) => {
        setBoardList(res.data);
        setTotal(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, boardList]);
  // }, []);
  // console.log(cateName);

  return (
    <div className="container">
      {showDetail && (
        <BoardDetail
          setShowDetail={setShowDetail}
          detailItem={detailItem}
          category={cateName}
        />
      )}
      {listEmpty ? (
        <div className={styles.emptyList}>게시물이 없습니다.</div>
      ) : (
        boardList &&
        boardList.slice(offset, offset + limit).map((item, idx) => {
          return (
            <div key={idx} className={styles.listItemContainer}>
              <div className={styles.itemSeq}>{item.notice_seq}</div>
              <div className={styles.contentArea}>
                <div
                  className={styles.title}
                  onClick={() => handleDetail({ item })}
                >
                  <span className={styles.itemTitle}>{item.notice_title}</span>
                </div>
                <div
                  className={styles.content}
                  onClick={() => handleDetail({ item })}
                >
                  <span className={styles.itemContent}>
                    {item.notice_content}
                  </span>
                </div>
              </div>
              <div className={styles.writer}>
                <span className={styles.itemWriter}>{item.mem_name}</span>
              </div>
              <div className={styles.date}>
                <div>
                  <span className={styles.itemDate}>
                    {item.notice_dt.split(" ")[0]}
                  </span>
                </div>
                <div>
                  <span className={styles.itemTime}>
                    {item.notice_dt.split(" ")[1]}
                  </span>
                </div>
              </div>
              <div className={styles.settingArea}>
                <button>설정</button>
              </div>
            </div>
          );
        })
      )}
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </div>
  );
};

export default BoardList;
