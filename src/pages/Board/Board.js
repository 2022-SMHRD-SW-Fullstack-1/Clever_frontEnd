import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddBoardCate from "./Category/AddBoardCate";
import styles from "./Board.module.scss";
import add from "../../image/add.png";
import axios from "axios";
import WriteBoard from "./WriteBoard";

const Board = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [groupInfo, setGroupInfo] = useState(location.state);
  const mem_id = groupInfo.mem_id;
  const [category, setCategory] = useState("");
  const [writerInfo, setWriterInfo] = useState({
    category: category,
    mem_id: mem_id,
  });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [cateList, setCateList] = useState([]);
  const cateEmpty = cateList.length === 0;

  // const handleWrite = () => {
  //   navigate("/writeboard", { state: writerInfo });
  // };
  const handleWrite = () => {
    setShowWriteModal(true);
  };
  const openAddCategory = () => {
    setShowAddCategory(true);
  };

  useEffect(() => {
    axios
      .post("/board/getcategory", groupInfo)
      .then((res) => {
        setCateList(res.data);
        console.log(res.data);
        setCategory(res.data[0].cate_seq);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className={styles.categoryContainer}>
        <div className={styles.categoryItem}>
          {cateEmpty ? (
            <div>카테고리를 생성해주세요</div>
          ) : (
            cateList &&
            cateList.map((item, idx) => {
              return (
                <div
                  className={
                    item.cate_seq === category
                      ? styles.selected
                      : styles.categoryName
                  }
                  key={idx}
                  onClick={() => setCategory(item.cate_seq)}
                >
                  {item.cate_name}
                </div>
              );
            })
          )}
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
      {showWriteModal && (
        <WriteBoard
          setShowWriteModal={setShowWriteModal}
          writerInfo={writerInfo}
        />
      )}
    </div>
  );

};

export default Board;
