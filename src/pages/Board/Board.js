import React, { useEffect, useRef, useState } from "react";

import AddBoardCate from "./Category/AddBoardCate";
import styles from "./Board.module.scss";
import add from "../../image/add.png";
import axios from "axios";
import WriteBoard from "./WriteBoard";
import BoardList from "./BoardList/BoardList";

const Board = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    group_seq: sessionStorage.getItem("group_seq"),
    mem_id: sessionStorage.getItem("mem_id"),
    mem_name: sessionStorage.getItem("mem_name"),
  });

  const [category, setCategory] = useState("");
  const [cateName, setCateName] = useState("");
  const [writerInfo, setWriterInfo] = useState({
    category: category,
    mem_id: groupInfo.mem_id,
    mem_name: groupInfo.mem_name,
    group_seq: groupInfo.group_seq,
  });
  const infoRef = useRef({});
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [cateList, setCateList] = useState([]);
  const cateEmpty = cateList.length === 0;

  // const handleWrite = () => {
  //   navigate("/writeboard", { state: writerInfo });
  // };

  const openAddCategory = () => {
    setShowAddCategory(true);
  };

  useEffect(() => {
    axios
      .post("/board/getcategory", groupInfo)
      .then((res) => {
        setCateList(res.data);
        setCategory(res.data[0].cate_seq);
        setCateName(res.data[0].cate_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const obj = {
    ...writerInfo,
    category,
  };
  infoRef.current = obj;

  return (
    <div className="container">
      <div className={styles.categoryContainer}>
        <div className={styles.categoryItem}>
          {cateEmpty ? (
            <div className={styles.emptyList}>카테고리를 생성해주세요</div>
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
                  onClick={() => {
                    setCategory(item.cate_seq);
                    setCateName(item.cate_name);
                  }}
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

      <div className={styles.boardContainer}>
        <BoardList
          writerInfo={infoRef}
          cateName={cateName}
          setShowWriteModal={setShowWriteModal}
          showWriteModal={showWriteModal}
        />
      </div>
    </div>
  );
};

export default Board;
