import React from "react";
import styles from "./CommentItem.module.scss";
const CommentItem = ({ item, mem_name, com_time, com_content }) => {
  return (
    <div className={styles.commItemContainer}>
      <div className={styles.commTop}>
        <div className={styles.commWriter}>{mem_name}</div>
      </div>
      <div className={styles.commContent}>{com_content}</div>
      <div className={styles.commTime}>{com_time}</div>
    </div>
  );
};

export default CommentItem;
