import React, { useEffect, useState } from "react";
import styles from "./Group.module.scss";
import add from "../../image/add.png";
import AddGroup from "./AddGroup";
import axios from "axios";
import GroupNotEmpty from "./GroupNotEmpty";
import GroupEmpty from "./GroupEmpty";

const Group = ({ user }) => {
  const [groupList, setGroupList] = useState([]);
  // 모달 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const groupEmpty = groupList.length === 0;

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    axios
      .post("/getgrouplist", { mem_id: user.mem_id })
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [groupList]);

  let groupCnt = groupList.length;

  return (
    <div className="container">
      <div className={styles.groupCountArea}>
        <span className={styles.groupCountTitle}>전체 그룹</span>
        <span className={styles.groupCount}>{groupCnt}</span>
      </div>

      <div className={styles.groupContainer}>
        {groupEmpty ? (
          <GroupEmpty />
        ) : (
          <GroupNotEmpty groupList={groupList} user={user} />
        )}
        <div className="groupAddBtnContainer">
          <button className={styles.addGroupBtn}>
            <div className={styles.addBtnIn} onClick={showModal}>
              <img src={add} alt="add Button" className={styles.addIcon} />
              <div className={styles.btnDecsriptionArea}>
                <span className={styles.btnDecsription}>그룹 만들기</span>
              </div>
            </div>
            {modalOpen && (
              <AddGroup setModalOpen={setModalOpen} modalOpen={modalOpen} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Group;
