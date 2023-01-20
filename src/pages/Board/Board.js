import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddBoardCate from "./AddBoardCate";
import styles from "./Board.module.scss";
import add from "../../image/add.png";
import axios from "axios";

const Board = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [groupInfo, setGroupInfo] = useState(location.state);
  const [cateList, setCateList] = useState([]);
  const cateEmpty = cateList.length === 0;

  const handleWrite = () => {
    navigate("/writeboard");
  };
  const [showAddCategory, setShowAddCategory] = useState(false);
  const openAddCategory = () => {
    setShowAddCategory(true);
  };

  useEffect(() => {
    axios
      .post("/board/getcategory", groupInfo)
      .then((res) => {
        setCateList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cateList]);

  return (
    <div className="container">
      <div className={styles.categoryContainer}>
        <div className={styles.categoryItem}>
          <span className={styles.categoryName}>공지사항</span>
          <span className={styles.categoryName}>특이사항</span>
        </div>
        <div onClick={openAddCategory}>
          <img src={add} alt="add button" className={styles.cateAddBtn} />
        </div>
        {showAddCategory && (
          <AddBoardCate
            setShowAddCategory={setShowAddCategory}
            groupInfo={groupInfo}
          />
        )}
      </div>
      <div className={styles.boardContainer}>게시글 목록</div>
      <button className={styles.writeBtn} onClick={handleWrite}>
        글 작성
      </button>
    </div>
  );
};

export default Board;
