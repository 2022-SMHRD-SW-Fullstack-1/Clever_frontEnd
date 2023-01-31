import React, { useEffect, useState } from "react";
import styles from "./BoardList.module.scss";
import Pagination from "./Pagination";
import BoardDetail from "../BoardDetail/BoardDetail";
import WriteBoard from "../WriteBoard";
import BoardListItem from "./BoardListItem";
import axios from "axios";
import BoardNotEmpty from "./BoardNotEmpty";
const BoardList = ({
  writerInfo,
  cateName,
  setShowWriteModal,
  showWriteModal,
}) => {
  const [boardList, setBoardList] = useState([]);
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [total, setTotal] = useState(boardList.length);
  const category = writerInfo.current.category;
  const listEmpty = boardList.length === 0;

  const handleWrite = () => {
    setShowWriteModal(true);
  };

  useEffect(() => {
    axios
      .post("/board/list", { cate_seq: category })
      .then((res) => {
        setBoardList(res.data);
        setTotal(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, boardList]);
  return (
    <div className="container">
      {showWriteModal && (
        <WriteBoard
          setShowWriteModal={setShowWriteModal}
          writerInfo={writerInfo}
        />
      )}
      {listEmpty ? (
        <div className={styles.emptyList}>게시물이 없습니다.</div>
      ) : (
        <BoardNotEmpty
          boardList={boardList}
          offset={offset}
          limit={limit}
          cateName={cateName}
        />
      )}
      <div className={styles.boardBottom}>
        <div></div>
        <Pagination total={total} limit={limit} page={page} setPage={setPage} />
        <button className={styles.writeBtn} onClick={handleWrite}>
          글 작성
        </button>
      </div>
    </div>
  );
};

export default BoardList;
