import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Group.module.scss";
import InviteGroup from "./InviteGroup";
const GroupItem = ({ group_seq, group_name, user }) => {
  const navigate = useNavigate();
  const [groupInfo, setGroupInfo] = useState({
    group_seq: group_seq,
    mem_id: user.mem_id,
    mem_name: user.mem_name,
  });

  const [showInviteModal, setShowInviteModal] = useState(false);

  const inviteGroup = () => {
    setShowInviteModal(true);
  };

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

  const handleEnterGroup = () => {
    navigate("/board", { state: groupInfo });
    sessionStorage.setItem("group_seq", groupInfo.group_seq);
  };

  return (
    <div className="groupItemContainer">
      <div className={styles.groupItem}>
        <div className={styles.groupNameArea}>
          <span className={styles.groupName} onClick={handleEnterGroup}>
            {group_name}
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
              group_seq={group_seq}
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
