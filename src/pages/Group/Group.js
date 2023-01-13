import React from "react";
import styles from "./Group.module.scss";
import add from "../../image/add.png";

const Group = ({ user }) => {
  return (
    <div className="container">
      <div className={styles.groupCountArea}>
        <h2 className={styles.groupCountTitle}>전체 그룹</h2>
        <h2 className={styles.groupCount}>2</h2>
      </div>

      <div className={styles.groupContainer}>
        <div className={styles.groupItem}>그룹이름</div>
        <button className={styles.createGroupBtn} onClick={handleCreate}>
          <div className={styles.createBtnIn}>
            <img src={add} className={styles.addIcon} />
            <span className={styles.btnDecsription}>그룹 생성하기</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Group;
