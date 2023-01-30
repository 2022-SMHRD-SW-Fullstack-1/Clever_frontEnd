import axios from "axios";
import React, { useEffect, useState } from "react";
import MemberItem from "./MemberItem";
import styles from "./GroupMember.module.scss";

const GroupMember = () => {
  const group_seq = sessionStorage.getItem("group_seq");
  const group_name = sessionStorage.getItem("group_name");

  const group_dt = sessionStorage.getItem("group_dt").split(" ")[0];
  const now = new Date();
  let start = new Date(group_dt);
  let timeDiff = now.getTime() - start.getTime();
  let day = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);

  const [memList, setMemList] = useState([]);
  useEffect(() => {
    axios
      .post("/member/group/list", { group_seq: group_seq })
      .then((res) => {
        setMemList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className={styles.listHeader}>
        <div className={styles.groupInfoArea}>
          <div className={styles.group}>{group_name}</div>
          <div className={styles.groupDt}>
            {group_dt} 생성 ({day}일)
          </div>
        </div>
        <div className={styles.inviteBtnArea}>
          <button className={styles.inviteBtn}>멤버 초대</button>
        </div>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.itemList}>
          <tr className={styles.tableHead}>
            <th>번호</th>
            <th>이름</th>
            {/* <th>호칭</th> */}
            <th>합류 날짜</th>
            <th>합류 기간</th>
            <th>연락처</th>
            <th></th>
          </tr>
          {memList &&
            memList.map((item, idx) => {
              return <MemberItem key={idx} item={item} idx={idx} />;
            })}
        </table>
      </div>
    </div>
  );
};

export default GroupMember;
