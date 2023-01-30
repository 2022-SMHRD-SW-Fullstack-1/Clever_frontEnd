import React from "react";
import styles from "./GroupMember.module.scss";
import x from "../../image/close.png";
const MemberItem = ({ item, idx }) => {
  const join_dt = item.join_dt.split(" ")[0];
  const now = new Date();
  let start = new Date(join_dt);

  let timeDiff = now.getTime() - start.getTime();
  let day = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);

  return (
    <tr className={styles.tableBody}>
      <td>{idx + 1}</td>
      <td>{item.mem_name}</td>
      {/* <td>호칭</td> */}
      <td>{join_dt}</td>
      <td>{day}일</td>
      <td>{item.mem_id}</td>
      <td>
        <img src={x} alt="delete" className={styles.xImg}></img>
      </td>
    </tr>
  );
};

export default MemberItem;
