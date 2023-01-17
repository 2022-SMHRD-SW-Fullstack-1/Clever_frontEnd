import React from "react";
import styles from "./Group.module.scss";
const GroupItem = ({ group_name }) => {
  return (
    <div className="groupItemContainer">
      <div className={styles.groupItem}>
        <div className={styles.groupNameArea}>
          <span className={styles.groupName}>{group_name}</span>
        </div>
        <div className={styles.groupBtnArea}>
          <button className={styles.inviteBtn}>그룹초대</button>
          <button className={styles.groupDelBtn}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
