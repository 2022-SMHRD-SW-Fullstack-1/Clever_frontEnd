import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddBoardCate from "./AddBoardCate";
import styles from "./Board.module.scss";

const Board = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [groupInfo, setGroupInfo] = useState(location.state);
  const handleWrite = () => {
    navigate("/writeboard");
  };
  const [showAddCategory, setShowAddCategory] = useState(false);
  const openAddCategory = () => {
    setShowAddCategory(true);
  };

  return (
    <div className="container">
      <div className={styles.categoryContainer}>
        <div className={styles.categoryItem}>
          <span className={styles.categoryName}>공지사항</span>
          <span className={styles.categoryName}>특이사항</span>
          <span className={styles.categoryName}>카테고리</span>

          <button onClick={openAddCategory}>카테고리 추가</button>
          {showAddCategory && (
            <AddBoardCate
              setShowAddCategory={setShowAddCategory}
              groupInfo={groupInfo}
            />
          )}
        </div>
      </div>
      <div className={styles.boardContainer}>게시글 목록</div>
      <button className={styles.writeBtn} onClick={handleWrite}>
        글 작성
      </button>
    </div>
  );
};

export default Board;
