import React from "react";
import styles from "./GroupMember.module.scss";
import x from "../../image/close.png";
import axios from "axios";

const MemberItem = ({ item, idx, seq }) => {
  const join_dt = item.join_dt.split(" ")[0];
  const join_seq = item.join_seq;
  const mem_id = item.mem_id;
  const admin_id = sessionStorage.getItem("mem_id");
  const now = new Date();
  let start = new Date(join_dt);

  let timeDiff = now.getTime() - start.getTime();
  let day = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);

  const handleDelete = () => {
    if (mem_id === admin_id) {
      alert("그룹장 자기 자신을 내보낼 수 없습니다.");
    } else {
      if (window.confirm(`${item.mem_name}님을 정말로 그룹에서 내보낼까요?`)) {
        axios
          .post("/member/group/delete", { join_seq: join_seq })
          .then((res) => {
            alert(`${item.mem_name}님을 그룹에서 내보냈습니다.`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <tr className={styles.tableBody}>
      <td>{seq + idx + 1}</td>
      <td>{item.mem_name}</td>
      {/* <td>호칭</td> */}
      <td>{join_dt}</td>
      <td>{day}일</td>
      <td>{item.mem_id}</td>
      <td>
        <img
          src={x}
          alt="delete"
          className={styles.xImg}
          onClick={handleDelete}
        ></img>
      </td>
    </tr>
  );
};

export default MemberItem;
