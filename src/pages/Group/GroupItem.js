import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Group.module.scss";
const GroupItem = ({ group_seq, group_name, id }) => {
  const [groupInfo, setGroupInfo] = useState({
    group_seq: group_seq,
    mem_id: id,
  });

  const delGroup = () => {
    axios
      .post("/deletegroup", groupInfo)
      .then((res) => {
        alert("삭제 완료");
      })
      .catch((err) => {
        alert("멤버 존재");
      });
  };

  return (
    <div className="groupItemContainer">
      <div className={styles.groupItem}>
        <div className={styles.groupNameArea}>
          <span className={styles.groupName}>{group_name}</span>
        </div>
        <div className={styles.groupBtnArea}>
          <button className={styles.inviteBtn}>그룹초대</button>
          <button className={styles.groupDelBtn} onClick={delGroup}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
