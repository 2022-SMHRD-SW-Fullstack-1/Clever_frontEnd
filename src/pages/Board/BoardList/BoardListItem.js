import React, { useEffect, useState } from "react";
import styles from "./BoardList.module.scss";
import menu from "../../../image/menu.png";
import DropDown from "./DropDown";
import BoardDetail from "../BoardDetail/BoardDetail";
const BoardListItem = ({ item, idx, cateName }) => {
  const [setMenu, setSetMenu] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailItem, setDetailItem] = useState({});
  const handleDetail = (item) => {
    setDetailItem(item.item);
    setShowDetail(true);
  };

  return (
    <div key={idx} className={styles.listItemContainer}>
      {/* {showDetail && (
        <BoardDetail
          setShowDetail={setShowDetail}
          detailItem={detailItem}
          category={cateName}
        />
      )} */}
      <div className={styles.contentArea}>
        <div className={styles.title} onClick={() => handleDetail({ item })}>
          <span className={styles.itemTitle}>{item.notice_title}</span>
        </div>
        <div className={styles.content} onClick={() => handleDetail({ item })}>
          <span className={styles.itemContent}>{item.notice_content}</span>
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
        <img
          src={menu}
          className={styles.menu}
          alt="setting button"
          onClick={() => setSetMenu(!setMenu)}
        />
        {setMenu && <DropDown item={item} />}
      </div>
    </div>
  );
};

export default BoardListItem;
