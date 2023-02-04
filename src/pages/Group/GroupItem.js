import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Group.module.scss";
import InviteGroup from "./InviteGroup";
const GroupItem = ({ item, user }) => {
  const navigate = useNavigate();
  const [groupInfo, setGroupInfo] = useState({
    group_seq: item.group_seq,
    mem_id: user.mem_id,
    mem_name: user.mem_name,
  });
  // console.log(item);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const inviteGroup = () => {
    setShowInviteModal(true);
  };

  const delGroup = () => {
    if (window.confirm(`'${item.group_name}' 그룹을 삭제하시겠습니까?`)) {
      axios
        .post("/group/delete", groupInfo)
        .then((res) => {
          alert("그룹이 삭제되었습니다.");
        })
        .catch((err) => {
          alert("삭제 실패");
        });
    }
  };

  const handleEnterGroup = () => {
    // navigate("/board", { state: groupInfo });
    navigate("/todolist");
    sessionStorage.setItem("group_seq", groupInfo.group_seq);
    sessionStorage.setItem("group_name", item.group_name);
    sessionStorage.setItem("group_dt", item.group_dt);
  };

  return (
    <div className="groupItemContainer">
      <div className={styles.groupItem}>
        <div className={styles.groupNameArea}>
          <span className={styles.groupName} onClick={handleEnterGroup}>
            {item.group_name}
          </span>
        </div>
        <div className={styles.groupBtnArea}>
          <button className={styles.inviteBtn} onClick={inviteGroup}>
            그룹초대
          </button>
          {showInviteModal && (
            <InviteGroup
              setShowInviteModal={setShowInviteModal}
              showInviteModal={showInviteModal}
              group_seq={item.group_seq}
            />
          )}
          <button className={styles.groupDelBtn} onClick={delGroup}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
